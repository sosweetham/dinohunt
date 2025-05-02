import {
    type BaseClientConfiguration,
    GlideClient,
} from "@valkey/valkey-glide";
import { dinoHuntConfig } from "../../libs/conf";

console.log("KVS Config", dinoHuntConfig.kvsConfig);
const conf: BaseClientConfiguration = {
    addresses: [
        {
            host: dinoHuntConfig.kvsConfig.kvsHost,
            port: dinoHuntConfig.kvsConfig.kvsPort,
        },
    ],
    clientName: "dinohunt-api",
};

export const kvsClient = await GlideClient.createClient(conf);
