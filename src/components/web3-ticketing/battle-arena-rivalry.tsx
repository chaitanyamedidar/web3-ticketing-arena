"use client"

import { useState, useEffect } from "react"
import { motion, useTransform, useMotionValue } from "motion/react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Sword, 
  Shield, 
  Zap, 
  Timer, 
  Users, 
  Trophy, 
  Settings, 
  Flag,
  Play,
  Pause,
  RotateCcw,
  Camera,
  Share2,
  Star,
  Crown,
  Target,
  Volume2,
  Menu,
  X
} from "lucide-react"

interface BattleCard {
  id: string
  name: string
  health: number
  maxHealth: number
  attack: number
  defense: number
  energy: number
  maxEnergy: number
  rarity: "common" | "rare" | "epic" | "legendary"
  faction: "blue" | "purple"
  abilities: string[]
}

interface BattleState {
  phase: "matchmaking" | "battle" | "results"
  turn: "player" | "opponent"
  timeLeft: number
  playerCard: BattleCard
  opponentCard: BattleCard
  battleLog: string[]
  spectators: number
  isPlayerTurn: boolean
}

export default function BattleArenaRivalry() {
  const [battleState, setBattleState] = useState<BattleState>({
    phase: "matchmaking",
    turn: "player",
    timeLeft: 30,
    playerCard: {
      id: "1",
      name: "Neon Warrior",
      health: 85,
      maxHealth: 100,
      attack: 45,
      defense: 30,
      energy: 60,
      maxEnergy: 100,
      rarity: "epic",
      faction: "blue",
      abilities: ["Lightning Strike", "Shield Barrier"]
    },
    opponentCard: {
      id: "2", 
      name: "Shadow Mage",
      health: 70,
      maxHealth: 100,
      attack: 50,
      defense: 25,
      energy: 80,
      maxEnergy: 100,
      rarity: "rare",
      faction: "purple",
      abilities: ["Dark Bolt", "Phase Shift"]
    },
    battleLog: [],
    spectators: 1247,
    isPlayerTurn: true
  })

  const [isSearching, setIsSearching] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [battleEffects, setBattleEffects] = useState<string[]>([])
  const [arenaTheme, setArenaTheme] = useState("neon-city")
  const [showControls, setShowControls] = useState(true)
  const [showBattleLog, setShowBattleLog] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Animation values
  const cardRotateX = useMotionValue(0)
  const cardRotateY = useMotionValue(0)
  const arenaRotation = useMotionValue(0)
  const particleOpacity = useMotionValue(0.6)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (battleState.phase === "battle" && battleState.timeLeft > 0) {
      timer = setTimeout(() => {
        setBattleState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }))
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [battleState.timeLeft, battleState.phase])

  useEffect(() => {
    const interval = setInterval(() => {
      setBattleState(prev => ({ 
        ...prev, 
        spectators: prev.spectators + Math.floor(Math.random() * 5) - 2
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleFindOpponent = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setBattleState(prev => ({ ...prev, phase: "battle", timeLeft: 30 }))
    }, 3000)
  }

  const handleBattleAction = (action: string) => {
    if (!battleState.isPlayerTurn || battleState.phase !== "battle") return
    
    setSelectedAction(action)
    setBattleEffects(prev => [...prev, action])
    
    // Simulate battle logic
    const damage = Math.floor(Math.random() * 20) + 10
    const newLog = `Player used ${action} - ${damage} damage!`
    
    setBattleState(prev => ({
      ...prev,
      opponentCard: {
        ...prev.opponentCard,
        health: Math.max(0, prev.opponentCard.health - damage)
      },
      battleLog: [newLog, ...prev.battleLog.slice(0, 4)],
      isPlayerTurn: false,
      timeLeft: 30
    }))

    // Clear effects after animation
    setTimeout(() => {
      setBattleEffects(prev => prev.filter(effect => effect !== action))
      setSelectedAction(null)
    }, 1500)

    // Opponent turn
    setTimeout(() => {
      const opponentDamage = Math.floor(Math.random() * 15) + 8
      const opponentLog = `Opponent used Shadow Strike - ${opponentDamage} damage!`
      
      setBattleState(prev => ({
        ...prev,
        playerCard: {
          ...prev.playerCard,
          health: Math.max(0, prev.playerCard.health - opponentDamage)
        },
        battleLog: [opponentLog, ...prev.battleLog.slice(0, 4)],
        isPlayerTurn: true,
        timeLeft: 30
      }))
    }, 2500)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "from-yellow-400 to-orange-500"
      case "epic": return "from-purple-400 to-pink-500"
      case "rare": return "from-blue-400 to-cyan-500"
      default: return "from-gray-400 to-gray-600"
    }
  }

  const getFactionColor = (faction: string) => {
    return faction === "blue" ? "from-blue-500 to-cyan-400" : "from-purple-500 to-pink-400"
  }

  if (battleState.phase === "matchmaking") {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated Background - Mobile Optimized */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />
          <motion.div 
            className="absolute inset-0"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {Array.from({ length: isMobile ? 50 : 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent px-4">
                Battle Arena
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-4 px-4">
                Enter the ultimate NFT card rivalry battleground
              </p>
            </motion.div>

            <motion.div
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 mx-auto relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, type: "spring" }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin" 
                   style={{ animationDuration: "10s" }} />
              <div className="absolute inset-4 rounded-full border border-purple-500/30 animate-spin" 
                   style={{ animationDuration: "15s", animationDirection: "reverse" }} />
              <div className="absolute inset-8 rounded-full border border-pink-500/30 animate-spin" 
                   style={{ animationDuration: "20s" }} />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 md:space-y-4">
                  <Sword className="w-12 h-12 md:w-16 md:h-16 mx-auto text-cyan-400" />
                  <p className="text-base md:text-lg font-semibold">Ready for Battle</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-4 md:space-y-6"
            >
              {!isSearching ? (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 md:px-12 md:py-6 text-base md:text-xl font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 w-full sm:w-auto"
                  onClick={handleFindOpponent}
                >
                  <Target className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                  Find Opponent
                </Button>
              ) : (
                <div className="space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 md:w-16 md:h-16 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
                  />
                  <p className="text-base md:text-lg">Searching for worthy opponent...</p>
                  <div className="flex justify-center space-x-4 text-xs md:text-sm text-muted-foreground">
                    <span>Queue Position: #3</span>
                    <span>•</span>
                    <span>Est. Wait: 15s</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 px-4">
                <Card className="bg-surface border-border/50 hover:border-cyan-500/50 transition-colors">
                  <CardContent className="p-4 md:p-6 text-center">
                    <Trophy className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-yellow-500" />
                    <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Ranked Battles</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Climb the leaderboard</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-surface border-border/50 hover:border-purple-500/50 transition-colors">
                  <CardContent className="p-4 md:p-6 text-center">
                    <Users className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-purple-500" />
                    <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Quick Match</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Fast-paced battles</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-surface border-border/50 hover:border-pink-500/50 transition-colors">
                  <CardContent className="p-4 md:p-6 text-center">
                    <Star className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-pink-500" />
                    <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Tournament</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Compete for prizes</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 3D Arena Background - Mobile Optimized */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          style={{ rotateX: isMobile ? 0 : arenaRotation }}
        >
          {/* Grid Floor - Mobile Responsive */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px]">
            <div className="w-full h-full border-2 border-cyan-500/30 rounded-full relative">
              {Array.from({ length: isMobile ? 4 : 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border border-cyan-500/20 rounded-full"
                  style={{ 
                    transform: `scale(${(i + 1) * 0.125})`,
                    animation: `pulse ${2 + i * 0.2}s infinite alternate`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating Particles - Mobile Optimized */}
          <motion.div 
            className="absolute inset-0"
            style={{ opacity: particleOpacity }}
          >
            {Array.from({ length: isMobile ? 25 : 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Main Battle Interface */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Top Status Bar - Mobile Responsive */}
        <div className="p-2 md:p-4 flex justify-between items-center bg-surface/80 backdrop-blur-sm border-b border-border/50">
          <div className="flex items-center space-x-2 md:space-x-6">
            <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 text-xs">
              <Timer className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              {battleState.timeLeft}s
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400 text-xs hidden sm:flex">
              <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              {battleState.spectators.toLocaleString()}
            </Badge>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs">
              <Crown className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              #247
            </Badge>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-2">
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowBattleLog(!showBattleLog)}
                className="p-2"
              >
                <Menu className="w-4 h-4" />
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowControls(!showControls)} className="p-2">
              <Settings className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
            <Button variant="destructive" size="sm" className="p-2">
              <Flag className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>

        {/* Battle Cards - Mobile Layout */}
        <div className={`flex-1 ${isMobile ? 'flex flex-col' : 'flex items-center justify-between'} px-4 md:px-8 py-6 md:py-12`}>
          {isMobile ? (
            <>
              {/* Mobile Card Layout */}
              <div className="flex justify-between items-start mb-6">
                {/* Player Card - Compact */}
                <motion.div
                  className="w-40 sm:w-48"
                  animate={battleEffects.includes("attack") ? { 
                    x: [0, 20, 0], 
                    rotateZ: [0, 10, 0] 
                  } : {}}
                >
                  <Card className={`bg-gradient-to-br ${getFactionColor(battleState.playerCard.faction)} p-1 shadow-lg`}>
                    <div className="bg-surface rounded p-3">
                      <h3 className="text-sm font-bold text-cyan-400 mb-2">{battleState.playerCard.name}</h3>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs">
                          <span>HP</span>
                          <span>{battleState.playerCard.health}/{battleState.playerCard.maxHealth}</span>
                        </div>
                        <Progress 
                          value={(battleState.playerCard.health / battleState.playerCard.maxHealth) * 100} 
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-red-400 font-bold">{battleState.playerCard.attack}</div>
                          <div className="text-muted-foreground">ATK</div>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-400 font-bold">{battleState.playerCard.defense}</div>
                          <div className="text-muted-foreground">DEF</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* VS Mobile */}
                <motion.div 
                  className="flex items-center justify-center flex-1 mx-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                    VS
                  </div>
                </motion.div>

                {/* Opponent Card - Compact */}
                <motion.div className="w-40 sm:w-48">
                  <Card className={`bg-gradient-to-br ${getFactionColor(battleState.opponentCard.faction)} p-1 shadow-lg`}>
                    <div className="bg-surface rounded p-3">
                      <h3 className="text-sm font-bold text-purple-400 mb-2">{battleState.opponentCard.name}</h3>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs">
                          <span>HP</span>
                          <span>{battleState.opponentCard.health}/{battleState.opponentCard.maxHealth}</span>
                        </div>
                        <Progress 
                          value={(battleState.opponentCard.health / battleState.opponentCard.maxHealth) * 100} 
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-red-400 font-bold">{battleState.opponentCard.attack}</div>
                          <div className="text-muted-foreground">ATK</div>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-400 font-bold">{battleState.opponentCard.defense}</div>
                          <div className="text-muted-foreground">DEF</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Mobile Battle Log */}
              {showBattleLog && (
                <motion.div 
                  className="bg-surface/90 backdrop-blur-sm rounded-lg border border-border/50 p-3 mb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm flex items-center">
                      <Target className="w-4 h-4 mr-2 text-cyan-400" />
                      Battle Log
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowBattleLog(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {battleState.battleLog.slice(0, 3).map((log, index) => (
                      <div key={index} className="text-xs p-2 bg-muted/50 rounded text-muted-foreground">
                        {log}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <>
              {/* Desktop Card Layout - Keep existing */}
              <motion.div
                className="relative"
                style={{ rotateY: cardRotateY, rotateX: cardRotateX }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                animate={battleEffects.includes("attack") ? { 
                  x: [0, 50, 0], 
                  rotateZ: [0, 15, 0] 
                } : {}}
              >
                <Card className={`w-80 h-96 bg-gradient-to-br ${getFactionColor(battleState.playerCard.faction)} p-1 shadow-2xl shadow-cyan-500/25`}>
                  <div className="w-full h-full bg-surface rounded-lg p-6 relative overflow-hidden">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-lg" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-cyan-400">{battleState.playerCard.name}</h3>
                        <Badge className={`bg-gradient-to-r ${getRarityColor(battleState.playerCard.rarity)}`}>
                          {battleState.playerCard.rarity}
                        </Badge>
                      </div>
                      
                      {/* Health Bar */}
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span>Health</span>
                          <span>{battleState.playerCard.health}/{battleState.playerCard.maxHealth}</span>
                        </div>
                        <Progress 
                          value={(battleState.playerCard.health / battleState.playerCard.maxHealth) * 100} 
                          className="h-3 bg-gray-700"
                        />
                      </div>

                      {/* Energy Bar */}
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span>Energy</span>
                          <span>{battleState.playerCard.energy}/{battleState.playerCard.maxEnergy}</span>
                        </div>
                        <Progress 
                          value={(battleState.playerCard.energy / battleState.playerCard.maxEnergy) * 100} 
                          className="h-2 bg-gray-700"
                        />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">{battleState.playerCard.attack}</div>
                          <div className="text-xs text-muted-foreground">Attack</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{battleState.playerCard.defense}</div>
                          <div className="text-xs text-muted-foreground">Defense</div>
                        </div>
                      </div>

                      {/* Abilities */}
                      <div className="space-y-2">
                        {battleState.playerCard.abilities.map((ability, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* VS Indicator */}
              <motion.div 
                className="text-center"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-4xl font-bold shadow-lg">
                  VS
                </div>
              </motion.div>

              {/* Opponent Card */}
              <motion.div
                className="relative"
                style={{ rotateY: -10 }}
                whileHover={{ scale: 1.05, rotateY: -20 }}
              >
                <Card className={`w-80 h-96 bg-gradient-to-br ${getFactionColor(battleState.opponentCard.faction)} p-1 shadow-2xl shadow-purple-500/25`}>
                  <div className="w-full h-full bg-surface rounded-lg p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-lg" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-purple-400">{battleState.opponentCard.name}</h3>
                        <Badge className={`bg-gradient-to-r ${getRarityColor(battleState.opponentCard.rarity)}`}>
                          {battleState.opponentCard.rarity}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span>Health</span>
                          <span>{battleState.opponentCard.health}/{battleState.opponentCard.maxHealth}</span>
                        </div>
                        <Progress 
                          value={(battleState.opponentCard.health / battleState.opponentCard.maxHealth) * 100} 
                          className="h-3 bg-gray-700"
                        />
                      </div>

                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span>Energy</span>
                          <span>{battleState.opponentCard.energy}/{battleState.opponentCard.maxEnergy}</span>
                        </div>
                        <Progress 
                          value={(battleState.opponentCard.energy / battleState.opponentCard.maxEnergy) * 100} 
                          className="h-2 bg-gray-700"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">{battleState.opponentCard.attack}</div>
                          <div className="text-xs text-muted-foreground">Attack</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{battleState.opponentCard.defense}</div>
                          <div className="text-xs text-muted-foreground">Defense</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {battleState.opponentCard.abilities.map((ability, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </>
          )}
        </div>

        {/* Battle Controls - Mobile Responsive */}
        <motion.div 
          className="p-3 md:p-6 bg-surface/90 backdrop-blur-sm border-t border-border/50"
          initial={{ y: 100 }}
          animate={{ y: showControls ? 0 : 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className={`${isMobile ? 'grid grid-cols-3 gap-3' : 'flex justify-center space-x-6'} mb-4 md:mb-6`}>
            <Button
              size={isMobile ? "sm" : "lg"}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 text-xs md:text-base"
              onClick={() => handleBattleAction("attack")}
              disabled={!battleState.isPlayerTurn || selectedAction !== null}
            >
              <Sword className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              Attack
            </Button>
            
            <Button
              size={isMobile ? "sm" : "lg"}
              variant="outline"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 disabled:opacity-50 text-xs md:text-base"
              onClick={() => handleBattleAction("defend")}
              disabled={!battleState.isPlayerTurn || selectedAction !== null}
            >
              <Shield className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              Defend
            </Button>
            
            <Button
              size={isMobile ? "sm" : "lg"}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-xs md:text-base"
              onClick={() => handleBattleAction("special")}
              disabled={!battleState.isPlayerTurn || selectedAction !== null || battleState.playerCard.energy < 30}
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              Special
            </Button>
          </div>

          {/* Turn Indicator */}
          <div className="text-center">
            <Badge 
              variant={battleState.isPlayerTurn ? "default" : "secondary"}
              className="text-sm md:text-lg px-4 py-1 md:px-6 md:py-2"
            >
              {battleState.isPlayerTurn ? "Your Turn" : "Opponent's Turn"}
            </Badge>
          </div>
        </motion.div>

        {/* Desktop Battle Log Sidebar */}
        {!isMobile && (
          <motion.div 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-80 bg-surface/90 backdrop-blur-sm rounded-lg border border-border/50 p-4"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-cyan-400" />
              Battle Log
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {battleState.battleLog.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm p-2 bg-muted/50 rounded text-muted-foreground"
                >
                  {log}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}