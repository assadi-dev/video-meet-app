import { container } from "tsyringe";
import { ExpressServer } from "@core/interfaces/global";
import { TOKENS } from "./tokens";

export const registerServerDependencies = (server: ExpressServer) => {
  container.registerInstance<ExpressServer>(TOKENS.server, server);
};
