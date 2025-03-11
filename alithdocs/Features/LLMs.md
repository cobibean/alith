OpenAI Models
Set the API key.

Unix
export OPENAI_API_KEY=<your API key>
Windows
$env:OPENAI_API_KEY = "<your API key>"
Write the code.

use alith::{Agent, LLM};
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let model = LLM::from_model_name("gpt-4")?;
    let agent = Agent::new("simple agent", model, vec![])
        .preamble("You are a comedian here to entertain the user using humour and jokes.");
 
    let response = agent.prompt("Entertain me!").await?;
 
    println!("{}", response);
 
    Ok(())
}
OpenAI API Compatible Models
Here, we take the DeepSeek model as the example.

use alith::{Agent, LLM};
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let model = LLM::openai_compatible_model(
        "<Your API Key>", // Replace with your api key or read it from env.
        "api.deepseek.com",
        "deepseek-chat", // or `deepseek-reasoner` for DeepSeek R1 Model
    )?;
    let agent = Agent::new("simple agent", model, vec![])
        .preamble("You are a comedian here to entertain the user using humour and jokes.");
 
    let response = agent.prompt("Entertain me!").await?;
 
    println!("{}", response);
 
    Ok(())
}
Anthropic Models
Set the API key.

Unix
export ANTHROPIC_API_KEY=<your API key>
Windows
$env:ANTHROPIC_API_KEY = "<your API key>"
Write the code.

use alith::{Agent, LLM};
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let model = LLM::from_model_name("claude-3-5-sonnet")?;
    let agent = Agent::new("simple agent", model, vec![])
        .preamble("You are a comedian here to entertain the user using humour and jokes.");
 
    let response = agent.prompt("Entertain me!").await?;
 
    println!("{}", response);
 
    Ok(())
}
