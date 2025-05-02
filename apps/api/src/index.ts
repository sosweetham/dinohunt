import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { dinoHuntConfig } from "./libs/conf";
import { routes } from "./routes";
import { cleanup } from "./scripts";
import { handleExit, handleSigInt, handleSigTerm } from "./utils";

// Handle termination signals
process.on("SIGINT", handleSigInt);
process.on("SIGTERM", handleSigTerm);
process.on("exit", handleExit);

cleanup();
const app = new Elysia()
    .get("/", ({ redirect }) => {
        return redirect(dinoHuntConfig.clientConfig.clientHost);
    })
    .use(cors())
    .use(swagger())
    .use(routes)
    .listen(dinoHuntConfig.nodeConfig.port);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
