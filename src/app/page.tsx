import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { List, Map, SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MechanicCard } from "@/components/mechanic-card"

export default function Home() {
  const mechanics = [
    { name: "John's Auto Repair", specialty: "General, Brakes", rating: 4.8, distance: "1.2 mi", imageUrl: "https://placehold.co/100x100.png", dataAiHint: "mechanic garage" },
    { name: "Speedy Tune-Ups", specialty: "Engines, Transmissions", rating: 4.9, distance: "2.5 mi", imageUrl: "https://placehold.co/100x100.png", dataAiHint: "mechanic working" },
    { name: "Tire Emporium", specialty: "Tires, Alignment", rating: 4.7, distance: "3.1 mi", imageUrl: "https://placehold.co/100x100.png", dataAiHint: "car tires" },
    { name: "Electric Auto Care", specialty: "EVs, Hybrids", rating: 5.0, distance: "4.0 mi", imageUrl: "https://placehold.co/100x100.png", dataAiHint: "electric car" },
    { name: "Classic Car Restorers", specialty: "Vintage, Restoration", rating: 4.9, distance: "5.5 mi", imageUrl: "https://placehold.co/100x100.png", dataAiHint: "classic car" },
    { name: "Roadside Rescue", specialty: "Emergency, Towing", rating: 4.8, distance: "6.2 mi", imageUrl: "https://placehold.co/100x100.png", dataAiHint: "tow truck" },
  ];

  return (
    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Find a Mechanic</CardTitle>
            <CardDescription>Search for mechanics in your area.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input placeholder="Search by name, service, or location..." className="flex-1" />
              <Button>
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Nearby Mechanics</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" aria-label="List view"><List className="h-4 w-4" /></Button>
              <Button variant="secondary" size="icon" aria-label="Map view"><Map className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {mechanics.map((mechanic, index) => (
              <MechanicCard key={index} {...mechanic} />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Card className="h-full">
          <CardContent className="h-full p-2">
            <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Map className="mx-auto h-16 w-16" />
                <p className="mt-4 font-semibold">Map View</p>
                <p className="text-sm">Mechanic locations will be displayed here.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
