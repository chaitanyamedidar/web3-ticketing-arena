"use client"

import HolographicHeroStage from "@/components/web3-ticketing/holographic-hero-stage"
import FloatingEventPortals from "@/components/web3-ticketing/floating-event-portals"
import NFTTicketWallet from "@/components/web3-ticketing/nft-ticket-wallet"
import BattleArenaRivalry from "@/components/web3-ticketing/battle-arena-rivalry"
import HolographicVaultRewards from "@/components/web3-ticketing/holographic-vault-rewards"
import FloatingNavigationHub from "@/components/web3-ticketing/floating-navigation-hub"
import { useState } from "react"

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState("home")
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [settings, setSettings] = useState({
    sound: true,
    theme: "arena"
  })

  const mockUser = {
    avatar: "/api/placeholder/64/64",
    username: "CyberNinja",
    level: 12,
    xp: 2450,
    maxXp: 3000,
    walletAddress: "0x742d35Cc6551C73c8d3e7EA3B7a5B5a8D5F6E9C2",
    ethBalance: 0.25,
    tokenBalance: 15840,
    isOnline: true,
    faction: "cyber" as const
  }

  const handleNavigate = (section: string) => {
    setCurrentSection(section)
  }

  const handleWalletToggle = () => {
    setIsWalletConnected(!isWalletConnected)
  }

  const handleSettingsChange = (setting: string, value: any) => {
    setSettings(prev => ({ ...prev, [setting]: value }))
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "home":
        return <HolographicHeroStage />
      case "events":
        return <FloatingEventPortals />
      case "wallet":
        return <NFTTicketWallet />
      case "battles":
        return <BattleArenaRivalry />
      case "rewards":
        return <HolographicVaultRewards />
      default:
        return <HolographicHeroStage />
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      {renderCurrentSection()}
      
      <FloatingNavigationHub
        user={mockUser}
        notifications={3}
        isWalletConnected={isWalletConnected}
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onWalletToggle={handleWalletToggle}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  )
}