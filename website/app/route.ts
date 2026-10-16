import { env } from "cloudflare:workers";
import { handleRequest } from "../lib/workshop-handler.mjs";
export const dynamic = "force-dynamic";
export const GET = (request: Request) => handleRequest(request, env);
export const POST = GET;
export const HEAD = GET;
