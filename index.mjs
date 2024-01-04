// create a discord bot using the openaai api that interacts on the discord server
import 'dotenv/config'


// prepare to connect to the discord api
import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent 
]})

// prepare connection to openai api
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    maxRetries: 0,
    organization: process.env.OPENAI_ORG
})

// check for when a message on discord is sent
client.on('messageCreate', async function(message){
    try {
        // don't respond to yourself or other bots
        if(message.author.bot) return;

        const params = {
            model: "gpt-3.5-turbo", 
            messages: [{role: 'user', content: message.content }],

            // prompt: `Allen is a nice guy.\n\
// Allen: Hello people of Earth, how do you do?\n\
// ${message.author.username}: ${message.content}
// Allen:`,
            //tempurature refers to how random the ai will be
            // tempurature: 0.9,
            max_tokens: 30,
            // stop: ["Allen:", "BigDon(g)"],
       }

       // original line
        const AllenResponse = await openai.chat.completions.create(params)
       

        console.log(message.content)
       console.log(AllenResponse.choices[0].message.content)
        message.reply(`${AllenResponse.choices[0].message.content}`);
        return;
    } catch(err){
        console.log(err)
    }
});

// log the bot into discord
client.login(process.env.DISCORD_TOKEN);
console.log("Allen has made it to Earth")