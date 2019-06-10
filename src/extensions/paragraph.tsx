import * as React from "react";
import ParagraphIcon from "../components/icons/Paragraph";
import AlignLeftIcon from "../components/icons/AlignLeft";
import AlignCenterIcon from "../components/icons/AlignCenter";
import AlignRightIcon from "../components/icons/AlignRight";
import { setBlockType } from "prosemirror-commands";
import uuid from "uuid";
import { Extension } from "../types";
import { blockActive } from "../utils";
import Button from "../components/button";

export default class Paragraph implements Extension {
  get name() {
    return "paragraph";
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
      parseDOM: [
                {
                    tag: 'p', getAttrs(dom) {
                        return {
                            id: dom.getAttribute('id') || uuid()
                        }
                    }
                }],
      ],
      attrs: {
        align: { default: "left" },
        id: { default: "" }
      },
      toDOM: node => {
        return [
                    "p",
                    {
                        style: `text-align: ${node.attrs.align}`,
                        id: node.attrs.id || uuid()
                    }, 0]
        ];
      }
    };
  }
  get icon() {
    return <ParagraphIcon style={{ width: "24px", height: "24px" }} />;
  }
  active(state) {
    return blockActive(state.schema.nodes.paragraph)(state);
  }
  enable(state) {
    return setBlockType(state.schema.nodes.paragraph)(state);
  }
  customMenu({ state, dispatch }) {
    return (
      <>
        <Button
            type="button"
            onClick={() => {
                setBlockType(state.schema.nodes.paragraph, {
                    align: 'left'
                })(state, dispatch);
            }}
        >
            <AlignLeftIcon style={{ width: "24px", height: "24px" }} />
        </Button>
        <Button
            type="button"
            onClick={() => {
                setBlockType(state.schema.nodes.paragraph, {
                    align: 'center'
                })(state, dispatch);
            }}
        >
            <AlignCenterIcon style={{ width: "24px", height: "24px" }} />
        </Button>
        <Button
            type="button"
            onClick={() => {
                setBlockType(state.schema.nodes.paragraph, {
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
    setBlockType(state.schema.nodes.paragraph)(state, dispatch);
  }
}
