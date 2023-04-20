import { REST } from "@discordjs/rest";
import { API } from "@discordjs/core";

const token =
  "MTA3NTY2NDUzNDUwNjg0MDA3NA.GFc0RY.l3E2P73bb-Sn0vpgzVNIZ8OgT-oo0fqktdut8c";
const channelId = "1098464995454492714";

const rest = new REST({ version: "10" }).setToken(token);

// Pass into API
const api = new API(rest);

// createMessage
const message = await api.channels.createMessage(channelId, {
  content: "Hello World!",
  tts: false,
});
