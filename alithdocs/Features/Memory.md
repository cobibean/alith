Memory
Alith supports memory functionality, allowing agents to retain and recall information across multiple interactions. This is particularly useful for building conversational agents that can remember user preferences, context, or previous conversations.

Window Buffer Memory
use alith::{Agent, WindowBufferMemory, LLM};
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let model = LLM::from_model_name("gpt-4")?;
    let mut agent = Agent::new("simple agent", model, vec![])
        .preamble("You are a searcher. When I ask questions about Web3, you can search from the Internet and answer them. When you encounter other questions, you can directly answer them.")
        .memory(WindowBufferMemory::new(10))
    let response = agent.prompt("What's BitCoin?").await?;
 
    println!("{}", response);
 
    Ok(())
}
RLU Cache Memory
use alith::{Agent, RLUCacheMemory, LLM};
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let model = LLM::from_model_name("gpt-4")?;
    let mut agent = Agent::new("simple agent", model, vec![])
        .preamble("You are a searcher. When I ask questions about Web3, you can search from the Internet and answer them. When you encounter other questions, you can directly answer them.")
        .memory(RLUCacheMemory::new(10));
    let response = agent.prompt("What's BitCoin?").await?;
 
    println!("{}", response);
 
    Ok(())
}