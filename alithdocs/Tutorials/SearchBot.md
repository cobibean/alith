Search Bot
In this tutorial, you will learn how to create a Python application that integrates DuckDuckGo search with Alith’s function calling (tools) feature. This allows you to use LLM models to decide when to perform a web search and return the results.

Note: Although we used Python in this tutorial, you can still use Alith Rust SDK and Node.js SDK to complete this bot.

Prerequisites
Before starting, ensure you have the following:

OpenAI API Key: Sign up at OpenAI and get your API key.
Python Environment: Install Python (3.8 or higher) and set up a virtual environment.
DuckDuckGo Search Library: We’ll use the duckduckgo-search Python library to perform searches.
Install Required Libraries
Install the necessary Python libraries using pip:

python3 -m pip install alith duckduckgo-search
alith: Alith Agent SDK for Python
duckduckgo-search: A Python library to interact with DuckDuckGo’s search engine.
Set Up Environment Variables
Store your API keys and tokens as environment variables for security:

export OPENAI_API_KEY="your-openai-api-key"
Write the Python Code
Create a Python script (e.g., search-bot.py) and add the following code:

from alith import Agent
from duckduckgo_search import DDGS
 
def search(query: str) -> str:
    """
    DuckDuckGoSearch is a tool designed to perform search queries on the DuckDuckGo search engine.
    It takes a search query string as input and returns relevant search results.
    This tool is ideal for scenarios where real-time information from the internet is required,
    such as finding the latest news, retrieving detailed information on a specific topic, or verifying facts.
    """
    results = DDGS.text(query, max_results=10)
    if results:
        response = f"Top 10 results for '{query}':\n\n"
        for i, result in enumerate(results, start=1):
            response += f"{i}. {result['title']}\n   {result['link']}\n"
        return response
    else:
        return f"No results found for '{query}'."
 
agent = Agent(
    name="Search Bot Agent",
    model="gpt-4",
    preamble="""You are a searcher. When I ask questions about Web3, you can search from the Internet and answer them. When you encounter other questions, you can directly answer them.""",
    tools=[search]
)
 
# Main loop to interact with the user
if __name__ == "__main__":
    print("Welcome to the DuckDuckGo Search Tool with OpenAI!")
    while True:
        user_input = input("\nYou: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Goodbye!")
            break
        response = agent.prompt(user_input)
        print(f"Assistant: {response}")
Run the Application
Run your Python script to start the application:

python3 search-bot.py
Test the Bot
Start the application and type a query that might require a web search (e.g., “What is Bitcoin?”).
If a search is required, it will call the DuckDuckGo search function and return the results.
Enhance the Bot
Here are some ideas to improve your bot:

Multiple Tools: Add more tools (e.g., weather lookup, currency conversion) and let Alith decide which one to use.
Rich Formatting: Format the search results in a more user-friendly way.
Error Handling: Add error handling for invalid queries or API failures.
Caching: Cache search results to reduce API calls and improve performance using Rust.
References
Alith Documentation 
DuckDuckGo Search Library 
