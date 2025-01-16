import { CloudUpload, File, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@repo/design-system/components/ui/button";
import axios from "axios";

export const UploadDocumentDropzone = ({ memoryId }: { memoryId: string }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "text/markdown": [".md"],
    },
  });

  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("memoryId", memoryId);

    files.forEach((file) => {
      formData.append("files", file);
    });

    console.log("FormData Debug:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    setIsUploading(true);

    try {
      const response = await axios.post("/api/document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Files uploaded successfully");
      console.log("Upload Response:", response.data);
      setFiles([]);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 hover:bg-muted/40 duration-500 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 border-dotted hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag 'n' drop some files here, or click to select files
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supported files: PDF, MD, TXT
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">Selected Files:</h2>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <File className="h-5 w-5 text-blue-500" />
                  <span>{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      )}
    </div>
  );
};
