import * as showdown from 'showdown';

export const languageSupport = () => {
  function htmlunencode(text) {
    return (
      text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
    );
  }
  return [
    {
      type: 'output',
      filter: function (text, converter, options) {
        // use new shodown's regexp engine to conditionally parse codeblocks
        let left = '<pre><code\\b[^>]*>';
        let right = '</code></pre>';
        let flags = 'g';
        let replacement = (wholeMatch, match, left, right) => {
          match = htmlunencode(match);
          return left + match + right;
        };
        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
      }
    }
  ];
};