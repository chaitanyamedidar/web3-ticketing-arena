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
  Volume2
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
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />
          <motion.div 
            className="absolute inset-0"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {Array.from({ length: 100 }).map((_, i) => (
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

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Battle Arena
              </h1>
              <p className="text-xl text-muted-foreground mt-4">
                Enter the ultimate NFT card rivalry battleground
              </p>
            </motion.div>

            <motion.div
              className="w-96 h-96 mx-auto relative"
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
                <div className="text-center space-y-4">
                  <Sword className="w-16 h-16 mx-auto text-cyan-400" />
                  <p className="text-lg font-semibold">Ready for Battle</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-6"
            >
              {!isSearching ? (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  onClick={handleFindOpponent}
                >
                  <Target className="w-6 h-6 mr-3" />
                  Find Opponent
                </Button>
              ) : (
                <div className="space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
                  />
                  <p className="text-lg">Searching for worthy opponent...</p>
                  <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                    <span>Queue Position: #3</span>
                    <span>•</span>
                    <span>Est. Wait: 15s</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card className="bg-surface border-border/50 hover:border-cyan-500/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
                    <h3 className="font-semibold mb-2">Ranked Battles</h3>
                    <p className="text-sm text-muted-foreground">Climb the leaderboard</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-surface border-border/50 hover:border-purple-500/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                    <h3 className="font-semibold mb-2">Quick Match</h3>
                    <p className="text-sm text-muted-foreground">Fast-paced battles</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-surface border-border/50 hover:border-pink-500/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Star className="w-8 h-8 mx-auto mb-3 text-pink-500" />
                    <h3 className="font-semibold mb-2">Tournament</h3>
                    <p className="text-sm text-muted-foreground">Compete for prizes</p>
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
      {/* 3D Arena Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          style={{ rotateX: arenaRotation }}
        >
          {/* Grid Floor */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px]">
            <div className="w-full h-full border-2 border-cyan-500/30 rounded-full relative">
              {Array.from({ length: 8 }).map((_, i) => (
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

          {/* Holographic Boundaries */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-full bg-gradient-to-t from-transparent via-purple-500/30 to-transparent"
                style={{
                  left: `${15 + i * 12}%`,
                  transform: `rotateY(${i * 60}deg)`,
                }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
          </div>

          {/* Floating Particles */}
          <motion.div 
            className="absolute inset-0"
            style={{ opacity: particleOpacity }}
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
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
        {/* Top Status Bar */}
        <div className="p-4 flex justify-between items-center bg-surface/80 backdrop-blur-sm border-b border-border/50">
          <div className="flex items-center space-x-6">
            <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
              <Timer className="w-4 h-4 mr-2" />
              {battleState.timeLeft}s
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
              <Users className="w-4 h-4 mr-2" />
              {battleState.spectators.toLocaleString()} watching
            </Badge>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
              <Crown className="w-4 h-4 mr-2" />
              Rank #247
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowControls(!showControls)}>
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button variant="destructive" size="sm">
              <Flag className="w-4 h-4 mr-2" />
              Forfeit
            </Button>
          </div>
        </div>

        {/* Battle Cards */}
        <div className="flex-1 flex items-center justify-between px-8 py-12">
          {/* Player Card */}
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
        </div>

        {/* Battle Controls */}
        <motion.div 
          className="p-6 bg-surface/90 backdrop-blur-sm border-t border-border/50"
          initial={{ y: 100 }}
          animate={{ y: showControls ? 0 : 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex justify-center space-x-6 mb-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50"
              onClick={() => handleBattleAction("attack")}
              disabled={!battleState.isPlayerTurn || selectedAction !== null}
            >
              <Sword className="w-5 h-5 mr-2" />
              Attack
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 disabled:opacity-50"
              onClick={() => handleBattleAction("defend")}
              disabled={!battleState.isPlayerTurn || selectedAction !== null}
            >
              <Shield className="w-5 h-5 mr-2" />
              Defend
            </Button>
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
              onClick={() => handleBattleAction("special")}
              disabled={!battleState.isPlayerTurn || selectedAction !== null || battleState.playerCard.energy < 30}
            >
              <Zap className="w-5 h-5 mr-2" />
              Special
            </Button>
          </div>

          {/* Turn Indicator */}
          <div className="text-center">
            <Badge 
              variant={battleState.isPlayerTurn ? "default" : "secondary"}
              className="text-lg px-6 py-2"
            >
              {battleState.isPlayerTurn ? "Your Turn" : "Opponent's Turn"}
            </Badge>
          </div>
        </motion.div>

        {/* Battle Log Sidebar */}
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
      </div>
    </div>
  )
}