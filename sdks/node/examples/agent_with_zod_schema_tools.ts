import { z } from 'zod'
import { Agent } from 'alith'

export const InputSchema = z
  .object({
    x: z.number().describe('The number to substract from'),
    y: z.number().describe('The number to substract'),
  })
  .strip()

const agent = new Agent({
  name: 'A dummy Agent',
  model: 'gpt-4',
  preamble:
    'You are a calculator here to help the user perform arithmetic operations. Use the tools provided to answer the user question.',
  tools: [
    {
      name: 'subtract',
      description: 'Subtract y from x (i.e.: x - y)',
      parameters: InputSchema,
      handler: (x: number, y: number) => {
        return x - y
      },
    },
  ],
})
console.log(agent.prompt('Calculate 10 - 3'))
