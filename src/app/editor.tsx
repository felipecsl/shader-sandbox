import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export const Editor = ({
  className,
  code,
  onSave,
}: {
  className: string;
  code: string;
  onSave?: (content: string) => void;
}) => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        return monaco.editor.create(monacoEl.current!, {
          value: code,
          language: "javascript",
          theme: "vs-dark",
          renderWhitespace: "all",
          fontSize: 16,
        });
      });
    }

    return () => editor?.dispose();
  }, [code, editor]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "s" && e.ctrlKey) || (e.key === "s" && e.metaKey)) {
        e.preventDefault();
        if (onSave) onSave(editor?.getValue() || "");
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onSave, editor]);

  return <div className={className} ref={monacoEl}></div>;
};
