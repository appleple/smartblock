import * as React from "react";
import StrikeIcon from "../components/icons/Strike";
import { toggleMark } from "prosemirror-commands";
import { Extension } from "../types";
import { markActive } from "../utils";

export default class StrikeThrough implements Extension {
  get name() {
    return "strike";
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
      parseDOM: [
        { tag: "strike" },
        { style: "text-decoration=line-through" },
        { style: "text-decoration-line=line-through" }
      ],
      toDOM: () => [
                "span",
                {
                    style: "text-decoration-line:line-through"
                }
            ]
    };
  }
  get icon() {
    return <StrikeIcon style={{ width: "24px", height: "24px" }} />;
  }
  active(state) {
    return markActive(state.schema.marks.strike)(state);
  }
  onClick(state, dispatch) {
    toggleMark(state.schema.marks.strike)(state, dispatch);
  }
}
