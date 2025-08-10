import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Star, Edit } from "lucide-react"

export default function ProfilePage() {
  const reviews = [
    { user: 'Alice B.', rating: 5, comment: 'Incredibly fast and professional service. John fixed my flat tire in no time!', avatar: 'https://placehold.co/40x40.png', dataAiHint: "happy customer" },
    { user: 'Charles D.', rating: 5, comment: 'He diagnosed a tricky engine issue that two other shops missed. Highly recommend!', avatar: 'https://placehold.co/40x40.png', dataAiHint: "person portrait" },
    { user: 'Emily F.', rating: 4, comment: 'Good service, fair price. Was a little late but communicated well.', avatar: 'https://placehold.co/40x40.png', dataAiHint: "woman smiling" },
  ];

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Profile</CardTitle>
              <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
            </div>
            <CardDescription>Manage your personal and professional information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="mechanic portrait" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Mechanic</p>
                <p className="text-sm text-muted-foreground">Joined March 2023</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input id="specialty" defaultValue="General, Brakes, EVs" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reviews" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Ratings & Reviews</CardTitle>
            <CardDescription>See what customers are saying about your service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {reviews.map((review, i) => (
              <div key={i} className="flex gap-4 border-b pb-6 last:border-b-0 last:pb-0">
                <Avatar>
                  <AvatarImage src={review.avatar} data-ai-hint={review.dataAiHint} />
                  <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.user}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={cn(
                            "h-5 w-5",
                            starIndex < review.rating ? "fill-accent text-accent-foreground" : "text-muted-foreground/50"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
