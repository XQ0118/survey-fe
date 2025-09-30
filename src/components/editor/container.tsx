import { cn } from "@/utils/cn";
import { EditorCanvas } from "./canvas";
import { EditorHeader } from "./header";
import { EditorSide } from "./side";

export function EditorContainer() {
  return (
    <main className={
      cn(

      
        ' ',
      )
    }>
      <EditorHeader />
      <div className="grid grid-cols-[auto_1fr] gap-5 px-3">
        <EditorSide />
        <EditorCanvas />
      </div>
    </main>
  )
}
