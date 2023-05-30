import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { registerLanguage } from "monaco-editor/esm/vs/basic-languages/_.contribution";
import { KeyCode } from "monaco-editor/esm/vs/editor/editor.api";

registerLanguage({
  id: "glsl",
  extensions: [".frag"],
  aliases: ["GLSL Shading Language", "GLSL", "glsl"],
  loader: () => import("./glsl"),
});

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

        // monaco.editor.addKeybindingRules([
        //   {
        //     keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash,
        //     command: "editor.action.commentLine", // ID
        //     when: "textInputFocus", // When
        //   },
        // ]);
        return monaco.editor.create(monacoEl.current!, {
          value: code,
          language: "glsl",
          theme: "vs-dark",
          renderWhitespace: "all",
          fontSize: 16,
          automaticLayout: true,
          fontLigatures: true,
          scrollBeyondLastLine: false,
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
