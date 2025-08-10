import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy } from "lucide-react";

export default function HelpPage() {
  const faqItems = [
    {
      question: "What should I do if my car won't start?",
      answer: "First, check if your headlights and interior lights work. If they don't, it's likely a dead battery. If they do, the issue could be with the starter or alternator. Try to listen for a clicking sound when you turn the key. A clicking sound often points to a battery or connection issue, while a silent turn could mean a more serious starter problem."
    },
    {
      question: "How do I change a flat tire?",
      answer: "Park on a level surface away from traffic. Use your car's manual to locate the jack and spare tire. Loosen the lug nuts on the flat tire before jacking up the car. Once the car is raised, remove the lug nuts and the flat tire. Mount the spare, tighten the lug nuts by hand, lower the car, and then fully tighten the nuts with the wrench in a star pattern. Drive slowly to the nearest service station."
    },
    {
      question: "My engine is overheating. What's the first step?",
      answer: "If you see the temperature gauge rising, immediately turn off your air conditioning and turn on your heater to the highest setting. This helps pull heat away from the engine. Pull over as soon as it is safe to do so and turn off the engine. Do NOT open the radiator cap when the engine is hot. Wait for it to cool down completely before checking the coolant level."
    },
    {
      question: "What does the 'Check Engine' light mean?",
      answer: "The 'Check Engine' light can indicate a wide range of issues, from a loose gas cap to a serious engine problem. If the light is steady, it's usually not an emergency, but you should have it checked soon. If it's flashing, it indicates a severe problem (like a misfire) that could damage your catalytic converter. You should pull over and have your vehicle towed to a mechanic."
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LifeBuoy className="h-6 w-6" />
          <span>Emergency Help & Tips</span>
        </CardTitle>
        <CardDescription>
          Quick answers to common automotive emergencies. For immediate danger, please call emergency services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
