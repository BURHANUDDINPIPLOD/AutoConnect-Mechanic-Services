import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"

interface MechanicCardProps {
  name: string
  specialty: string
  rating: number
  distance: string
  imageUrl: string
  dataAiHint: string
}

export function MechanicCard({ name, specialty, rating, distance, imageUrl, dataAiHint }: MechanicCardProps) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="h-16 w-16 border">
          <AvatarImage src={imageUrl} alt={name} data-ai-hint={dataAiHint} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{specialty}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent-foreground" />
            <span className="font-medium text-foreground">{rating}</span>
            <span className="text-xs">(24 reviews)</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <MapPin className="h-4 w-4" />
            <span>{distance}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link href="/request-service">Request Service</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
