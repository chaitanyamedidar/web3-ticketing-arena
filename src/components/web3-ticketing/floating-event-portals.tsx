"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useTransform, useScroll } from "motion/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Clock, Zap, Star, Sparkles, Crown } from "lucide-react"

interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
  location: string
  image: string
  price: number
  priceUSD: number
  availability: number
  totalTickets: number
  rarity: "common" | "rare" | "epic" | "legendary"
  category: "concert" | "gaming" | "exclusive"
  isPopular: boolean
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Neon Dreams Festival",
    date: "2024-03-15",
    time: "20:00",
    venue: "Cyber Arena",
    location: "Neo Tokyo",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=600&fit=crop&crop=center",
    price: 0.25,
    priceUSD: 850,
    availability: 450,
    totalTickets: 500,
    rarity: "legendary",
    category: "concert",
    isPopular: true
  },
  {
    id: "2",
    title: "GameFi Championship",
    date: "2024-03-20",
    time: "18:00",
    venue: "Virtual Colosseum",
    location: "Metaverse District",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=600&fit=crop&crop=center",
    price: 0.15,
    priceUSD: 510,
    availability: 200,
    totalTickets: 1000,
    rarity: "epic",
    category: "gaming",
    isPopular: true
  },
  {
    id: "3",
    title: "Holographic Sessions",
    date: "2024-03-25",
    time: "22:00",
    venue: "Aurora Dome",
    location: "Cloud City",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop&crop=center",
    price: 0.08,
    priceUSD: 272,
    availability: 800,
    totalTickets: 800,
    rarity: "rare",
    category: "exclusive",
    isPopular: false
  },
  {
    id: "4",
    title: "Bass Fusion X",
    date: "2024-04-01",
    time: "21:30",
    venue: "Underground Grid",
    location: "Sector 7",
    image: "https://images.unsplash.com/photo-1571266028243-d220c9c3b31c?w=400&h=600&fit=crop&crop=center",
    price: 0.12,
    priceUSD: 408,
    availability: 150,
    totalTickets: 300,
    rarity: "epic",
    category: "concert",
    isPopular: true
  },
  {
    id: "5",
    title: "Digital Warfare",
    date: "2024-04-05",
    time: "16:00",
    venue: "Battle Grid",
    location: "Arena Prime",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop&crop=center",
    price: 0.06,
    priceUSD: 204,
    availability: 1200,
    totalTickets: 1200,
    rarity: "common",
    category: "gaming",
    isPopular: false
  },
  {
    id: "6",
    title: "Exclusive VIP Night",
    date: "2024-04-10",
    time: "19:00",
    venue: "Elite Lounge",
    location: "Platinum District",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop&crop=center",
    price: 0.5,
    priceUSD: 1700,
    availability: 50,
    totalTickets: 50,
    rarity: "legendary",
    category: "exclusive",
    isPopular: true
  }
]

const rarityConfig = {
  common: {
    color: "bg-muted-foreground",
    glow: "shadow-lg shadow-muted-foreground/20",
    border: "border-muted-foreground/30",
    icon: Star,
    label: "Common"
  },
  rare: {
    color: "bg-secondary",
    glow: "shadow-lg shadow-secondary/30",
    border: "border-secondary/50",
    icon: Zap,
    label: "Rare"
  },
  epic: {
    color: "bg-accent",
    glow: "shadow-lg shadow-accent/30",
    border: "border-accent/50",
    icon: Sparkles,
    label: "Epic"
  },
  legendary: {
    color: "bg-primary",
    glow: "shadow-xl shadow-primary/40",
    border: "border-primary/60",
    icon: Crown,
    label: "Legendary"
  }
}

export default function FloatingEventPortals() {
  const [filter, setFilter] = useState<"all" | "concert" | "gaming" | "exclusive">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const filteredEvents = mockEvents.filter(event => {
    const matchesFilter = filter === "all" || event.category === filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            animate={{
              y: [-20, -100, -20],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10">
        <div className="container mx-auto px-4 py-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Choose Your Reality
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
              Step through dimensional portals to exclusive events across the metaverse. 
              Each ticket is a gateway to unforgettable experiences.
            </p>
          </motion.div>

          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 mb-12 mx-auto max-w-4xl"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search portals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-surface/50 border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: "all", label: "All Portals" },
                  { key: "concert", label: "Concerts" },
                  { key: "gaming", label: "Gaming" },
                  { key: "exclusive", label: "Exclusive" }
                ].map((filterOption) => (
                  <Button
                    key={filterOption.key}
                    variant={filter === filterOption.key ? "default" : "outline"}
                    onClick={() => setFilter(filterOption.key as any)}
                    className={`transition-all duration-300 ${
                      filter === filterOption.key
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-surface/50 hover:bg-primary/20 border-border/50"
                    }`}
                  >
                    {filterOption.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Event Portal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {filteredEvents.map((event, index) => {
              const rarity = rarityConfig[event.rarity]
              const RarityIcon = rarity.icon
              const availabilityPercentage = (event.availability / event.totalTickets) * 100

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -10,
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.02
                  }}
                  className="group cursor-pointer perspective-1000"
                  onClick={() => setSelectedEvent(event)}
                >
                  <Card className={`relative overflow-hidden bg-card/80 backdrop-blur-xl border-2 ${rarity.border} ${rarity.glow} hover:shadow-2xl transition-all duration-500 transform-gpu`}>
                    {/* Popular Badge */}
                    {event.isPopular && (
                      <div className="absolute top-4 right-4 z-20">
                        <Badge className="bg-accent text-accent-foreground animate-pulse">
                          Hot 🔥
                        </Badge>
                      </div>
                    )}

                    {/* Rarity Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className={`${rarity.color} text-white flex items-center gap-1`}>
                        <RarityIcon className="w-3 h-3" />
                        {rarity.label}
                      </Badge>
                    </div>

                    {/* Event Image */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                      
                      {/* Particle Effects for Popular Events */}
                      {event.isPopular && (
                        <div className="absolute inset-0 overflow-hidden">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-accent rounded-full"
                              animate={{
                                y: [0, -100],
                                x: [0, Math.random() * 50 - 25],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                              style={{
                                left: `${Math.random() * 100}%`,
                                bottom: '0%'
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>

                      {/* Date & Time */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono">
                          {new Date(event.date).toLocaleDateString()} • {event.time}
                        </span>
                      </div>

                      {/* Venue & Location */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.venue} • {event.location}</span>
                      </div>

                      {/* Availability Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Availability</span>
                          <span className="font-mono text-foreground">
                            {event.availability}/{event.totalTickets}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full ${availabilityPercentage < 20 ? 'bg-destructive' : availabilityPercentage < 50 ? 'bg-accent' : 'bg-secondary'} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${availabilityPercentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-display font-bold text-foreground">
                              {event.price} ETH
                            </span>
                            <span className="text-sm text-muted-foreground font-mono">
                              (~${event.priceUSD})
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40"
                        >
                          Enter Portal
                        </Button>
                      </div>
                    </div>

                    {/* Holographic Border Effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-accent/40 transition-all duration-500 px-8 py-6 text-lg font-display"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                🌀
              </motion.span>
              Load More Portals
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}