"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Send,
  Search,
  UserPlus,
  Crown,
  Zap,
  Trophy,
  Calendar,
  Image,
  Video,
  Mic,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Bookmark,
  Globe,
  Lock,
  Flame
} from "lucide-react"

interface SocialPost {
  id: string
  author: {
    username: string
    avatar: string
    level: number
    faction: "cyber" | "neon" | "void"
    isVerified: boolean
  }
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isBookmarked: boolean
  type: "text" | "image" | "video" | "battle" | "event"
}

interface Friend {
  id: string
  username: string
  avatar: string
  level: number
  status: "online" | "offline" | "in-battle" | "in-event"
  faction: "cyber" | "neon" | "void"
  mutualFriends: number
  lastSeen?: string
}

const mockPosts: SocialPost[] = [
  {
    id: "1",
    author: {
      username: "CyberNinja",
      avatar: "/api/placeholder/64/64",
      level: 25,
      faction: "cyber",
      isVerified: true
    },
    content: "Just evolved my rare NFT ticket from last night's concert! The battle stats are insane 🔥⚡",
    image: "/api/placeholder/400/300",
    timestamp: "2 hours ago",
    likes: 47,
    comments: 12,
    shares: 8,
    isLiked: false,
    isBookmarked: true,
    type: "image"
  },
  {
    id: "2",
    author: {
      username: "NeonDancer",
      avatar: "/api/placeholder/64/64",
      level: 18,
      faction: "neon",
      isVerified: false
    },
    content: "Looking for battle partners for tonight's tournament! Who's ready to dominate? 💪",
    timestamp: "4 hours ago",
    likes: 23,
    comments: 6,
    shares: 3,
    isLiked: true,
    isBookmarked: false,
    type: "text"
  },
  {
    id: "3",
    author: {
      username: "VoidMaster",
      avatar: "/api/placeholder/64/64",
      level: 42,
      faction: "void",
      isVerified: true
    },
    content: "Epic battle won! My legendary card combo was unstoppable. Check out the highlights:",
    image: "/api/placeholder/400/300",
    timestamp: "6 hours ago",
    likes: 89,
    comments: 24,
    shares: 15,
    isLiked: true,
    isBookmarked: true,
    type: "battle"
  }
]

const mockFriends: Friend[] = [
  {
    id: "1",
    username: "PixelWarrior",
    avatar: "/api/placeholder/64/64",
    level: 31,
    status: "online",
    faction: "cyber",
    mutualFriends: 12
  },
  {
    id: "2",
    username: "ElectricSoul",
    avatar: "/api/placeholder/64/64",
    level: 28,
    status: "in-battle",
    faction: "neon",
    mutualFriends: 8
  },
  {
    id: "3",
    username: "ShadowBlade",
    avatar: "/api/placeholder/64/64",
    level: 35,
    status: "offline",
    faction: "void",
    mutualFriends: 5,
    lastSeen: "2 hours ago"
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
    case "in-event": return "bg-blue-500"
    default: return "bg-gray-500"
  }
}

const getPostTypeIcon = (type: string) => {
  switch (type) {
    case "battle": return <Trophy className="w-4 h-4 text-yellow-400" />
    case "event": return <Calendar className="w-4 h-4 text-blue-400" />
    case "image": return <Image className="w-4 h-4 text-green-400" />
    case "video": return <Video className="w-4 h-4 text-red-400" />
    default: return <MessageSquare className="w-4 h-4 text-muted-foreground" />
  }
}

export default function SocialHub() {
  const [activeTab, setActiveTab] = useState("feed")
  const [newPost, setNewPost] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log("Liked post:", postId)
  }

  const handleComment = (postId: string) => {
    // Handle comment functionality
    console.log("Comment on post:", postId)
  }

  const handleShare = (postId: string) => {
    // Handle share functionality
    console.log("Shared post:", postId)
  }

  const handleAddFriend = (friendId: string) => {
    // Handle add friend functionality
    console.log("Add friend:", friendId)
  }

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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
              Social Hub
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow warriors, share your victories, and build the ultimate gaming community.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Sidebar - Friends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 space-y-4 sm:space-y-6 order-3 lg:order-1"
          >
            <Card className="bg-surface/50 backdrop-blur-xl border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Friends Online</h3>
                  <Badge variant="outline" className="text-xs">
                    {mockFriends.filter(f => f.status === "online").length} online
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                          <img src={friend.avatar} alt={friend.username} className="w-full h-full object-cover" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(friend.status)} border border-background`} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{friend.username}</div>
                        <div className="text-xs text-muted-foreground">
                          Level {friend.level} • {friend.status === "offline" ? friend.lastSeen : friend.status}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => handleAddFriend(friend.id)}>
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-surface/50 backdrop-blur-xl border-primary/20">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Community Stats</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Members</span>
                  <span className="text-sm font-medium text-white">24,567</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Now</span>
                  <span className="text-sm font-medium text-green-400">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">In Battles</span>
                  <span className="text-sm font-medium text-red-400">456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">At Events</span>
                  <span className="text-sm font-medium text-blue-400">789</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6 space-y-4 sm:space-y-6 order-1 lg:order-2"
          >
            {/* Create Post */}
            <Card className="bg-surface/50 backdrop-blur-xl border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share your latest victory, strategy, or just say hello to the community..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px] bg-background/50 border-primary/20"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Image className="w-4 h-4 mr-2" />
                        Image
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trophy className="w-4 h-4 mr-2" />
                        Battle
                      </Button>
                    </div>
                    <Button disabled={!newPost.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {mockPosts.map((post) => (
                <Card key={post.id} className="bg-surface/50 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
                            <img src={post.author.avatar} alt={post.author.username} className="w-full h-full object-cover" />
                          </div>
                          {post.author.isVerified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-white">{post.author.username}</h4>
                            <Badge variant="outline" className="text-xs">
                              Level {post.author.level}
                            </Badge>
                            {getPostTypeIcon(post.type)}
                          </div>
                          <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-white leading-relaxed">{post.content}</p>
                    
                    {post.image && (
                      <div className="rounded-lg overflow-hidden">
                        <img src={post.image} alt="Post content" className="w-full h-64 object-cover" />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-6">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleLike(post.id)}
                          className={post.isLiked ? "text-red-400" : "text-muted-foreground"}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleComment(post.id)}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleShare(post.id)}>
                          <Share2 className="w-4 h-4 mr-2" />
                          {post.shares}
                        </Button>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current text-yellow-400' : 'text-muted-foreground'}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Right Sidebar - Trending & Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-4 sm:space-y-6 order-2 lg:order-3"
          >
            {/* Search */}
            <Card className="bg-surface/50 backdrop-blur-xl border-primary/20">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users, posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50 border-primary/20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="bg-surface/50 backdrop-blur-xl border-primary/20">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Trending Now</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { tag: "#BattleRoyale", posts: "1.2K posts" },
                  { tag: "#NFTEvolution", posts: "856 posts" },
                  { tag: "#CyberFaction", posts: "634 posts" },
                  { tag: "#LegendaryCards", posts: "423 posts" },
                  { tag: "#MetaverseConcert", posts: "298 posts" }
                ].map((trend, index) => (
                  <div key={trend.tag} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-primary">{trend.tag}</div>
                      <div className="text-xs text-muted-foreground">{trend.posts}</div>
                    </div>
                    <Flame className="w-4 h-4 text-orange-400" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Suggested Friends */}
            <Card className="bg-surface/50 backdrop-blur-xl border-primary/20">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Suggested Friends</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { username: "QuantumGamer", level: 29, mutualFriends: 3 },
                  { username: "NeonStrike", level: 24, mutualFriends: 7 },
                  { username: "VoidHunter", level: 33, mutualFriends: 2 }
                ].map((suggestion) => (
                  <div key={suggestion.username} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                      <div>
                        <div className="text-sm font-medium text-white">{suggestion.username}</div>
                        <div className="text-xs text-muted-foreground">
                          Level {suggestion.level} • {suggestion.mutualFriends} mutual friends
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
