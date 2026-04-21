import "./style.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import { MenuBar } from "./menubar";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { HocuspocusProvider } from "@hocuspocus/provider";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

const ydoc = new Y.Doc();

const provider = new HocuspocusProvider({
  url: "ws://127.0.0.1:1234",
  name: "example-document",
  document: ydoc,
});

export const TipTapEditor = () => {
  // // ✅ Persist across renders
  // const [ydoc] = useState(() => new Y.Doc());

  // const [provider] = useState(
  //   () => new WebsocketProvider("ws://localhost:1234", "my-document", ydoc),
  // );

  const editor = useEditor({
    // element: document.querySelector(".element"),
    extensions: [
      // ✅ ALWAYS FIRST
      StarterKit.configure({ history: false }),

      // ✅ THEN collaboration
      Collaboration.configure({
        document: ydoc, // use ydoc directly (cleaner)
        fragment: ydoc.getXmlFragment("prosemirror"),
      }),

      // ✅ THEN cursor
      CollaborationCursor.configure({
        provider,
        user: { name: "John Doe", color: "#ffcc00" },
      }),
    ],
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};
