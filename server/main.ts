import { type Handler, serve, serveFile } from "../deps.ts";
import { handleNavigation } from "./routes/navigation.ts";

const PORT = parseInt(Deno.env.get("PORT") || "8080", 10);

const handler: Handler = (req, info) => {
  const url = new URL(req.url);
  if (url.pathname.startsWith("/assets")) {
    return serveFile(req, `${Deno.cwd()}/dist/${url.pathname}`);
  } else if (url.pathname.startsWith("/")) {
    return handleNavigation(req, info);
  }
  return handleNavigation(req, info);
};
serve(handler, { port: PORT });
