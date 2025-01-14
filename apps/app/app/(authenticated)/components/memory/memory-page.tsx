"use client";

import { CloudUpload, File, Loader2, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@repo/design-system/components/ui/button";
import { DataTable } from "@repo/design-system/components/data-table";
import { Separator } from "@repo/design-system/components/ui/separator";
import { DocumentsTable } from "../document/document-table";
import { UploadDocumentDropzone } from "../document/upload-document-dropzone";

export const MemoryPage = ({ memoryId }: { memoryId: string }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CloudUpload className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-semibold">Upload documents</h1>
          </div>
          <p className="text-muted-foreground text-xs">
            Build a comprehensive knowledge foundation for your AI by uploading
            diverse documents - from PDFs to Markdown files and text documents.
            These form 'memories' that can be linked to our intelligent
            Circut/Agent. When activated, a Circut taps into all connected
            memory sets, employing RAG (Retrieval Augmented Generation) to
            create responses that are not just generated, but intelligently
            retrieved and contextually augmented.
          </p>
        </div>
        <UploadDocumentDropzone memoryId={memoryId} />
      </div>

      <Separator className="w-full" />
      <DocumentsTable memoryId={memoryId} />
    </div>
  );
};
