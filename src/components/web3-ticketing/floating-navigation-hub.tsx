"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { 
  Bell, 
  Settings, 
  Wallet, 
  Users, 
  Trophy, 
  Home, 
  Calendar, 
  Swords, 
  Store, 
  Volume2, 
  VolumeX, 
  Copy, 
  ChevronRight,
  Wifi,
  Power,
  HelpCircle,
  Crown,
  Zap,
  MessageSquare,
  Star,
  Globe,
  Menu,
  X
} from 'lucide-react'

interface FloatingNavigationHubProps {
  user: {
    avatar: string
    username: string
    level: number
    xp: number
    maxXp: number
    walletAddress: string
    ethBalance: number
    tokenBalance: number
    isOnline: boolean
    faction: 'cyber' | 'neon' | 'void'
  }
  notifications: number
  isWalletConnected: boolean
  currentSection: string
  onNavigate: (section: string) => void
  onWalletToggle: () => void
  onSettingsChange: (setting: string, value: any) => void
}

export default function FloatingNavigationHub({
  user,
  notifications,
  isWalletConnected,
  currentSection,
  onNavigate,
  onWalletToggle,
  onSettingsChange
}: FloatingNavigationHubProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [theme, setTheme] = useState('arena')
  const [showNotifications, setShowNotifications] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(user.walletAddress)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
    onSettingsChange('sound', !soundEnabled)
  }

  const getFactionColor = (faction: string) => {
    switch (faction) {
      case 'cyber': return 'from-cyan-500 to-blue-500'
      case 'neon': return 'from-purple-500 to-pink-500'
      case 'void': return 'from-gray-500 to-black'
      default: return 'from-purple-500 to-pink-500'
    }
  }

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'battles', icon: Swords, label: 'Battles' },
    { id: 'marketplace', icon: Store, label: 'Market' },
    { id: 'leaderboard', icon: Trophy, label: 'Rankings' },
    { id: 'social', icon: Users, label: 'Social' }
  ]

  const mockNotifications = [
    { id: 1, type: 'battle', message: 'Challenge received from CyberWarrior', time: '2m ago', priority: 'high' },
    { id: 2, type: 'event', message: 'Neon Festival tickets on sale', time: '1h ago', priority: 'medium' },
    { id: 3, type: 'reward', message: 'Daily XP bonus available', time: '3h ago', priority: 'low' }
  ]

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <>
        {/* Mobile Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0.9, 
            y: isVisible ? 0 : -10
          }}
          className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-b border-border/50 px-4 py-3"
        >
          <div className="flex items-center justify-between">
            {/* User Avatar & Stats */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${getFactionColor(user.faction)} rounded-full p-0.5 animate-pulse`}>
                  <div className="bg-surface rounded-full p-0.5">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                {user.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-surface animate-pulse" />
                )}
              </div>
              
              <div className="min-w-0">
                <h3 className="font-display font-bold text-foreground text-sm truncate">
                  {user.username}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge className="bg-primary hover:bg-primary flex items-center space-x-1 px-1.5 py-0.5 text-xs">
                    <Crown className="w-2 h-2" />
                    <span>{user.level}</span>
                  </Badge>
                  <span className="font-mono">{user.ethBalance.toFixed(3)} ETH</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative p-2">
                    <Bell className="w-4 h-4" />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 min-w-4 h-4 p-0 flex items-center justify-center text-xs bg-accent hover:bg-accent">
                        {notifications > 9 ? '9+' : notifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 bg-surface border-border/50 backdrop-blur-xl">
                  <div className="p-3 border-b border-border/30">
                    <h4 className="font-display font-semibold text-foreground text-sm">Notifications</h4>
                  </div>
                  {mockNotifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer hover:bg-muted/30">
                      <div className="flex items-start space-x-2 w-full">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${
                          notification.priority === 'high' ? 'bg-red-500 animate-pulse' :
                          notification.priority === 'medium' ? 'bg-accent' : 'bg-muted-foreground'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-surface border-border/50 backdrop-blur-xl">
                  <DropdownMenuItem onClick={toggleSound} className="cursor-pointer hover:bg-muted/30">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        {soundEnabled ? <Volume2 className="w-4 h-4 mr-3" /> : <VolumeX className="w-4 h-4 mr-3" />}
                        <span className="text-sm">Sound</span>
                      </div>
                      <Badge variant={soundEnabled ? "default" : "secondary"} className="text-xs">
                        {soundEnabled ? 'ON' : 'OFF'}
                      </Badge>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onWalletToggle}
                    className="cursor-pointer hover:bg-muted/30"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Wallet className="w-4 h-4 mr-3" />
                        <span className="text-sm">Wallet</span>
                      </div>
                      {isWalletConnected ? (
                        <div className="flex items-center gap-1">
                          <Wifi className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500">Connected</span>
                        </div>
                      ) : (
                        <span className="text-xs text-red-500">Disconnected</span>
                      )}
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.div>

        {/* Mobile Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-t border-border/50 px-2 py-2 safe-area-pb"
        >
          <div className="grid grid-cols-6 gap-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentSection === item.id ? "default" : "ghost"}
                size="sm"
                className={`p-2 h-auto flex flex-col items-center gap-1 text-xs relative overflow-hidden ${
                  currentSection === item.id 
                    ? 'bg-primary hover:bg-primary text-primary-foreground shadow-lg' 
                    : 'hover:bg-primary/20'
                }`}
                onClick={() => onNavigate(item.id)}
              >
                {currentSection === item.id && (
                  <motion.div
                    layoutId="activeMobileSection"
                    className="absolute inset-0 bg-primary rounded-md"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <item.icon className={`w-4 h-4 relative z-10 ${
                  currentSection === item.id ? 'text-primary-foreground' : 'text-foreground'
                }`} />
                <span className={`text-xs font-medium relative z-10 leading-none ${
                  currentSection === item.id ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
              </Button>
            ))}
          </div>
        </motion.div>
        
        {/* Add padding to body content to account for fixed navigation */}
        <style jsx global>{`
          body {
            padding-top: 60px;
            padding-bottom: 80px;
          }
          .safe-area-pb {
            padding-bottom: env(safe-area-inset-bottom);
          }
        `}</style>
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -20 
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-4 right-4 z-50 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <motion.div
        animate={{ 
          width: isExpanded ? 'auto' : '80px',
          minWidth: isExpanded ? '320px' : '80px'
        }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        className="relative"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Main Panel */}
        <div className="bg-surface/80 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
          {/* Holographic Border Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${getFactionColor(user.faction)} opacity-20 rounded-2xl`} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse rounded-2xl" />
          
          {/* Collapsed State */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center space-y-3"
              >
                {/* Avatar with Status */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${getFactionColor(user.faction)} rounded-full p-0.5 animate-pulse`}>
                    <div className="bg-surface rounded-full p-0.5">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                          {user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-surface animate-pulse" />
                  )}
                </div>

                {/* Notification Bell */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-auto hover:bg-primary/20 transition-colors"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="w-4 h-4 text-foreground" />
                  </Button>
                  {notifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 min-w-5 h-5 p-0 flex items-center justify-center text-xs bg-accent hover:bg-accent">
                      {notifications > 99 ? '99+' : notifications}
                    </Badge>
                  )}
                </div>

                {/* Wallet Status */}
                <div className="flex items-center">
                  <Wifi className={`w-4 h-4 ${isWalletConnected ? 'text-green-500' : 'text-red-500'} animate-pulse`} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded State */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                {/* User Profile Section */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${getFactionColor(user.faction)} rounded-full p-0.5 animate-pulse`}>
                      <div className="bg-surface rounded-full p-0.5">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                            {user.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-surface animate-pulse" />
                    )}
                    <Badge className="absolute -top-2 -left-2 bg-primary hover:bg-primary flex items-center space-x-1">
                      <Crown className="w-3 h-3" />
                      <span className="text-xs font-bold">{user.level}</span>
                    </Badge>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-foreground text-lg truncate">
                      {user.username}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto text-muted-foreground hover:text-foreground font-mono text-xs"
                        onClick={handleCopyAddress}
                      >
                        {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                        <Copy className="w-3 h-3 ml-1" />
                      </Button>
                      {copiedAddress && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-green-500 text-xs font-medium"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </div>

                    {/* XP Progress */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>XP Progress</span>
                        <span>{user.xp}/{user.maxXp}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(user.xp / user.maxXp) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">ETH</span>
                      <Zap className="w-3 h-3 text-secondary" />
                    </div>
                    <p className="font-mono font-bold text-sm text-foreground">{user.ethBalance.toFixed(4)}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">ARENA</span>
                      <Star className="w-3 h-3 text-accent" />
                    </div>
                    <p className="font-mono font-bold text-sm text-foreground">{user.tokenBalance.toLocaleString()}</p>
                  </div>
                </div>

                {/* Navigation Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentSection === item.id ? "default" : "ghost"}
                      size="sm"
                      className={`p-3 h-auto flex flex-col items-center space-y-1 group relative overflow-hidden ${
                        currentSection === item.id 
                          ? 'bg-primary hover:bg-primary text-primary-foreground shadow-lg' 
                          : 'hover:bg-primary/20'
                      }`}
                      onClick={() => onNavigate(item.id)}
                    >
                      {currentSection === item.id && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute inset-0 bg-primary rounded-md"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <item.icon className={`w-4 h-4 relative z-10 ${
                        currentSection === item.id ? 'text-primary-foreground' : 'text-foreground group-hover:text-primary'
                      }`} />
                      <span className={`text-xs font-medium relative z-10 ${
                        currentSection === item.id ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      }`}>
                        {item.label}
                      </span>
                    </Button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {/* Notifications */}
                  <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex-1 relative">
                        <Bell className="w-4 h-4 mr-2" />
                        <span className="text-sm">Alerts</span>
                        {notifications > 0 && (
                          <Badge className="ml-2 min-w-5 h-5 p-0 flex items-center justify-center text-xs bg-accent hover:bg-accent">
                            {notifications}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 bg-surface border-border/50 backdrop-blur-xl">
                      <div className="p-3 border-b border-border/30">
                        <h4 className="font-display font-semibold text-foreground">Notifications</h4>
                      </div>
                      {mockNotifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer hover:bg-muted/30">
                          <div className="flex items-start space-x-3 w-full">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.priority === 'high' ? 'bg-red-500 animate-pulse' :
                              notification.priority === 'medium' ? 'bg-accent' : 'bg-muted-foreground'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator className="bg-border/30" />
                      <DropdownMenuItem className="p-3 text-center cursor-pointer hover:bg-muted/30">
                        <span className="text-sm text-primary">Mark all as read</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Settings */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 bg-surface border-border/50 backdrop-blur-xl">
                      <DropdownMenuItem onClick={toggleSound} className="cursor-pointer hover:bg-muted/30">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            {soundEnabled ? <Volume2 className="w-4 h-4 mr-3" /> : <VolumeX className="w-4 h-4 mr-3" />}
                            <span className="text-sm">Sound Effects</span>
                          </div>
                          <Badge variant={soundEnabled ? "default" : "secondary"}>
                            {soundEnabled ? 'ON' : 'OFF'}
                          </Badge>
                        </div>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem className="cursor-pointer hover:bg-muted/30">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-3" />
                            <span className="text-sm">Theme</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer hover:bg-muted/30">
                        <HelpCircle className="w-4 h-4 mr-3" />
                        <span className="text-sm">Help & Tutorial</span>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-border/30" />
                      
                      <DropdownMenuItem 
                        onClick={onWalletToggle}
                        className="cursor-pointer hover:bg-muted/30"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <Wallet className="w-4 h-4 mr-3" />
                            <span className="text-sm">
                              {isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
                            </span>
                          </div>
                          {isWalletConnected ? (
                            <Power className="w-4 h-4 text-red-500" />
                          ) : (
                            <Wifi className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Social Quick Actions */}
                <div className="flex space-x-2 pt-2 border-t border-border/30">
                  <Button variant="ghost" size="sm" className="flex-1 text-xs">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Chat
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs">
                    <Swords className="w-3 h-3 mr-1" />
                    Challenge
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs">
                    <Trophy className="w-3 h-3 mr-1" />
                    Rank #{Math.floor(Math.random() * 1000) + 1}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}