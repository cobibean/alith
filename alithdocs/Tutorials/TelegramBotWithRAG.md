Telegram Bot with RAG
In this tutorial, you will learn how to create a Telegram Bot that uses the Alith Python SDK to generate responses to messages with the GitHub project docuemnts. This bot will listen to messages in a Telegram channel and reply.

Note: Although we used Python in this tutorial, you can still use the Alith Rust SDK and Node.js SDK to complete this bot. The advantage of using the Alith Python SDK is that it improves development efficiency while still providing a production-level AI Bot. For example, you can deploy the Bot on AWS Lambda, leveraging the core Rust implementation and minimal Python dependencies, resulting in a much smaller cold start time compared to frameworks like Langchain.

Prerequisites
Before starting, ensure you have the following:

GitHub Access Key: Sign up at Github and obtain your access key in your account settings.
OpenAI API Key: Sign up at OpenAI and obtain your API key.
Telegram Bot Token: Create a Telegram Bot and retrieve the Bot Token.
Python Environment: Install Python (3.8 or higher) and set up a virtual environment.
Install Required Libraries
Install the necessary Python libraries using pip:

# For AI Agent with LLM
python3 -m pip install alith
# For Telegram Bot
python3 -m pip install python-telegram-bot
# For GitHub project document download and extract
python3 -m pip install langchain-community langchain_text_splitters
# For Vector Database and Embeddding Models
python3 -m pip install -U pymilvus "pymilvus[model]"
Create a Telegram Bot
Search for BotFather in Telegram and interact with it.
Send the /newbot command to create a new bot.
Follow the prompts to provide a name and username for your bot, and save the generated Bot Token.
Set Up Environment Variables
Store your API keys and tokens as environment variables for security:

export GITHUB_ACCESS_KEY="your-github-access-key"
export OPENAI_API_KEY="your-openai-api-key"
export TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
Write the Telegram Bot Code
Create a Python script (e.g., tg-bot-with-rag.py) and add the following code:

import os
import re
 
from telegram import Update
from telegram.ext import (
    Application,
    MessageHandler,
    filters,
    CallbackContext,
)
 
from langchain_community.document_loaders.github import GithubFileLoader
from langchain_text_splitters import MarkdownTextSplitter
from pymilvus import MilvusClient, model
from alith import Agent
 
# --------------------------------------------
# Constants
# --------------------------------------------
 
GITHUB_ACCESS_KEY = os.getenv("GITHUB_ACCESS_KEY")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
GITHUB_REPO = "0xLazAI/alith"
DOC_RELATIVE_PATH = "website/src/content"
 
# --------------------------------------------
# Init Embeddings Model and Document Database
# --------------------------------------------
 
client = MilvusClient("alith.db")
client.create_collection(
    collection_name="alith",
    dimension=768,
)
# If connection to https://huggingface.co/ failed, uncomment the following path.
# os.environ["HF_ENDPOINT"] = "https://hf-mirror.com"
# Note: This will download a small embedding model "paraphrase-albert-small-v2" (~50MB) from Hugging Face.
embedding_fn = model.DefaultEmbeddingFunction()
 
 
def create_vector_store():
    docs = GithubFileLoader(
        repo=GITHUB_REPO,
        access_token=GITHUB_ACCESS_KEY,
        github_api_url="https://api.github.com",
        file_filter=lambda file_path: re.match(
            f"{DOC_RELATIVE_PATH}/.*\\.mdx?", file_path
        )
        is not None,
    ).load()
    text_splitter = MarkdownTextSplitter(chunk_size=2000, chunk_overlap=200)
    docs = [split.page_content for split in text_splitter.split_documents(docs)]
    vectors = embedding_fn.encode_documents(docs)
    data = [
        {"id": i, "vector": vectors[i], "text": docs[i], "subject": "history"}
        for i in range(len(vectors))
    ]
    client.insert(collection_name="alith", data=data)
 
 
create_vector_store()
 
# --------------------------------------------
# Init Alith Agent
# --------------------------------------------
 
agent = Agent(
    name="Telegram Bot Agent",
    model="gpt-4",
    preamble="""You are a comedian here to entertain the user using humour and jokes.""",
)
 
 
def prompt_with_rag(text: str) -> str:
    query_vectors = embedding_fn.encode_queries([text])
    # Search from the vector database
    res = client.search(
        collection_name="alith",
        data=query_vectors,
        limit=2,
        output_fields=["text", "subject"],
    )
    docs = [d["entity"]["text"] for r in res for d in r]
    response = agent.prompt(
        "{}\n\n<attachments>\n{}</attachments>\n".format(text, "".join(docs))
    )
    return response
 
 
# --------------------------------------------
# Init Telegram Bot
# --------------------------------------------
 
 
async def handle_message(update: Update, context: CallbackContext) -> None:
    response = prompt_with_rag(update.message.text)
    await context.bot.send_message(chat_id=update.effective_chat.id, text=response)
 
 
app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), handle_message))
 
# Start the bot
if __name__ == "__main__":
    app.run_polling()
 
Run the Slack Bot
Run your Python script to start the bot:

python3 tg-bot-with-rag.py
Test the Bot
Interact with your Telegram Bot.
Send messages, and the bot should reply.
An example input and output with the preamble You are a comedian here to entertain the user using humour and jokes..

Input
What is Alith?
output
Ah, Alith! It'slike the Swiss Army knife of decentralized AIframeworks,but with fewerknivesblockchain.Letbreakit down forangmoreycu in a way that won't put you to sleep:
Imagine you're at a potluck, but instead of bringing potato salad, everyone brings *data*. Alith is the super-organized host who makessure no one's data gets spilled, stolen, or accidentally eaten by the dog. It's built on LazAr, the blockchain buffet table where A developers, data providers, and other tech-savvy folks gather to collaborate, innovate, and probably argue over whose algorithm is the fanciest
Alith is the cool kid at the party who speaks python, Rust, and Node.is fluently, so everyone feels included. It's optimized for cpu and Gpu, wiich is like making sure your potato salad works whether you're serving it in a mansion or a tent.And it'sso no one person hogsaecentralized.all the guacamole(read: data sovereignty).
Compared to Rig (its Rust-based cousin with fewer social skills), Alith is the friend who brings the games, the snacks, *and* knows how to fix the Wi-fi. It's developer-friendly, scalable, and secure basically the Ar framework equivalent of a fantasy football league that *actually* workswithout drama.
So, in conclusion: Alith is the future of decentralized Ar, where everyone gets a fair slice of the pizza, and no one has to deal with a centralized overlord hogging the pepperoni.
Deploy the Bot
To keep the bot running 24/7, deploy it to a cloud platform like:

Heroku: Follow the Heroku Python deployment guide .
AWS Lambda: Use the Serverless Framework  to deploy the bot.
Google Cloud Run: Follow the Google Cloud Run documentation .
Enhance the Bot
Here are some ideas to improve your bot:

Contextual Conversations: Store conversation history to enable multi-turn dialogues.
Error Handling: Add error handling for API failures or invalid inputs.
Custom Commands: Allow users to trigger specific actions (e.g., /ask for questions).
Rate Limiting: Prevent abuse by limiting the number of requests per user.
References
Alith Documentation 
Telegram Bot API Documentation 
python-telegram-bot Documentation 