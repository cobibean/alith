Get Started
This guide will walk you through everything you need to get started with the Alith. Whether you’re building intelligent agents, integrating tools, or experimenting with language models, Alith provides a seamless experience across multiple programming languages. Below, you’ll find installation instructions, quick start guides, and examples for Rust, Python, and Node.js.

Install Dependency
Install Alith Dependency
cargo add alith --git https://github.com/0xLazAI/alith
Install Other Dependencies like tokio, async_trait, schemars, serde and anyhow.
cargo add tokio async_trait schemars serde anyhow
Write the Code
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
Model Provider Settings
We can configure different AI model providers, here we take the OpenAI model as th example.

Unix
export OPENAI_API_KEY=<your API key>
Windows
$env:OPENAI_API_KEY = "<your API key>"
Run the Code
cargo run --release
