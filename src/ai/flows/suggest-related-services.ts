// The directive tells Next.js it's a server-side module.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting related services based on an initial service request.
 *
 * - suggestRelatedServices - An async function that takes an initial service request and returns a list of related or required services.
 * - SuggestRelatedServicesInput - The input type for the suggestRelatedServices function.
 * - SuggestRelatedServicesOutput - The return type for the suggestRelatedServices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the suggestRelatedServices function
const SuggestRelatedServicesInputSchema = z.object({
  serviceRequested: z.string().describe('The initially requested service (e.g., battery replacement, tire change).'),
  vehicleType: z.string().describe('The type of vehicle (e.g., sedan, truck, SUV).'),
  description: z.string().optional().describe('Optional description of the issue.'),
});
export type SuggestRelatedServicesInput = z.infer<typeof SuggestRelatedServicesInputSchema>;

// Define the output schema for the suggestRelatedServices function
const SuggestRelatedServicesOutputSchema = z.object({
  suggestedServices: z.array(z.string()).describe('A list of related or required services based on the initial request.'),
});
export type SuggestRelatedServicesOutput = z.infer<typeof SuggestRelatedServicesOutputSchema>;

// Exported function to suggest related services
export async function suggestRelatedServices(input: SuggestRelatedServicesInput): Promise<SuggestRelatedServicesOutput> {
  return suggestRelatedServicesFlow(input);
}

// Define the prompt for suggesting related services
const suggestRelatedServicesPrompt = ai.definePrompt({
  name: 'suggestRelatedServicesPrompt',
  input: {schema: SuggestRelatedServicesInputSchema},
  output: {schema: SuggestRelatedServicesOutputSchema},
  prompt: `You are an expert mechanic who suggests related services based on an initial service request.

  The customer has requested the following service:
  Service Requested: {{{serviceRequested}}}
  Vehicle Type: {{{vehicleType}}}
  Description: {{{description}}}

  Based on this information, suggest other related services or required maintenance that the customer should consider.
  Return a list of suggested services.
  `,
});

// Define the Genkit flow for suggesting related services
const suggestRelatedServicesFlow = ai.defineFlow(
  {
    name: 'suggestRelatedServicesFlow',
    inputSchema: SuggestRelatedServicesInputSchema,
    outputSchema: SuggestRelatedServicesOutputSchema,
  },
  async input => {
    const {output} = await suggestRelatedServicesPrompt(input);
    return output!;
  }
);
