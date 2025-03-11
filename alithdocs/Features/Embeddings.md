Embeddings
The Alith SDK supports embeddings, which are numerical representations of text that capture semantic meaning. Embeddings are useful for tasks like semantic search, clustering, and similarity comparisons. Below, you’ll find examples of how to generate and use embeddings in Rust, Python, and Node.js.

Large Language Embeddings Model
Here we take the OpenAI embeddings model as the example.

use alith::{Agent, EmbeddingsBuilder, LLM};
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let model = LLM::from_model_name("gpt-4")?;
    let embeddings_model = model.embeddings_model("text-embedding-3-small");
    let data = EmbeddingsBuilder::new(embeddings_model.clone())
        .documents(vec!["doc0", "doc1", "doc2"])
        .unwrap()
        .build()
        .await?;
}
Local Fast Embedding Model
Note that running this program will pull the embeddings model from Hugging Face and start the inference engine locally for inference, so we need to turn on the inference feature.

use alith::{EmbeddingsBuilder, FastEmbeddingsModel};
 
#[tokio::main]
async fn main() -> Result<(), anyhow::Error> {
    let embeddings_model = FastEmbeddingsModel::try_default().unwrap();
    let data = EmbeddingsBuilder::new(embeddings_model.clone())
        .documents(vec!["doc0", "doc1", "doc2"])
        .unwrap()
        .build()
        .await?;
    println!("{:?}", data);
    Ok(())
}