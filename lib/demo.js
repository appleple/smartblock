import * as React from 'react';
import { render } from 'react-dom';
import App from './src/';
import './src/styles/base.css';
render(React.createElement(App, { html: "\n<p>Hello World</p>\n<h1>Test</h1>\n<ul>\n  <li>\u30EA\u30B9\u30C81</li>\n  <li>\u30EA\u30B9\u30C82</li>\n</ul>\n", json: {
        type: 'doc',
        content: [
            {
                type: 'paragraph',
                content: [{
                        type: 'text',
                        text: 'Example Paragraph'
                    }]
            }
        ]
    }, onChange: function (_a) {
        var json = _a.json, html = _a.html;
    } }), document.querySelector('#app'));
//# sourceMappingURL=demo.js.map