"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Headphones, Wallet, Music, Zap, Users, Gamepad2, ChevronDown } from "lucide-react"

export default function HolographicHeroStage() {
  return (
    <section className="relative h-screen bg-space-black overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating Musical Notes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`note-${i}`}
            className="absolute animate-bounce opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Music className="w-3 h-3 md:w-4 md:h-4 text-hot-pink" />
          </div>
        ))}
      </div>

      {/* Laser Beam Effects - Mobile Responsive */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:left-10 w-48 md:w-96 h-0.5 bg-gradient-to-r from-transparent via-neon-purple to-transparent rotate-45 animate-pulse" />
        <div className="absolute bottom-32 right-8 md:right-16 w-40 md:w-80 h-0.5 bg-gradient-to-r from-transparent via-hot-pink to-transparent -rotate-45 animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-36 md:w-72 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent rotate-12 animate-pulse" />
      </div>

      {/* 3D Stage Platform Container */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <div className="relative transform-gpu">
          {/* Main Stage Platform - Mobile Responsive */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 animate-spin" style={{ animationDuration: '20s' }}>
            {/* Stage Base */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-surface/80 to-card/60 backdrop-blur-sm border border-primary/30 shadow-2xl">
              {/* Neon Edge Lighting */}
              <div className="absolute inset-0 rounded-full border-2 border-secondary animate-pulse shadow-lg shadow-secondary/50" />
            </div>

            {/* Spotlight Cones - Mobile Adjusted */}
            <div className="absolute -top-12 md:-top-20 left-1/2 transform -translate-x-1/2">
              <div className="w-3 md:w-4 h-20 md:h-32 bg-gradient-to-b from-neon-blue/80 to-transparent rotate-12 animate-pulse" />
            </div>
            <div className="absolute -top-10 md:-top-16 right-8 md:right-12">
              <div className="w-2 md:w-3 h-18 md:h-28 bg-gradient-to-b from-hot-pink/70 to-transparent -rotate-12 animate-pulse" />
            </div>
            <div className="absolute -top-16 md:-top-24 left-8 md:left-12">
              <div className="w-3 md:w-5 h-24 md:h-36 bg-gradient-to-b from-neon-purple/60 to-transparent rotate-45 animate-pulse" />
            </div>

            {/* Holographic Performer Silhouettes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-12 h-18 md:w-16 md:h-24 bg-gradient-to-t from-primary/60 to-transparent rounded-t-full animate-pulse shadow-lg shadow-primary/30" />
                <div className="absolute top-1 md:top-2 left-1/2 transform -translate-x-1/2 w-5 h-5 md:w-6 md:h-6 bg-primary/80 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Energy Orbs - Mobile Responsive */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`orb-${i}`}
                className="absolute w-2 h-2 md:w-3 md:h-3 bg-accent rounded-full animate-bounce shadow-lg shadow-accent/50"
                style={{
                  left: `${50 + 35 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                  top: `${50 + 35 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>

          {/* Holographic Text Displays - Mobile Responsive */}
          <div className="absolute -top-20 md:-top-32 left-1/2 transform -translate-x-1/2">
            <Card className="bg-surface/20 backdrop-blur-md border border-primary/30 px-3 py-2 md:px-6 md:py-3">
              <p className="text-primary font-display text-sm md:text-lg font-semibold tracking-wider animate-pulse">
                WEB3 CONCERTS
              </p>
            </Card>
          </div>
          <div className="absolute -bottom-12 md:-bottom-20 right-0">
            <Card className="bg-surface/20 backdrop-blur-md border border-secondary/30 px-2 py-1 md:px-4 md:py-2">
              <p className="text-secondary font-display text-xs md:text-sm font-medium tracking-wide animate-pulse">
                NFT TICKETS
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content Overlay - Mobile First */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Hero Title - Mobile Responsive */}
        <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse leading-tight">
          Experience Music
          <br />
          in the Metaverse
        </h1>
        
        {/* Subtitle - Mobile Responsive */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl leading-relaxed px-2">
          Transform your event tickets into collectible gaming NFTs. Battle, trade, and evolve your digital concert memories in the ultimate Web3 entertainment platform.
        </p>

        {/* CTA Buttons - Mobile First */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12 md:mb-16 w-full max-w-md sm:max-w-none">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold px-6 py-4 md:px-8 md:py-6 text-base md:text-lg rounded-lg shadow-2xl shadow-primary/30 border border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-primary/50 w-full sm:w-auto"
          >
            <Gamepad2 className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
            Enter the Arena
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-surface/20 backdrop-blur-md border-2 border-secondary/50 text-secondary hover:bg-secondary/10 font-semibold px-6 py-4 md:px-8 md:py-6 text-base md:text-lg rounded-lg shadow-xl shadow-secondary/20 transition-all duration-300 hover:scale-105 hover:border-secondary hover:shadow-secondary/40 w-full sm:w-auto"
          >
            <Wallet className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
            Connect Wallet
          </Button>
        </div>

        {/* Feature Icons - Mobile Responsive Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 md:gap-8 mb-8 w-full max-w-sm xs:max-w-none">
          {[
            { icon: Headphones, label: "Immersive Audio", color: "text-primary" },
            { icon: Zap, label: "Lightning Fast", color: "text-secondary" },
            { icon: Users, label: "Community Driven", color: "text-accent" }
          ].map((feature, i) => (
            <Card key={i} className="bg-surface/10 backdrop-blur-md border border-muted/30 p-3 md:p-4 hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
              <feature.icon className={`w-6 h-6 md:w-8 md:h-8 ${feature.color} mx-auto mb-2`} />
              <p className="text-xs md:text-sm text-muted-foreground font-medium">{feature.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Sound Trigger Buttons - Mobile Hidden, Desktop Visible */}
      <div className="absolute top-8 right-8 space-y-4 hidden lg:block">
        {["Crowd", "Bass", "Synth"].map((sound, i) => (
          <Button
            key={sound}
            variant="ghost"
            size="sm"
            className="bg-surface/10 backdrop-blur-md border border-muted/30 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
          >
            <Music className="w-4 h-4 mr-2" />
            {sound}
          </Button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Card className="bg-surface/10 backdrop-blur-md border border-muted/30 p-2 md:p-3 rounded-full">
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
        </Card>
      </div>

      {/* Additional Glow Effects - Mobile Adjusted */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-72 md:h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  )
}