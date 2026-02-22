import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, MessagesSquare, Phone } from "lucide-react"
import React from "react"

type ContactCardProps = {
  icon: React.ReactNode
  title: string
  text: string
  highlight: string
}

function ContactCard({ icon, title, text, highlight }: ContactCardProps) {
  return (
    <Card className="rounded-2xl bg-muted border-none shadow-sm">
      <CardContent className="p-6 flex gap-4 items-start">
        <div className="bg-primary/10 p-3 rounded-xl text-primary">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{text}</p>
          <p className="text-primary font-medium mt-1">{highlight}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-14">
        <div className="space-y-6">
          <ContactCard
            icon={<Phone />}
            title="Phone"
            text="Mon-Fri from 8am to 6pm"
            highlight="+20 100 123 4567"
          />
          <ContactCard
            icon={<Mail />}
            title="Email"
            text="We'll respond within 24 hours"
            highlight="support@yourstore.com"
          />
          <ContactCard
            icon={<MapPin />}
            title="Office"
            text="Cairo, Egypt"
            highlight="Business District"
          />
        </div>
        <Card className="rounded-3xl h-fit shadow-sm border-none bg-muted">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-xl">
                <MessagesSquare className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  Send us a Message
                </h2>
                <p className="text-muted-foreground text-sm">
                  Fill out the form and we&apos;ll get back to you
                </p>
              </div>
            </div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input placeholder="Full Name" />
                <Input type="email" placeholder="Email Address" />
              </div>
              <Input placeholder="Subject" />
              <Textarea
                rows={5}
                placeholder="How can we help you?"
              />
              <Button
                type="submit"
                className="w-full rounded-xl"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
