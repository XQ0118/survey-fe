import { EditorCanvas } from "./canvas";
import { EditorSide } from "./side";

export function EditorContainer() {
  return (
    <main className="grid grid-cols-[auto_1fr] gap-5 p-3">
      <EditorSide />
      <EditorCanvas />
    </main>
  )
}
