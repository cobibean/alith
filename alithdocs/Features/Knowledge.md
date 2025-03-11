Knowledge
Alith supports knowledge bases, allowing agents to access structured or unstructured data for more informed and context-aware responses. You can integrate databases, document stores, or custom knowledge sources to enhance your agents’ capabilities.

String Source Knowledge
use alith::{Agent, LLM, Knowledge, StringKnowledge};
use std::sync::Arc;
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let knowledges: Vec<Box<dyn Knowledge>> = vec![
        Box::new(StringKnowledge::new("Reference Joke 1")),
    ];
    let model = LLM::from_model_name("gpt-4")?;
    let mut agent = Agent::new("simple agent", model, vec![])
        .preamble("You are a comedian here to entertain the user using humour and jokes.");
    agent.knowledges = Arc::new(knowledges);
    let response = agent.prompt("Entertain me!").await?;
 
    println!("{}", response);
 
    Ok(())
}
Text Source Knowledge
use alith::{Agent, LLM, Knowledge, TextFileKnowledge};
use std::sync::Arc;
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let knowledges: Vec<Box<dyn Knowledge>> = vec![
        Box::new(TextFileKnowledge::new("path/to/text.txt")),
    ];
    let model = LLM::from_model_name("gpt-4")?;
    let mut agent = Agent::new("simple agent", model, vec![])
        .preamble("You are a comedian here to entertain the user using humour and jokes.");
    agent.knowledges = Arc::new(knowledges);
    let response = agent.prompt("Entertain me!").await?;
 
    println!("{}", response);
 
    Ok(())
}
PDF Source Knowledge
use alith::{Agent, LLM, Knowledge, PdfFileKnowledge};
use std::sync::Arc;
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let knowledges: Vec<Box<dyn Knowledge>> = vec![
        Box::new(PdfFileKnowledge::new("path/to/pdf.pdf")),
    ];
    let model = LLM::from_model_name("gpt-4")?;
    let mut agent = Agent::new("simple agent", model, vec![])
        .preamble("You are a comedian here to entertain the user using humour and jokes.");
    agent.knowledges = Arc::new(knowledges);
    let response = agent.prompt("Entertain me!").await?;
 
    println!("{}", response);
 
    Ok(())
}
HTML Source Knowledge
use alith::{Agent, LLM, HtmlKnowledge, Knowledge,};
use std::io::Cursor;
use std::sync::Arc;
use url::Url;
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let url = "https://en.m.wikivoyage.org/wiki/Seoul";
    let html = reqwest::get(url).await.unwrap().text().await.unwrap();
 
    let knowledges: Vec<Box<dyn Knowledge>> = vec![
        Box::new(HtmlKnowledge::new(
            Cursor::new(html),
            Url::parse(url).unwrap(),
            false,
        )),
    ];
    let model = LLM::from_model_name("gpt-4")?;
    let mut agent = Agent::new("simple agent", model, vec![])
        .preamble("You are a comedian here to entertain the user using humour and jokes.");
    agent.knowledges = Arc::new(knowledges);
    let response = agent.prompt("Entertain me!").await?;
 
    println!("{}", response);
 
    Ok(())
}
