import * as React from "react";
import UnderlineIcon from "../components/icons/Underline";
import { toggleMark } from "prosemirror-commands";
import { Extension } from "../types";
import { markActive } from "../utils";

export default class Underline implements Extension {
  get name() {
    return "underline";
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
      parseDOM: [{ tag: "u" }, { style: "text-decoration=underline" }],
      toDOM: () => [
                "span",
                {
                    style: 'text-decoration:underline'
                }]
      ]
    };
  }
  get icon() {
    return <UnderlineIcon style={{ width: "24px", height: "24px" }} />;
  }
  active(state) {
    return markActive(state.schema.marks.underline)(state);
  }
  onClick(state, dispatch) {
    toggleMark(state.schema.marks.underline)(state, dispatch);
  }
}
