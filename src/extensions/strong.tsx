import * as React from "react";
import StrongIcon from "../components/icons/Bold";
import { toggleMark } from "prosemirror-commands";
import { Extension } from "../types";
import { markActive } from "../utils";

export default class Strong implements Extension {
  get name() {
    return "strong";
  }
  get group() {
    return "mark";
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      group: "mark",
      parseDOM: [{ tag: "strong" }, { style: "font-weight=bold" }],
      toDOM: () => [
                "span",
                {
                    style: 'font-weight:bold'
                }]
      ]
    };
  }
  get icon() {
    return <StrongIcon style={{ width: "24px", height: "24px" }} />;
  }
  active(state) {
    return markActive(state.schema.marks.strong)(state);
  }
  onClick(state, dispatch) {
    toggleMark(state.schema.marks.strong)(state, dispatch);
  }
}
