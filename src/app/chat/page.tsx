import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { SendHorizonal, Phone, Video } from "lucide-react"

export default function ChatPage() {
  const conversations = [
    { name: "John's Auto Repair", lastMessage: "Yes, I can be there in 30 minutes.", time: "10:42 AM", unread: 0, avatar: "https://placehold.co/40x40.png", dataAiHint: "mechanic" },
    { name: "Speedy Tune-Ups", lastMessage: "Okay, sounds good!", time: "9:15 AM", unread: 2, avatar: "https://placehold.co/40x40.png", dataAiHint: "garage" },
    { name: "Tire Emporium", lastMessage: "You: What is the quote?", time: "Yesterday", unread: 0, avatar: "https://placehold.co/40x40.png", dataAiHint: "tires" },
  ]
  const messages = [
    { from: 'other', text: 'Hi there! I see you requested a battery replacement for your Honda Civic.', time: '10:40 AM', avatar: "https://placehold.co/40x40.png", dataAiHint: "mechanic" },
    { from: 'me', text: 'Yes, that\'s right. The car won\'t start.', time: '10:41 AM', avatar: "https://placehold.co/40x40.png", dataAiHint: "customer" },
    { from: 'other', text: 'I have the right battery in stock. I can head over now. My ETA is about 30 minutes.', time: '10:41 AM', avatar: "https://placehold.co/40x40.png", dataAiHint: "mechanic" },
    { from: 'me', text: 'Great, thank you!', time: '10:42 AM', avatar: "https://placehold.co/40x40.png", dataAiHint: "customer" },
  ]

  return (
    <div className="grid h-[calc(100vh-10rem)] grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <Card className="md:col-span-1 xl:col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <ScrollArea className="h-full">
            {conversations.map((convo, i) => (
              <div key={i} className={cn("flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-muted/50", i === 0 && "bg-muted")}>
                <Avatar>
                  <AvatarImage src={convo.avatar} data-ai-hint={convo.dataAiHint} />
                  <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold">{convo.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{convo.time}</p>
                  {convo.unread > 0 && <div className="mt-1 ml-auto h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">{convo.unread}</div>}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 xl:col-span-3 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="mechanic" />
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>John's Auto Repair</CardTitle>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-[calc(100vh-20rem)] p-6">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex items-end gap-2", msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                  {msg.from === 'other' && <Avatar className="h-8 w-8"><AvatarImage src={msg.avatar} data-ai-hint={msg.dataAiHint} /><AvatarFallback>J</AvatarFallback></Avatar>}
                  <div className={cn("max-w-xs md:max-w-md rounded-lg px-4 py-2", msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                    <p>{msg.text}</p>
                    <p className={cn("text-xs mt-1 text-right", msg.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{msg.time}</p>
                  </div>
                  {msg.from === 'me' && <Avatar className="h-8 w-8"><AvatarImage src={msg.avatar} data-ai-hint={msg.dataAiHint} /><AvatarFallback>Y</AvatarFallback></Avatar>}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="border-t p-4 bg-background">
          <div className="relative">
            <Input placeholder="Type a message..." className="pr-12" />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
              <SendHorizonal className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
