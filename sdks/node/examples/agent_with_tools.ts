import { Agent } from 'alith'

const agent = new Agent({
  name: 'A dummy Agent',
  model: 'gpt-4',
  preamble:
    'You are a calculator here to help the user perform arithmetic operations. Use the tools provided to answer the user question.',
  tools: [
    {
      name: 'subtract',
      description: 'Subtract y from x (i.e.: x - y)',
      parameters: {
        type: 'object',
        properties: {
          x: {
            type: 'number',
            description: 'The number to substract from',
          },
          y: {
            type: 'number',
            description: 'The number to substract',
          },
        },
      },
      handler: (x: number, y: number) => {
        return x - y
      },
    },
  ],
})
console.log(agent.prompt('Calculate 10 - 3'))
