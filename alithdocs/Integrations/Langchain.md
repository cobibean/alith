Langchain
This integration provides the following methods:

Enable the alith chain in Langchain: We can use the alith as the LLM node for the existing Langchain workflow and get the performance gains of alith.
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_alith import AlithLLM
from alith import Agent
 
prompt = PromptTemplate.from_template(
    """As an adaptable question-answering assistant, your role is to leverage the provided context to address user inquiries. When direct answers are not apparent from the context, you are encouraged to draw upon analogies or related knowledge to formulate or infer solutions. If a certain answer remains elusive, politely acknowledge the limitation. Aim for concise responses, ideally within three sentences. In response to requests for links, explain that link provision is not supported.
 
Question: {question}
"""
)
 
agent = Agent(
    name="A dummy Agent",
    model="deepseek-chat",  # or `deepseek-reasoner` for DeepSeek R1 Model
    api_key="<Your API Key>",  # Replace with your api key or read it from env.
    base_url="api.deepseek.com",
    preamble="You are a comedian here to entertain the user using humour and jokes.",
)
 
 
def test_lanchain_alith():
    llm = AlithLLM(agent=agent)
    rag_chain = {"question": RunnablePassthrough()} | prompt | llm | StrOutputParser()
    rag_chain.invoke("query")
