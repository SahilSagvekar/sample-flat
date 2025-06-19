import { createNextRouteHandler } from "uploadthing/next";
import { uploadRouter } from "@/lib/uploadthing";

export const { GET, POST } = createNextRouteHandler({
  router: uploadRouter,
});
