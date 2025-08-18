"use client"

import React, { useState, useRef } from "react"
import { motion, useSpring, useTransform, MotionValue } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Wallet,
  TrendingUp,
  Star,
  Zap,
  Swords,
  Shield,
  Sparkles,
  MoreHorizontal,
  Filter,
  ArrowUpDown,
  Eye,
  Send,
  Coins,
  Trophy,
  Target,
  Clock,
  QrCode,
  Gamepad2,
} from "lucide-react"

interface NFTTicket {
  id: string
  name: string
  event: string
  date: string
  rarity: "common" | "rare" | "legendary"
  value: number
  xp: number
  maxXp: number
  battleStats: {
    attack: number
    defense: number
    special: number
  }
  isEvolved: boolean
  image: string
  qrCode: string
}

const mockTickets: NFTTicket[] = [
  {
    id: "1",
    name: "Neon Nexus VIP",
    event: "Cyber Symphony 2024",
    date: "2024-03-15",
    rarity: "legendary",
    value: 2.5,
    xp: 850,
    maxXp: 1000,
    battleStats: { attack: 95, defense: 88, special: 92 },
    isEvolved: true,
    image: "/api/placeholder/300/400",
    qrCode: "QR123456789"
  },
  {
    id: "2",
    name: "Bass Drop Elite",
    event: "Electric Dreams",
    date: "2024-02-20",
    rarity: "rare",
    value: 1.8,
    xp: 650,
    maxXp: 800,
    battleStats: { attack: 78, defense: 82, special: 75 },
    isEvolved: true,
    image: "/api/placeholder/300/400",
    qrCode: "QR987654321"
  },
  {
    id: "3",
    name: "Arena Access",
    event: "Midnight Rave",
    date: "2024-01-10",
    rarity: "common",
    value: 0.8,
    xp: 300,
    maxXp: 500,
    battleStats: { attack: 45, defense: 52, special: 38 },
    isEvolved: false,
    image: "/api/placeholder/300/400",
    qrCode: "QR456789123"
  }
]

const rarityColors = {
  common: "from-cyan-500 to-blue-500",
  rare: "from-purple-500 to-violet-500",
  legendary: "from-pink-500 to-yellow-500"
}

const rarityBadgeColors = {
  common: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  rare: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  legendary: "bg-gradient-to-r from-pink-500 to-yellow-500 text-white border-transparent"
}

function TicketCard3D({ ticket, onSelect, isSelected }: { 
  ticket: NFTTicket
  onSelect: (id: string) => void
  isSelected: boolean 
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 400, damping: 25 })

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current || isDragging) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXValue = (event.clientY - centerY) / 10
    const rotateYValue = (centerX - event.clientX) / 10

    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
  }

  const handleMouseLeave = () => {
    if (!isDragging) {
      rotateX.set(0)
      rotateY.set(0)
      scale.set(1)
    }
  }

  const handleMouseEnter = () => {
    if (!isDragging) {
      scale.set(1.05)
    }
  }

  const handleDoubleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-72 h-96 cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onDoubleClick={handleDoubleClick}
      onClick={() => onSelect(ticket.id)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          rotateZ: isFlipped ? 180 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Front Side - Original Ticket */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden ${
            isSelected ? "ring-4 ring-primary/50" : ""
          }`}
        >
          <Card className={`w-full h-full bg-gradient-to-br ${rarityColors[ticket.rarity]} p-1`}>
            <div className="w-full h-full bg-surface rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
              
              <CardHeader className="relative z-10 p-6">
                <div className="flex justify-between items-start">
                  <Badge className={rarityBadgeColors[ticket.rarity]} variant="outline">
                    {ticket.rarity}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{ticket.value} ETH</div>
                    <div className="text-sm text-muted-foreground">${(ticket.value * 3200).toFixed(0)}</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{ticket.name}</h3>
                  <p className="text-muted-foreground">{ticket.event}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(ticket.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="relative h-32 bg-black/20 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-white/50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">XP Progress</span>
                    <span className="text-white">{ticket.xp}/{ticket.maxXp}</span>
                  </div>
                  <Progress 
                    value={(ticket.xp / ticket.maxXp) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>

              <div className="absolute bottom-4 right-4">
                <Badge variant="outline" className="bg-background/80">
                  Double-click to evolve
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Back Side - Evolved Game Character */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden ${
            isSelected ? "ring-4 ring-primary/50" : ""
          }`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <Card className={`w-full h-full bg-gradient-to-br ${rarityColors[ticket.rarity]} p-1`}>
            <div className="w-full h-full bg-surface rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
              
              <CardHeader className="relative z-10 p-6">
                <div className="flex justify-between items-start">
                  <Badge className={rarityBadgeColors[ticket.rarity]} variant="outline">
                    <Gamepad2 className="w-3 h-3 mr-1" />
                    Battle Ready
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Power Level</div>
                    <div className="text-2xl font-bold text-white">
                      {ticket.battleStats.attack + ticket.battleStats.defense + ticket.battleStats.special}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{ticket.name}</h3>
                  <p className="text-muted-foreground">Evolution Complete</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Swords className="w-4 h-4 text-red-400" />
                      <span>Attack</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 max-w-24">
                      <Progress value={ticket.battleStats.attack} className="h-2" />
                      <span className="text-sm font-mono">{ticket.battleStats.attack}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>Defense</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 max-w-24">
                      <Progress value={ticket.battleStats.defense} className="h-2" />
                      <span className="text-sm font-mono">{ticket.battleStats.defense}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>Special</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 max-w-24">
                      <Progress value={ticket.battleStats.special} className="h-2" />
                      <span className="text-sm font-mono">{ticket.battleStats.special}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4">
                  <Button size="sm" variant="outline" className="bg-background/80">
                    <Target className="w-4 h-4 mr-1" />
                    Battle
                  </Button>
                  <Button size="sm" variant="outline" className="bg-background/80">
                    <Trophy className="w-4 h-4 mr-1" />
                    Upgrade
                  </Button>
                </div>
              </CardContent>

              <div className="absolute top-4 right-4">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

export default function NFTTicketWallet() {
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("date")
  const [filterRarity, setFilterRarity] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("active")

  const handleCardSelect = (id: string) => {
    setSelectedCards(prev => 
      prev.includes(id) 
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id]
    )
  }

  const totalValue = mockTickets.reduce((sum, ticket) => sum + ticket.value, 0)
  const evolvedCount = mockTickets.filter(ticket => ticket.isEvolved).length
  const rarityBreakdown = mockTickets.reduce((acc, ticket) => {
    acc[ticket.rarity] = (acc[ticket.rarity] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const filteredTickets = mockTickets.filter(ticket => {
    if (filterRarity !== "all" && ticket.rarity !== filterRarity) return false
    
    switch (activeTab) {
      case "evolved":
        return ticket.isEvolved
      case "battle":
        return ticket.isEvolved && ticket.battleStats.attack > 70
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Stats Panel */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Card className="bg-surface/50 backdrop-blur-xl border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">NFT Ticket Wallet</h1>
                    <p className="text-muted-foreground">Manage your evolved collectibles</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Coins className="w-4 h-4" />
                    <span className="text-sm">Total Value</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{totalValue.toFixed(2)} ETH</div>
                  <div className="text-sm text-muted-foreground">${(totalValue * 3200).toFixed(0)} USD</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">Collection</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{mockTickets.length}</div>
                  <div className="text-sm text-muted-foreground">{evolvedCount} evolved</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Rarity Breakdown</span>
                  </div>
                  <div className="flex gap-2">
                    {Object.entries(rarityBreakdown).map(([rarity, count]) => (
                      <Badge key={rarity} className={rarityBadgeColors[rarity as keyof typeof rarityBadgeColors]} variant="outline">
                        {count}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Battle Power</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {mockTickets.reduce((sum, ticket) => 
                      sum + ticket.battleStats.attack + ticket.battleStats.defense + ticket.battleStats.special, 0
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">Combined stats</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-surface/50 backdrop-blur-xl border-primary/20">
            <TabsTrigger value="active" className="data-[state=active]:bg-primary/20">
              <Wallet className="w-4 h-4 mr-2" />
              Active Tickets
            </TabsTrigger>
            <TabsTrigger value="evolved" className="data-[state=active]:bg-primary/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Evolved NFTs
            </TabsTrigger>
            <TabsTrigger value="battle" className="data-[state=active]:bg-primary/20">
              <Swords className="w-4 h-4 mr-2" />
              Battle Cards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="flex flex-wrap gap-8 justify-center">
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <TicketCard3D
                    ticket={ticket}
                    onSelect={handleCardSelect}
                    isSelected={selectedCards.includes(ticket.id)}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evolved" className="space-y-6">
            <div className="flex flex-wrap gap-8 justify-center">
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <TicketCard3D
                    ticket={ticket}
                    onSelect={handleCardSelect}
                    isSelected={selectedCards.includes(ticket.id)}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="battle" className="space-y-6">
            <div className="flex flex-wrap gap-8 justify-center">
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                >
                  <TicketCard3D
                    ticket={ticket}
                    onSelect={handleCardSelect}
                    isSelected={selectedCards.includes(ticket.id)}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Selected Cards Actions */}
        {selectedCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Card className="bg-surface/95 backdrop-blur-xl border-primary/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {selectedCards.length} card{selectedCards.length > 1 ? 's' : ''} selected
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Send className="w-4 h-4 mr-2" />
                      Transfer
                    </Button>
                    <Button size="sm" variant="outline">
                      <Swords className="w-4 h-4 mr-2" />
                      Battle
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Export to Wallet</DropdownMenuItem>
                        <DropdownMenuItem>List on Marketplace</DropdownMenuItem>
                        <DropdownMenuItem>Bulk Upgrade</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setSelectedCards([])}
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}