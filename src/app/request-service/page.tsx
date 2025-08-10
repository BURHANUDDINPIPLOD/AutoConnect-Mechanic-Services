import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceRequestForm } from "./service-request-form"
import { Lightbulb } from "lucide-react"

export default function RequestServicePage() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <ServiceRequestForm />
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent-foreground" />
              <span>Pro Tip</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Be as descriptive as possible about the issue you're facing. This helps the mechanic diagnose the problem accurately and provide a more precise estimate.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Submit your service request.</li>
              <li>Receive an AI-powered estimate and suggestions.</li>
              <li>Connect with a mechanic to finalize details.</li>
              <li>Get your vehicle serviced!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
