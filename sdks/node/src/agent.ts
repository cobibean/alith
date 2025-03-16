import { DelegateAgent, type DelegateTool } from './internal'
import { Store } from './store'
import { type Tool, convertParametersToJson } from './tool'

// Define the configuration structure for an Agent
type AgentOptions = {
  name?: string // Optional agent name.
  model: string // The model used by the agent
  preamble?: string // Introductory text or context for the agent
  baseUrl?: string // Optional base URL for API requests
  apiKey?: string // Optional API key for authentication
  tools?: Array<Tool> // Optional list of tools available to the agent
  mcpConfigPath?: string // Optional mcp config path
  store?: Store // Optional store
}

// Represents an agent that can process prompts using tools
class Agent {
  private _agent: DelegateAgent
  private _opts: AgentOptions
  private _store?: Store
  /**
   * Creates an instance of Agent.
   * @param {AgentOptions} opts - The configuration object for the agent.
   * @param {string} opts.name - Optional agent name.
   * @param {string} opts.model - The model used by the agent.
   * @param {string} opts.preamble - Optional introductory text or context for the agent.
   * @param {string} [opts.baseUrl] - Optional base URL for API requests.
   * @param {string} [opts.apiKey] - Optional API key for authentication.
   * @param {Array<Tool>} [opts.tools] - Optional list of tools available to the agent.
   * @param {string} [opts.mcpConfigPath] - Optional mcp config path.
   * @param {Store} [opts.store] - Optional store.
   */
  constructor(opts: AgentOptions) {
    this._opts = opts
    this._store = opts.store
    this._agent = new DelegateAgent(
      opts.name ?? '',
      opts.model,
      opts.apiKey ?? '',
      opts.baseUrl ?? '',
      opts.preamble ?? '',
      opts.mcpConfigPath ?? '',
    )
  }

  /**
   * Processes a prompt using the agent's tools and model.
   * @param {string} prompt - The input prompt to process.
   * @returns {string} - The result of processing the prompt.
   */
  prompt(prompt: string): string {
    // Delegate the prompt processing to the underlying agent and return the result
    const tools = this._opts.tools ?? []
    const delegateTools: Array<DelegateTool> = []
    for (const tool of tools) {
      delegateTools.push({
        name: tool.name,
        version: tool.version ?? '',
        description: tool.description,
        parameters: convertParametersToJson(tool.parameters),
        author: tool.author ?? '',
        handler: (args: string) => {
          const tool_args = JSON.parse(args)
          const args_array = Object.values(tool_args)
          const result = tool.handler(...args_array)
          return JSON.stringify(result)
        },
      })
    }
    if (this._store) {
      this._store.search(prompt).then((docs) => {
        prompt = `${prompt}\n\n<attachments>\n${docs.join('')}</attachments>\n`
      })
    }
    return this._agent.promptWithTools(prompt, delegateTools)
  }

  /**
   * Returns the name of the agent.
   * @returns {string} - The name of the agent.
   */
  name(): string {
    return this._opts.name ?? ''
  }

  /**
   * Returns the model used by the agent.
   * @returns {string} - The model used by the agent.
   */
  model(): string {
    return this._opts.model
  }

  /**
   * Returns the preamble of the agent.
   * @returns {string} - The preamble of the agent.
   */
  preamble(): string | undefined {
    return this._opts.preamble
  }

  /**
   * Returns the base url of the agent.
   * @returns {string} - The base url of the agent.
   */
  baseUrl(): string | undefined {
    return this._opts.baseUrl
  }

  /**
   * Returns the API key of the agent.
   * @returns {string} - The API key of the agent.
   */
  apiKey(): string | undefined {
    return this._opts.apiKey
  }
}

export { Agent, type AgentOptions }
