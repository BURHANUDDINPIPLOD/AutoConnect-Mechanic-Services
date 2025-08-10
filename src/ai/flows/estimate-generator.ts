// estimate-generator.ts
'use server';

/**
 * @fileOverview Generates an estimated cost for a requested car service.
 *
 * - estimateCost - A function that generates the estimated cost for the car service.
 * - EstimateCostInput - The input type for the estimateCost function.
 * - EstimateCostOutput - The return type for the estimateCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateCostInputSchema = z.object({
  issueDescription: z.string().describe('A description of the issue with the vehicle.'),
  vehicleType: z.string().describe('The type of vehicle (e.g., sedan, truck, SUV).'),
  mechanicRates: z.string().describe('The mechanic rates per hour.'),
  serviceRequested: z.string().describe('The specific service requested (e.g., battery replacement, tire change).'),
});
export type EstimateCostInput = z.infer<typeof EstimateCostInputSchema>;

const EstimateCostOutputSchema = z.object({
  estimatedCost: z.number().describe('The estimated cost for the service.'),
  suggestedServices: z.string().describe('Related or required services.'),
});
export type EstimateCostOutput = z.infer<typeof EstimateCostOutputSchema>;

export async function estimateCost(input: EstimateCostInput): Promise<EstimateCostOutput> {
  return estimateCostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateCostPrompt',
  input: {schema: EstimateCostInputSchema},
  output: {schema: EstimateCostOutputSchema},
  prompt: `You are an expert mechanic and financial advisor.

You will use this information to generate an estimated cost for the requested service, and you will attempt to suggest related or required services.

Issue Description: {{{issueDescription}}}
Vehicle Type: {{{vehicleType}}}
Mechanic Rates: {{{mechanicRates}}}
Service Requested: {{{serviceRequested}}}

Ensure that the estimated cost reflects all aspects of the service.

Output the estimated cost as a number, and suggested services as a comma separated list.
`,
});

const estimateCostFlow = ai.defineFlow(
  {
    name: 'estimateCostFlow',
    inputSchema: EstimateCostInputSchema,
    outputSchema: EstimateCostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
