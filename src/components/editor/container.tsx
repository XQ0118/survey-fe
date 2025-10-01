import { cn } from "@/utils/cn";
import { EditorCanvas } from "./canvas";
import { EditorHeader } from "./header";
import { EditorSide } from "./side";
import { EditorFooter } from "./footer";

export function EditorContainer() {
  return (
    <main className={
      cn(
        'max-w-screen-lg mx-auto',

        ' ',
      )
    }>
      <EditorHeader />
      <div className="grid grid-cols-[auto_1fr] gap-5 px-3">
        <EditorSide />
        <EditorCanvas />
      </div>
      <EditorFooter />
    </main>
  )
}
