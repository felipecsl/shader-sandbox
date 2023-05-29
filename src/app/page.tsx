"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "./editor";
// @ts-ignore
import GlslCanvas from "glslCanvas";
// @ts-ignore
import shader from "public/shader.frag";

export default function Home() {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [sandbox, setSandbox] = useState<GlslCanvas | null>(null);
  useEffect(() => {
    if (canvas.current) {
      const sandbox = new GlslCanvas(canvas.current);
      setSandbox(sandbox);
    }
  }, [canvas]);
  const onSaveShader = useCallback(
    (content: string) => {
      sandbox?.load(content);
    },
    [sandbox]
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex place-items-start w-full">
        <canvas
          className="glsl-canvas m-6"
          data-fragment-url="shader.frag"
          width="800"
          height="600"
          ref={canvas}
        ></canvas>
        <Editor className="grow h-screen" code={shader} onSave={onSaveShader} />
      </div>
    </main>
  );
}
