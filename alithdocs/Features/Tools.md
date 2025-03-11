Tools
Alith allows you to define tools that agents can use to perform specific tasks. Tools are functions or classes that encapsulate logic, such as calculations, API calls, or custom operations. Below, you’ll find examples of how to create and use tools in Rust, Python, and Node.js.

Custom Calculation Tool
use alith::{Agent, StructureTool, Tool, ToolError, LLM};
use async_trait::async_trait;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
 
#[derive(JsonSchema, Serialize, Deserialize)]
pub struct Input {
    pub x: usize,
    pub y: usize,
}
 
pub struct Adder;
#[async_trait]
impl StructureTool for Adder {
    type Input = Input;
    type Output = usize;
 
    fn name(&self) -> &str {
        "adder"
    }
 
    fn description(&self) -> &str {
        "Add x and y together"
    }
 
    async fn run_with_args(&self, input: Self::Input) -> Result<Self::Output, ToolError> {
        let result = input.x + input.y;
        Ok(result)
    }
}
 
pub struct Subtract;
#[async_trait]
impl StructureTool for Subtract {
    type Input = Input;
    type Output = usize;
 
    fn name(&self) -> &str {
        "subtract"
    }
 
    fn description(&self) -> &str {
        "Subtract y from x (i.e.: x - y)"
    }
 
    async fn run_with_args(&self, input: Self::Input) -> Result<Self::Output, ToolError> {
        let result = input.x - input.y;
        Ok(result)
    }
}
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let tools: [Box<dyn Tool>; 2] = [Box::new(Adder), Box::new(Subtract)];
    let model = LLM::from_model_name("gpt-4")?;
    let agent = Agent::new("simple agent", model, tools)
        .preamble("You are a calculator here to help the user perform arithmetic operations. Use the tools provided to answer the user's question.");
    let response = agent.prompt("Calculate 10 - 3").await?;
 
    println!("{}", response);
 
    Ok(())
}
Builtin Search Tool
use alith::{Agent, SearchTool, Tool, LLM};
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let tools: [Box<dyn Tool>; 1] = [Box::new(SearchTool::default())];
    let model = LLM::from_model_name("gpt-4")?;
    let agent = Agent::new("simple agent", model, tools)
        .preamble("You are a searcher. When I ask questions about Web3, you can search from the Internet and answer them. When you encounter other questions, you can directly answer them.");
    let response = agent.prompt("What's BitCoin?").await?;
 
    println!("{}", response);
 
    Ok(())
}