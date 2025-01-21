"use client";
import CreateMemorySheet from "../(authenticated)/components/memory/create-memory-sheet";
import { ModelsKeySheet } from "../(authenticated)/components/models/model-keys-sheet";

const SheetProvider = () => {
  return (
    <>
      <CreateMemorySheet />
      <ModelsKeySheet />
    </>
  );
};

export { SheetProvider };
