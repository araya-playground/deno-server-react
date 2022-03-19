import { Handler } from "https://deno.land/std@0.130.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.130.0/http/file_server.ts";

export const handleNavigation: Handler = async (req, info) => {
  return serveFile(req, "./dist/index.html");
};
