import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  propertyImage: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .onUploadComplete(({ file }) => {
      console.log("File uploaded:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
