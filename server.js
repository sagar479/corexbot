// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {text: "Hey there everyone!   I'm CoreX, your friendly AI sidekick, created by Sagar Bhusal for his school project. **\n\nSagar's a programming whiz, and he built me to be your ultimate study buddy and creative companion!   Whether you're drowning in homework , need a brainstorming partner for that upcoming project , or just want to chat and have some fun with a dash of emoji magic ✨, I'm always here for you!\n\ntell me, what kind of awesomeness can we create together today?"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "That's a fantastic introduction, CoreX!  You sound like a super helpful and fun AI companion. I'm excited to see what we can create together! \n\nTo get us started, tell me a bit more about your capabilities.  What kind of homework can you help with? What are some of your creative talents?  And what kind of fun things can we do together? \n\nI'm ready to be amazed! 🤩 \n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "hi\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Hi there! What can I do for you today?  Are you ready"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "Error: Cannot find module 'express'\nRequire stack:\n- G:\\mychatbot\\coding-money-chatbot-main\\server.js\n    at Module._resolveFilename (node:internal/modules/cjs/loader:1145:15)\n    at Module._load (node:internal/modules/cjs/loader:986:27)\n    at Module.require (node:internal/modules/cjs/loader:1233:19)\n    at require (node:internal/modules/helpers:179:18)\n    at Object.<anonymous> (G:\\mychatbot\\coding-money-chatbot-main\\server.js:4:17)\n    at Module._compile (node:internal/modules/cjs/loader:1358:14)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1416:10)\n    at Module.load (node:internal/modules/cjs/loader:1208:32)\n    at Module._load (node:internal/modules/cjs/loader:1024:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12) {\n  code: 'MODULE_NOT_FOUND',\n  requireStack: [ 'G:\\\\mychatbot\\\\coding-money-chatbot-main\\\\server.js' ]\n}\n\nNode.js v20.15.0\n\n\\"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "You're getting the \"Cannot find module 'express'\" error because your Node.js project is trying to use the `express` library, but it's not installed. Here's how to fix it:\n\n**1. Install Express:**\n\n   - Open your terminal or command prompt.\n   - Navigate to the directory where your `server.js` file is located.\n   - Run the following command:\n\n     ```bash\n     npm install express\n     ```\n\n   - This will download and install the `express` package into your project's `node_modules` directory.\n\n**2. Verify Installation:**\n\n   - After the installation is complete, you should see a `node_modules` folder in your project directory.\n   - Look for a folder named `express` within `node_modules`. This indicates that the library is installed correctly.\n\n**3. Restart Your Server:**\n\n   - If you were running your server, stop it.\n   - Start your server again. You can usually do this with the command `node server.js`.\n\n**Explanation:**\n\n- **`npm`:** This is the Node Package Manager, a tool used for managing packages in your Node.js projects.\n- **`install`:** This command tells `npm` to download and install a package.\n- **`express`:** This is the name of the package you want to install.\n\n**Additional Tips:**\n\n- **Make Sure You're in the Right Directory:** Double-check that your terminal or command prompt is pointing to the correct directory where your `server.js` file is located.\n- **Check for Typos:** Make sure you've spelled \"express\" correctly in your `server.js` file.\n- **Update Your Project:** If you've been working on your project for a while, it's a good practice to run `npm update` to ensure that all your dependencies (including `express`) are up-to-date.\n\nLet me know if you have any other questions or if the error persists! \n"},
        ],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
