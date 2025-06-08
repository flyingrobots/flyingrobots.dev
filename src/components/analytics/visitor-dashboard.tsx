'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Activity, Users, Globe, TrendingUp, Eye, Clock } from 'lucide-react'

interface VisitorData {
  timestamp: number
  country: string
  device: string
  page: string
}

export function VisitorAnalyticsDashboard() {
  const [visitors, setVisitors] = useState<VisitorData[]>([])
  const [activeUsers, setActiveUsers] = useState(0)
  const [totalViews, setTotalViews] = useState(0)
  
  useEffect(() => {
    // Simulate real-time visitor data
    const interval = setInterval(() => {
      const countries = ['USA', 'UK', 'Canada', 'Germany', 'Japan', 'Australia', 'France', 'India']
      const devices = ['Desktop', 'Mobile', 'Tablet']
      const pages = ['/', '/projects', '/about', '/contact']
      
      const newVisitor: VisitorData = {
        timestamp: Date.now(),
        country: countries[Math.floor(Math.random() * countries.length)],
        device: devices[Math.floor(Math.random() * devices.length)],
        page: pages[Math.floor(Math.random() * pages.length)]
      }
      
      setVisitors(prev => [...prev.slice(-9), newVisitor])
      setActiveUsers(Math.floor(Math.random() * 50) + 10)
      setTotalViews(prev => prev + 1)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'USA': '🇺🇸',
      'UK': '🇬🇧',
      'Canada': '🇨🇦',
      'Germany': '🇩🇪',
      'Japan': '🇯🇵',
      'Australia': '🇦🇺',
      'France': '🇫🇷',
      'India': '🇮🇳'
    }
    return flags[country] || '🌍'
  }
  
  const getDeviceIcon = (device: string) => {
    switch(device) {
      case 'Desktop': return '💻'
      case 'Mobile': return '📱'
      case 'Tablet': return '📱'
      default: return '🖥️'
    }
  }
  
  return (
    <Card className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Live Visitor Analytics
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Real-time</span>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background/50 rounded-lg p-3 text-center"
          >
            <Users className="w-5 h-5 mx-auto mb-1 text-blue-500" />
            <div className="text-2xl font-bold">{activeUsers}</div>
            <div className="text-xs text-muted-foreground">Active Now</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-background/50 rounded-lg p-3 text-center"
          >
            <Eye className="w-5 h-5 mx-auto mb-1 text-purple-500" />
            <div className="text-2xl font-bold">{totalViews}</div>
            <div className="text-xs text-muted-foreground">Total Views</div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-background/50 rounded-lg p-3 text-center"
          >
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-500" />
            <div className="text-2xl font-bold">+23%</div>
            <div className="text-xs text-muted-foreground">Growth</div>
          </motion.div>
        </div>
        
        {/* Live Visitor Feed */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Globe className="w-4 h-4" />
            <span>Recent Visitors</span>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {visitors.map((visitor, i) => (
              <motion.div
                key={visitor.timestamp}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between bg-background/30 rounded-lg p-2 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getCountryFlag(visitor.country)}</span>
                  <span className="font-medium">{visitor.country}</span>
                  <span className="text-lg">{getDeviceIcon(visitor.device)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{visitor.page}</span>
                  <Clock className="w-3 h-3" />
                  <span>now</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Live Activity Indicator */}
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-4 bg-green-500 rounded-full"
              animate={{
                height: [16, 32, 16],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}