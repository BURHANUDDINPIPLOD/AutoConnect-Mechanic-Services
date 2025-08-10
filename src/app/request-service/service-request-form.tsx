'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { estimateCost } from '@/ai/flows/estimate-generator'
import type { EstimateCostOutput } from '@/ai/flows/estimate-generator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Sparkles } from 'lucide-react'

const formSchema = z.object({
  serviceRequested: z.string().min(1, 'Please select a service.'),
  vehicleType: z.string().min(1, 'Please enter your vehicle type.'),
  issueDescription: z.string().min(10, 'Please describe the issue in at least 10 characters.'),
})

export function ServiceRequestForm() {
  const [estimate, setEstimate] = useState<EstimateCostOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceRequested: '',
      vehicleType: '',
      issueDescription: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setEstimate(null)
    try {
      const result = await estimateCost({
        ...values,
        mechanicRates: '75', // Placeholder rate
      })
      setEstimate(result)
    } catch (error) {
      console.error('Error generating estimate:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate an estimate. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Request a Service</CardTitle>
              <CardDescription>Fill out the form below to get a service estimate.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="serviceRequested"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Battery Replacement">Battery Replacement</SelectItem>
                        <SelectItem value="Tire Change">Tire Change</SelectItem>
                        <SelectItem value="Oil Change">Oil Change</SelectItem>
                        <SelectItem value="Brake Inspection">Brake Inspection</SelectItem>
                        <SelectItem value="Engine Diagnostic">Engine Diagnostic</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2022 Honda Civic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issueDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe the Issue</FormLabel>
                    <FormControl>
                      <Textarea placeholder="My car is making a clicking sound when I try to start it..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Estimate...
                  </>
                ) : (
                  'Get Estimate'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && (
         <Card className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-16 bg-muted rounded w-1/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </CardContent>
          </Card>
      )}

      {estimate && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span>AI-Powered Estimate</span>
            </CardTitle>
            <CardDescription>
              Here is our initial estimate based on the information you provided. A mechanic will confirm the final price.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estimated Cost</p>
              <p className="text-4xl font-bold text-primary">${estimate.estimatedCost.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Suggested Additional Services</p>
              <p className="text-foreground">{estimate.suggestedServices}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
