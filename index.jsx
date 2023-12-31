// create a discord bot using the openaai api that interacts on the discord server
require('dotenv').config();

// prepare to connect to the discord api
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent 
]})

// prepare connection to openai api
const { Configuration , OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_KEY,
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration)

// check for when a message on discord is sent
client.on('messageCreate', async function(message){
    try {
        // don't respond to yourself or other bots
        if(message.author.bot) return;

        const AllenResponse = await openai.createCompletion({
            model: "davinci", 
            prompt: `Allen is a nice guy.\n\
Allen: Hello people of Earth, how do you do?\n\
${message.author.username}: ${message.content}
Allen:`,
            //tempurature refers to how random the ai will be
            tempurature: 0.9,
            max_tokens: 100,
            stop: ["Allen:", "BigDon(g)"],
       })

        message.reply(`${AllenResponse.data.choices[0].text}`);
        return;
    } catch(err){
        console.log(err)
    }
});

// log the bot into discord
client.login(process.env.DISCORD_TOKEN);
console.log("Allen has made it to Earth")