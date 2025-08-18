"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react"
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Gift, 
  Coins, 
  Key, 
  Package, 
  Search,
  Filter,
  SortDesc,
  Share2,
  Eye,
  Lock,
  Clock,
  CheckCircle,
  Flame,
  Target,
  Calendar,
  Users,
  Award,
  Sparkles,
  Menu,
  X
} from "lucide-react"
import { useState, useEffect } from "react"

const HolographicVaultRewards = () => {
  const [selectedFilter, setSelectedFilter] = useState("available")
  const [openContainer, setOpenContainer] = useState<string | null>(null)
  const [claimedRewards, setClaimedRewards] = useState<string[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
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

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMobile) return
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left - rect.width / 2)
    mouseY.set(event.clientY - rect.top - rect.height / 2)
  }

  const rewards = [
    {
      id: "legendary-pass",
      type: "Event Access",
      name: "VIP Legendary Pass",
      rarity: "legendary",
      value: "5.2 ETH",
      description: "Backstage access to all major events",
      icon: Crown,
      glow: "from-yellow-400 via-orange-500 to-purple-600"
    },
    {
      id: "rare-nft",
      type: "NFT Collection", 
      name: "Rare Holographic Card",
      rarity: "rare",
      value: "2.1 ETH",
      description: "Limited edition artist collaboration",
      icon: Sparkles,
      glow: "from-purple-500 via-pink-500 to-blue-500"
    },
    {
      id: "crypto-reward",
      type: "Cryptocurrency",
      name: "Token Bonus",
      rarity: "common",
      value: "150 TIXN",
      description: "Platform utility tokens",
      icon: Coins,
      glow: "from-cyan-400 to-blue-500"
    },
    {
      id: "power-orb",
      type: "Special Ability",
      name: "Lightning Strike",
      rarity: "rare",
      value: "Power-up",
      description: "Increase battle damage by 200%",
      icon: Zap,
      glow: "from-yellow-400 to-orange-500"
    },
    {
      id: "merch-bundle",
      type: "Physical Item",
      name: "Artist Merchandise",
      rarity: "common",
      value: "$89.99",
      description: "Exclusive tour merchandise bundle",
      icon: Package,
      glow: "from-gray-400 to-gray-600"
    },
    {
      id: "master-key",
      type: "Access Token",
      name: "Master Vault Key",
      rarity: "legendary",
      value: "Priceless",
      description: "Unlocks secret vault chambers",
      icon: Key,
      glow: "from-gold-400 via-yellow-500 to-orange-600"
    }
  ]

  const achievements = [
    { id: "streak-7", name: "Week Warrior", streak: 7, icon: Flame, progress: 100 },
    { id: "events-10", name: "Concert Collector", count: 10, icon: Target, progress: 80 },
    { id: "social-5", name: "Social Butterfly", shares: 5, icon: Share2, progress: 60 },
    { id: "rare-hunter", name: "Rare Hunter", rares: 3, icon: Crown, progress: 90 }
  ]

  const userStats = {
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    loyaltyPoints: 15840,
    streakDays: 7,
    eventsAttended: 23,
    nftsOwned: 8,
    battlesWon: 15
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
      case "rare": return "text-purple-400 border-purple-400/30 bg-purple-400/10"
      default: return "text-cyan-400 border-cyan-400/30 bg-cyan-400/10"
    }
  }

  const handleClaimReward = (rewardId: string) => {
    setClaimedRewards([...claimedRewards, rewardId])
    setOpenContainer(null)
  }

  return (
    <div className="min-h-screen bg-space-black relative overflow-hidden">
      {/* Holographic Vault Environment - Mobile Optimized */}
      <div className="absolute inset-0">
        {/* Ambient Particles - Reduced for mobile */}
        {Array.from({ length: isMobile ? 25 : 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        
        {/* Geometric Projections - Simplified for mobile */}
        {!isMobile && (
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-primary/20"
                animate={{
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  width: `${200 + i * 50}px`,
                  height: `${200 + i * 50}px`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Vault Header - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4 px-4">
            Holographic Vault
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4">
            Your treasure chamber of earned rewards, achievements, and digital assets
          </p>
        </motion.div>

        {/* User Stats Dashboard - Mobile Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12"
        >
          <Card className="bg-surface border-border/50 backdrop-blur-sm">
            <CardContent className="p-3 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs md:text-sm text-muted-foreground">Level</p>
                  <p className="text-lg md:text-2xl font-bold text-primary">{userStats.level}</p>
                </div>
                <Star className="w-6 h-6 md:w-8 md:h-8 text-primary self-end sm:self-auto" />
              </div>
              <div className="mt-2 md:mt-4">
                <Progress value={(userStats.xp / userStats.nextLevelXp) * 100} className="h-1.5 md:h-2" />
                <p className="text-xs text-muted-foreground mt-1 md:mt-2">
                  {userStats.xp} / {userStats.nextLevelXp} XP
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border/50 backdrop-blur-sm">
            <CardContent className="p-3 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs md:text-sm text-muted-foreground">Points</p>
                  <p className="text-lg md:text-2xl font-bold text-secondary">{isMobile ? '15.8k' : userStats.loyaltyPoints.toLocaleString()}</p>
                </div>
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-secondary self-end sm:self-auto" />
              </div>
              <div className="flex items-center mt-1 md:mt-2">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-secondary mr-1" />
                <span className="text-xs text-muted-foreground">+240 today</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border/50 backdrop-blur-sm">
            <CardContent className="p-3 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs md:text-sm text-muted-foreground">Streak</p>
                  <p className="text-lg md:text-2xl font-bold text-accent">{userStats.streakDays} days</p>
                </div>
                <Flame className="w-6 h-6 md:w-8 md:h-8 text-accent self-end sm:self-auto" />
              </div>
              <div className="flex items-center mt-1 md:mt-2">
                <Calendar className="w-3 h-3 md:w-4 md:h-4 text-accent mr-1" />
                <span className="text-xs text-muted-foreground">Keep it up!</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border/50 backdrop-blur-sm">
            <CardContent className="p-3 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-xs md:text-sm text-muted-foreground">NFTs</p>
                  <p className="text-lg md:text-2xl font-bold text-neon-purple">{userStats.nftsOwned}</p>
                </div>
                <Crown className="w-6 h-6 md:w-8 md:h-8 text-neon-purple self-end sm:self-auto" />
              </div>
              <div className="flex items-center mt-1 md:mt-2">
                <Award className="w-3 h-3 md:w-4 md:h-4 text-neon-purple mr-1" />
                <span className="text-xs text-muted-foreground">3 rare items</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vault Controls - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 md:mb-8"
        >
          {isMobile ? (
            // Mobile Filter Layout
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <Button
                    variant={selectedFilter === "available" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("available")}
                    className="text-xs"
                  >
                    Available
                  </Button>
                  <Button
                    variant={selectedFilter === "claimed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("claimed")}
                    className="text-xs"
                  >
                    Claimed
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="p-2"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </div>

              {/* Mobile Filters Dropdown */}
              <AnimatePresence>
                {showMobileFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-surface/90 backdrop-blur-sm rounded-lg border border-border/50 p-4 mb-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-sm">Filters & Sort</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowMobileFilters(false)}
                        className="p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={selectedFilter === "locked" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFilter("locked")}
                        className="text-xs"
                      >
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Filter className="w-3 h-3 mr-1" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <SortDesc className="w-3 h-3 mr-1" />
                        Sort
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Search className="w-3 h-3 mr-1" />
                        Search
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            // Desktop Filter Layout
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant={selectedFilter === "available" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("available")}
                  className="bg-surface hover:bg-surface/80"
                >
                  Available
                </Button>
                <Button
                  variant={selectedFilter === "claimed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("claimed")}
                  className="bg-surface hover:bg-surface/80"
                >
                  Claimed
                </Button>
                <Button
                  variant={selectedFilter === "locked" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("locked")}
                  className="bg-surface hover:bg-surface/80"
                >
                  Locked
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-surface hover:bg-surface/80">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm" className="bg-surface hover:bg-surface/80">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="bg-surface hover:bg-surface/80">
                  <SortDesc className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Floating Reward Containers - Mobile Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12"
          onMouseMove={handleMouseMove}
          style={{ perspective: isMobile ? "none" : "1000px" }}
        >
          {rewards.map((reward, index) => {
            const Icon = reward.icon
            const isOpened = openContainer === reward.id
            const isClaimed = claimedRewards.includes(reward.id)
            
            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  rotateY: !isMobile ? (index % 2 === 0 ? 5 : -5) : 0
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  rotateX: isMobile ? 0 : rotateX,
                  rotateY: isMobile ? 0 : rotateY,
                  transformStyle: isMobile ? "flat" : "preserve-3d"
                }}
                className="relative group"
              >
                <Card className={`
                  bg-surface border-border/50 backdrop-blur-sm relative overflow-hidden
                  transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20
                  ${isClaimed ? 'opacity-60' : ''}
                `}>
                  {/* Rarity Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${reward.glow} opacity-20 blur-xl`} />
                  
                  {/* Container Animation - Reduced for mobile */}
                  <motion.div
                    animate={!isClaimed && !isMobile ? {
                      y: [0, -5, 0],
                      rotateY: [0, 5, 0, -5, 0]
                    } : {}}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10"
                  >
                    <CardContent className="p-4 md:p-6">
                      {/* Reward Header - Mobile Responsive */}
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-r ${reward.glow}`}>
                            <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                          </div>
                          <div>
                            <Badge className={`${getRarityColor(reward.rarity)} text-xs`}>
                              {reward.rarity}
                            </Badge>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1">
                              {reward.type}
                            </p>
                          </div>
                        </div>
                        {isClaimed && <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />}
                      </div>

                      {/* Reward Info - Mobile Responsive */}
                      <h3 className="text-base md:text-xl font-bold text-foreground mb-2 line-clamp-2">
                        {reward.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                        {reward.description}
                      </p>
                      
                      {/* Value Display - Mobile Responsive */}
                      <div className="flex items-center justify-between mb-4 md:mb-6">
                        <span className="text-sm md:text-lg font-bold text-primary">
                          {reward.value}
                        </span>
                        <div className="flex items-center space-x-1 md:space-x-2">
                          <Button variant="outline" size="sm" className="p-2">
                            <Eye className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Action Button - Mobile Responsive */}
                      <AnimatePresence>
                        {!isClaimed ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                          >
                            {!isOpened ? (
                              <Button
                                onClick={() => setOpenContainer(reward.id)}
                                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-xs md:text-sm"
                                size={isMobile ? "sm" : "default"}
                              >
                                <Gift className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                                Open Container
                              </Button>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-3"
                              >
                                <div className="text-center">
                                  <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, ease: "linear" }}
                                    className={`w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full bg-gradient-to-r ${reward.glow} flex items-center justify-center mb-3`}
                                  >
                                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                  </motion.div>
                                  <p className="text-xs md:text-sm font-medium text-foreground">
                                    Reward Revealed!
                                  </p>
                                </div>
                                <Button
                                  onClick={() => handleClaimReward(reward.id)}
                                  className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/80 hover:to-primary/80 text-xs md:text-sm"
                                  size={isMobile ? "sm" : "default"}
                                >
                                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                                  Claim Reward
                                </Button>
                              </motion.div>
                            )}
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                          >
                            <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-xs md:text-sm text-green-400 font-medium">
                              Claimed Successfully
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </motion.div>

                  {/* Particle Effects for Unopened Containers - Reduced for mobile */}
                  {!isClaimed && (
                    <>
                      {Array.from({ length: isMobile ? 4 : 8 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 bg-gradient-to-r ${reward.glow} rounded-full`}
                          animate={{
                            x: [0, Math.random() * 40 - 20],
                            y: [0, Math.random() * 40 - 20],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2 + Math.random(),
                            repeat: Infinity,
                            delay: Math.random() * 2
                          }}
                          style={{
                            left: "50%",
                            top: "50%"
                          }}
                        />
                      ))}
                    </>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Achievement Gallery - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent px-4">
            Achievement Gallery
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -5 }}
                  className="relative group"
                >
                  <Card className="bg-surface border-border/50 backdrop-blur-sm relative overflow-hidden">
                    <CardContent className="p-3 md:p-6 text-center">
                      <motion.div
                        animate={!isMobile ? { 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center"
                      >
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-sm md:text-lg font-bold text-foreground mb-2 line-clamp-2">
                        {achievement.name}
                      </h3>
                      
                      <div className="mb-3 md:mb-4">
                        <Progress value={achievement.progress} className="h-1.5 md:h-2" />
                        <p className="text-xs text-muted-foreground mt-1 md:mt-2">
                          {achievement.progress}% Complete
                        </p>
                      </div>

                      {achievement.progress === 100 && (
                        <Badge className="bg-gradient-to-r from-accent to-primary text-white text-xs">
                          <Trophy className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                          <span className="hidden sm:inline">Completed</span>
                          <span className="sm:hidden">Done</span>
                        </Badge>
                      )}
                    </CardContent>

                    {/* Achievement Glow Effect */}
                    {achievement.progress === 100 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HolographicVaultRewards