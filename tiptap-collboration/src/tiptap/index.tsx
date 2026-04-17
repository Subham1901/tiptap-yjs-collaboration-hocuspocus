import "./style.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import { MenuBar } from "./menubar";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

export const TipTapEditor = () => {
  // ✅ Persist across renders
  const [ydoc] = useState(() => new Y.Doc());

  const [provider] = useState(
    () => new WebsocketProvider("ws://localhost:1234", "my-document", ydoc),
  );

  const editor = useEditor({
    extensions: [
      // ✅ ALWAYS FIRST
      StarterKit.configure({ history: false }),

      // ✅ THEN collaboration
      Collaboration.configure({
        document: ydoc, // use ydoc directly (cleaner)
      }),

      // ✅ THEN cursor
      CollaborationCursor.configure({
        provider,
        user: {
          color: "#3daee9",
          name: "John Doe",
        },
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
