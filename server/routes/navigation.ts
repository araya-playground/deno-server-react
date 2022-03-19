import { Handler, serveFile } from "../../deps.ts";

export const handleNavigation: Handler = (req) => {
  return serveFile(req, "./dist/index.html");
};
