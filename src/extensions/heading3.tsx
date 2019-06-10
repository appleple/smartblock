import * as React from "react";
import HeadingIcon from "../components/icons/Heading2";
import AlignLeftIcon from "../components/icons/AlignLeft";
import AlignCenterIcon from "../components/icons/AlignCenter";
import AlignRightIcon from "../components/icons/AlignRight";
import { setBlockType } from "prosemirror-commands";
import { Extension } from "../types";
import { blockActive } from "../utils";
import Button from "../components/button";
import uuid from "uuid";

export default class Heading3 implements Extension {
  get name() {
    return "heading3";
  }
  get group() {
    return "block";
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      content: "inline*",
      group: "block",
      defining: true,
      attrs: {
        align: { default: "left" },
        id: { default: "" }
      },
      parseDOM: [
        {
                    tag: "h3",
                    getAttrs(dom) {
                        return {
                            id: dom.getAttribute('id') || uuid()
                        }
                    }},
        }
      ],
      toDOM(node) {
                return [
                    "h3",
                    {
                        style: `text-align: ${node.attrs.align}`,
            id: node.attrs.id || uuid()
                    }, 0] }
        ];
      }
    };
  }
  get icon() {
    return <HeadingIcon style={{ width: "24px", height: "24px" }} />;
  }
  active(state) {
    return blockActive(state.schema.nodes.heading3)(state);
  }
  enable(state) {
    return setBlockType(state.schema.nodes.heading3)(state);
  }
  customMenu({ state, dispatch }) {
    return (
      <>
        <Button
            type="button"
            onClick={() => {
                setBlockType(state.schema.nodes.heading3, {
                    align: 'left'
                })(state, dispatch);
            }}
        >
            <AlignLeftIcon style={{ width: "24px", height: "24px" }} />
        </Button>
        <Button
            type="button"
            onClick={() => {
                setBlockType(state.schema.nodes.heading3, {
                    align: 'center'
                })(state, dispatch);
            }}
        >
            <AlignCenterIcon style={{ width: "24px", height: "24px" }} />
        </Button>
        <Button
            type="button"
            onClick={() => {
                setBlockType(state.schema.nodes.heading3, {
                    align: 'right'
                })(state, dispatch);
            }}
        >
            <AlignRightIcon style={{ width: "24px", height: "24px" }} />
        </Button>
      </>
        );
  }
  onClick(state, dispatch) {
    setBlockType(state.schema.nodes.heading3)(state, dispatch);
  }
}
