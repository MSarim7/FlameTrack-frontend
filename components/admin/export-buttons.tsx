"use client"

import { Button } from "@/components/ui/button"

export function ExportButtons({ onDownload }: { onDownload?: () => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => window.print()}>
        Print
      </Button>
      <Button variant="secondary" onClick={() => onDownload?.() || alert("Downloading CSV...")}>
        Export CSV
      </Button>
      <Button onClick={() => alert("Downloading PDF...")}>Download PDF</Button>
    </div>
  )
}
