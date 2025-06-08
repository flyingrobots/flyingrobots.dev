'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Battery, 
  Thermometer,
  Shield,
  Zap,
  Database,
  Globe2
} from 'lucide-react'

interface SystemMetric {
  label: string
  value: number
  unit: string
  icon: React.ElementType
  color: string
  status: 'good' | 'warning' | 'critical'
}

export function ControlCenterDashboard() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      label: 'CPU Usage',
      value: 0,
      unit: '%',
      icon: Cpu,
      color: '#3B82F6',
      status: 'good'
    },
    {
      label: 'Memory',
      value: 0,
      unit: 'GB',
      icon: HardDrive,
      color: '#8B5CF6',
      status: 'good'
    },
    {
      label: 'Network',
      value: 0,
      unit: 'Mbps',
      icon: Wifi,
      color: '#10B981',
      status: 'good'
    },
    {
      label: 'API Health',
      value: 0,
      unit: 'ms',
      icon: Activity,
      color: '#F59E0B',
      status: 'good'
    },
    {
      label: 'Database',
      value: 0,
      unit: 'Q/s',
      icon: Database,
      color: '#EF4444',
      status: 'good'
    },
    {
      label: 'CDN Status',
      value: 0,
      unit: '%',
      icon: Globe2,
      color: '#06B6D4',
      status: 'good'
    }
  ])
  
  const [systemHealth, setSystemHealth] = useState(100)
  const [alerts, setAlerts] = useState<string[]>([])
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time metric updates
      setMetrics(prev => prev.map(metric => {
        let newValue = metric.value
        
        switch(metric.label) {
          case 'CPU Usage':
            newValue = 20 + Math.random() * 60
            break
          case 'Memory':
            newValue = 2.5 + Math.random() * 5.5
            break
          case 'Network':
            newValue = 50 + Math.random() * 450
            break
          case 'API Health':
            newValue = 10 + Math.random() * 90
            break
          case 'Database':
            newValue = 100 + Math.random() * 900
            break
          case 'CDN Status':
            newValue = 95 + Math.random() * 5
            break
        }
        
        let status: 'good' | 'warning' | 'critical' = 'good'
        if (metric.label === 'CPU Usage' && newValue > 70) status = 'warning'
        if (metric.label === 'CPU Usage' && newValue > 85) status = 'critical'
        if (metric.label === 'API Health' && newValue > 50) status = 'warning'
        if (metric.label === 'API Health' && newValue > 100) status = 'critical'
        
        return { ...metric, value: newValue, status }
      }))
      
      // Update system health
      const avgStatus = metrics.reduce((acc, m) => {
        if (m.status === 'good') return acc + 1
        if (m.status === 'warning') return acc + 0.5
        return acc
      }, 0)
      setSystemHealth((avgStatus / metrics.length) * 100)
      
      // Random alerts
      if (Math.random() > 0.9) {
        const alertMessages = [
          'New deployment successful',
          'Cache cleared automatically',
          'Security scan completed',
          'Database backup created',
          'SSL certificates renewed'
        ]
        setAlerts(prev => [
          ...prev.slice(-2),
          alertMessages[Math.floor(Math.random() * alertMessages.length)]
        ])
      }
    }, 2000)
    
    return () => clearInterval(interval)
  }, [metrics.length])
  
  const getStatusColor = (status: 'good' | 'warning' | 'critical') => {
    switch(status) {
      case 'good': return 'text-green-500'
      case 'warning': return 'text-yellow-500'
      case 'critical': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }
  
  return (
    <Card className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-500" />
            Ultimate Control Center
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">System Health</span>
              <span className={`text-lg font-bold ${
                systemHealth > 80 ? 'text-green-500' : 
                systemHealth > 60 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {systemHealth.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Main Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-background/40 rounded-lg p-4 border border-border/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: metric.color }} />
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    metric.status === 'good' ? 'bg-green-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">
                      {metric.value.toFixed(metric.unit === '%' || metric.unit === 'GB' ? 1 : 0)}
                    </span>
                    <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  </div>
                  
                  <Progress 
                    value={
                      metric.label === 'CPU Usage' ? metric.value :
                      metric.label === 'Memory' ? (metric.value / 8) * 100 :
                      metric.label === 'CDN Status' ? metric.value :
                      50
                    } 
                    className="h-1"
                    style={{
                      '--progress-background': metric.color + '20',
                      '--progress-foreground': metric.color
                    } as any}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Live Activity Stream */}
        <div className="bg-background/40 rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" />
              Live Activity Stream
            </h4>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-3 bg-green-500 rounded-full"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scaleY: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
            {alerts.map((alert, i) => (
              <motion.div
                key={`${alert}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-muted-foreground flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-green-500 rounded-full" />
                <span>{alert}</span>
                <span className="text-[10px] opacity-50">
                  {new Date().toLocaleTimeString()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Security Status */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'Firewall', status: 'active' },
            { label: 'SSL', status: 'valid' },
            { label: 'DDoS', status: 'protected' },
            { label: 'Backup', status: 'recent' }
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-background/40 rounded-lg p-2 border border-border/50"
            >
              <div className="text-xs text-muted-foreground">{item.label}</div>
              <div className="text-xs font-medium text-green-500">{item.status}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
}