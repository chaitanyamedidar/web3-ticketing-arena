"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Crown,
  Star,
  Zap,
  Swords,
  TrendingUp,
  Users,
  Calendar,
  Medal,
  Award,
  Target,
  Flame,
  Globe,
  ChevronUp,
  ChevronDown
} from "lucide-react"

interface LeaderboardEntry {
  id: string
  rank: number
  username: string
  avatar: string
  level: number
  xp: number
  battleWins: number
  battleLosses: number
  winRate: number
  eventsAttended: number
  nftsOwned: number
  totalValue: number
  faction: "cyber" | "neon" | "void"
  status: "online" | "offline" | "in-battle"
  streak: number
  badge?: string
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    rank: 1,
    username: "CyberLegend",
    avatar: "/api/placeholder/64/64",
    level: 47,
    xp: 15420,
    battleWins: 342,
    battleLosses: 23,
    winRate: 93.7,
    eventsAttended: 89,
    nftsOwned: 156,
    totalValue: 47.8,
    faction: "cyber",
    status: "online",
    streak: 28,
    badge: "Champion"
  },
  {
    id: "2",
    rank: 2,
    username: "NeonQueen",
    avatar: "/api/placeholder/64/64",
    level: 45,
    xp: 14890,
    battleWins: 298,
    battleLosses: 31,
    winRate: 90.6,
    eventsAttended: 72,
    nftsOwned: 134,
    totalValue: 39.2,
    faction: "neon",
    status: "in-battle",
    streak: 15,
    badge: "Master"
  },
  {
    id: "3",
    rank: 3,
    username: "VoidMaster",
    avatar: "/api/placeholder/64/64",
    level: 44,
    xp: 14123,
    battleWins: 276,
    battleLosses: 28,
    winRate: 90.8,
    eventsAttended: 65,
    nftsOwned: 128,
    totalValue: 36.7,
    faction: "void",
    status: "online",
    streak: 22,
    badge: "Expert"
  },
  {
    id: "4",
    rank: 4,
    username: "PixelWarrior",
    avatar: "/api/placeholder/64/64",
    level: 42,
    xp: 13456,
    battleWins: 234,
    battleLosses: 35,
    winRate: 87.0,
    eventsAttended: 58,
    nftsOwned: 98,
    totalValue: 28.4,
    faction: "cyber",
    status: "offline",
    streak: 8,
    badge: "Veteran"
  },
  {
    id: "5",
    rank: 5,
    username: "ElectricSoul",
    avatar: "/api/placeholder/64/64",
    level: 41,
    xp: 12890,
    battleWins: 198,
    battleLosses: 42,
    winRate: 82.5,
    eventsAttended: 76,
    nftsOwned: 87,
    totalValue: 24.1,
    faction: "neon",
    status: "online",
    streak: 12
  }
]

const getFactionColor = (faction: string) => {
  switch (faction) {
    case "cyber": return "from-cyan-500 to-blue-500"
    case "neon": return "from-purple-500 to-pink-500"
    case "void": return "from-gray-500 to-black"
    default: return "from-purple-500 to-pink-500"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "online": return "bg-green-500"
    case "offline": return "bg-gray-500"
    case "in-battle": return "bg-red-500"
    default: return "bg-gray-500"
  }
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="w-6 h-6 text-yellow-400" />
    case 2: return <Medal className="w-6 h-6 text-gray-300" />
    case 3: return <Award className="w-6 h-6 text-amber-600" />
    default: return <span className="text-xl font-bold text-muted-foreground">#{rank}</span>
  }
}

export default function LeaderboardRankings() {
  const [activeTab, setActiveTab] = useState("overall")
  const [timeFilter, setTimeFilter] = useState("all-time")

  const timeFilters = [
    { id: "all-time", label: "All Time" },
    { id: "monthly", label: "This Month" },
    { id: "weekly", label: "This Week" },
    { id: "daily", label: "Today" }
  ]

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Arena Rankings
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete with the best warriors in the metaverse. Climb the ranks and earn legendary rewards.
          </p>
        </motion.div>

        {/* Time Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {timeFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={timeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFilter(filter.id)}
              className={timeFilter === filter.id ? "bg-primary text-primary-foreground" : ""}
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Leaderboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-surface/50 backdrop-blur-xl border-primary/20">
            <TabsTrigger value="overall" className="data-[state=active]:bg-primary/20 text-xs sm:text-sm">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Overall</span>
              <span className="sm:hidden">All</span>
            </TabsTrigger>
            <TabsTrigger value="battles" className="data-[state=active]:bg-primary/20 text-xs sm:text-sm">
              <Swords className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Battle Stats</span>
              <span className="sm:hidden">Battles</span>
            </TabsTrigger>
            <TabsTrigger value="collection" className="data-[state=active]:bg-primary/20 text-xs sm:text-sm">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Collection</span>
              <span className="sm:hidden">NFTs</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-primary/20 text-xs sm:text-sm">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Events</span>
              <span className="sm:hidden">Events</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="space-y-6">
            {/* Top 3 Podium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {mockLeaderboard.slice(0, 3).map((player, index) => (
                <Card key={player.id} className={`relative overflow-hidden ${index === 0 ? 'order-2 md:order-2 scale-105' : index === 1 ? 'order-1 md:order-1' : 'order-3 md:order-3'}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${getFactionColor(player.faction)} opacity-10`} />
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/30">
                        <img src={player.avatar} alt={player.username} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -top-2 -right-2">
                        {getRankIcon(player.rank)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(player.status)} border-2 border-background`} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{player.username}</h3>
                    {player.badge && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                        {player.badge}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">Level {player.level}</div>
                      <div className="text-sm text-muted-foreground">{player.xp.toLocaleString()} XP</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-green-400 font-semibold">{player.winRate}%</div>
                        <div className="text-muted-foreground">Win Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-400 font-semibold">{player.streak}</div>
                        <div className="text-muted-foreground">Streak</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Full Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {mockLeaderboard.map((player, index) => (
                <Card key={player.id} className="bg-surface/50 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center">
                            {getRankIcon(player.rank)}
                          </div>
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
                              <img src={player.avatar} alt={player.username} className="w-full h-full object-cover" />
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(player.status)} border border-background`} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-white">{player.username}</h3>
                            {player.badge && (
                              <Badge variant="outline" className="text-xs">
                                {player.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Level {player.level} • {player.faction} faction
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-8 text-center">
                        <div>
                          <div className="text-lg font-bold text-primary">{player.battleWins}</div>
                          <div className="text-xs text-muted-foreground">Wins</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-400">{player.winRate}%</div>
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-400">{player.totalValue} ETH</div>
                          <div className="text-xs text-muted-foreground">Collection</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-orange-400">{player.streak}</div>
                          <div className="text-xs text-muted-foreground">Streak</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {player.rank <= 3 && <ChevronUp className="w-4 h-4 text-green-400" />}
                        {player.rank > 3 && <ChevronDown className="w-4 h-4 text-red-400" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="battles" className="space-y-6">
            <div className="text-center text-muted-foreground py-12">
              <Swords className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Battle Statistics</h3>
              <p>Detailed battle performance metrics and win rates</p>
            </div>
          </TabsContent>

          <TabsContent value="collection" className="space-y-6">
            <div className="text-center text-muted-foreground py-12">
              <Star className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Collection Rankings</h3>
              <p>Top collectors and their most valuable NFT portfolios</p>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="text-center text-muted-foreground py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Event Participation</h3>
              <p>Most active community members and event attendees</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
