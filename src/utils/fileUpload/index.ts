import { Maybe } from "graphql/__generated__";

export const getFilesFromChangeEvent = (
  ev: React.ChangeEvent<HTMLInputElement>
): Maybe<Array<File>> => {
  if (!ev.target.files?.length) return null;

  return Array.from(ev.target.files);
};

export const getFilesFromDropEvent = <T extends Element = Element>(
  ev: React.DragEvent<T>
): Maybe<Array<File>> => {
  if (!ev.dataTransfer.items.length && !ev.dataTransfer.files.length) {
    return null;
  }

  if (ev.dataTransfer.items.length) {
    return Array.from(ev.dataTransfer.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile())
      .filter(Boolean) as File[];
  }

  return Array.from(ev.dataTransfer.files).filter(Boolean);
};
