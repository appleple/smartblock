import { Schema } from "prosemirror-model";

export default new Schema({
  nodes: {
    text: {},
    note: {
      content: "text*",
      group: "block",
      toDOM() { return ["note", 0] as any },
      parseDOM: [{tag: "note"}] as any
    },
    strong: {
      inline: true,
      group: "inline",
      toDOM() { return ["strong", "hoge"] as any },
      parseDOM: [{tag: "strong"}] as any
    },
    notegroup: {
      content: "note+",
      group: "block",
      toDOM() { return ["notegroup", 0] as any } ,
      parseDOM: [{tag: "notegroup"}]as any
    },

    doc: {
      content: "(note | notegroup)+"
    }
  }
});