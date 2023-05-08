import { REST } from "@discordjs/rest";
import { API } from "@discordjs/core";
import { Configuration, OpenAIApi } from "openai";

// openai
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// discord
const token = process.env.DISCORD_TOKEN;
const channelId = process.env.DISCORD_CHANNEL_ID;

const rest = new REST({ version: "10" }).setToken(token);
const api = new API(rest);

// Start
let questionString = "";
try {
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    temperature: 1,
    messages: [
      { role: "system", content: "You are a person who has the wisdom to describe things." },
      {
        role: "user",
        content:
          "今天日期是:" + new Date().toISOString() + "，請隨機給我題目，要求單一角色的圖片視覺的意象，20字以內。",
      },
      { role: "assistant", content: "我想要一個角色，" },
    ],
  });
  questionString = completion.data.choices[0].message.content;
} catch (error) {
  console.error(error);
}

// createMessage
const message = await api.channels.createMessage(channelId, {
  content: "阿對了，我今天有個需求，我想要一個意境圖，裡面" + questionString,
  tts: false,
});
