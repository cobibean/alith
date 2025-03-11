Eliza
This integration provides two usage methods:

Enable the alith plugin in ElizaOS: You can achieve multi-agent interaction by passing an instance of the alith agent to the alith plugin. Additionally, you can utilize alith’s advanced features such as tools and extractors to develop complex plugins without the need for template engineering. This approach is simple and easy to use while benefiting from alith’s high-performance inference optimization capabilities.
Use ElizaOS plugins within alith: You can directly leverage a variety of plugins from the eliza ecosystem without the need to rewrite them in alith. However, this method still requires you to handle complex template engineering to extract structured data from natural language.
Enable the alith plugin in ElizaOS
import { createAlithPlugin, Agent } from "elizaos-alith";
import {
	AgentRuntime,
	CacheManager,
	MemoryCacheAdapter,
	ModelProviderName,
} from "@elizaos/core";
 
const provider = ModelProviderName.OPENAI;
const agent = new Agent({
	name: "A dummy Agent",
	model: "gpt-4",
	preamble:
		"You are a comedian here to entertain the user using humour and jokes.",
	provider,
});
const runtime = new AgentRuntime({
	token: "your-token",
	databaseAdapter: new YourDatabaseAdapter(),
	cacheManager: new CacheManager(new MemoryCacheAdapter()),
	modelProvider: provider,
	// Add Alith plugin in the ElizaOS agent runtime.
	plugins: [
		createAlithPlugin(agent),
		// Omit other plugins
	],
});
Use ElizaOS plugins within alith
import { Agent } from "elizaos-alith";
import { ModelProviderName } from "@elizaos/core";
 
const provider = ModelProviderName.OPENAI;
const agent = new Agent({
	name: "A dummy Agent",
	model: "gpt-4",
	preamble:
		"You are a comedian here to entertain the user using humour and jokes.",
	provider,
	plugins: [
		// Set your ElizaOS here.
	]
});
const result = agent.prompt("Ask a question");