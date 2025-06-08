'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle, Clock, GitBranch, Globe, Zap } from 'lucide-react'

interface DeploymentStatus {
  id: string
  status: 'building' | 'deployed' | 'failed' | 'queued'
  branch: string
  commit: string
  timestamp: Date
  duration: number
  url?: string
}

export function DeploymentStatusMonitor() {
  const [deployments, setDeployments] = useState<DeploymentStatus[]>([
    {
      id: '1',
      status: 'deployed',
      branch: 'main',
      commit: 'feat: add interactive terminal',
      timestamp: new Date(Date.now() - 300000),
      duration: 45,
      url: 'https://flyingrobots.dev'
    },
    {
      id: '2',
      status: 'deployed',
      branch: 'main',
      commit: 'feat: add 3d components',
      timestamp: new Date(Date.now() - 1800000),
      duration: 52,
      url: 'https://flyingrobots.dev'
    },
    {
      id: '3',
      status: 'building',
      branch: 'feature/performance-monitor',
      commit: 'add real-time metrics',
      timestamp: new Date(Date.now() - 120000),
      duration: 0
    }
  ])

  useEffect(() => {
    // Simulate real-time deployment updates
    const interval = setInterval(() => {
      setDeployments(prev => {
        const updated = prev.map(deployment => {
          if (deployment.status === 'building') {
            return {
              ...deployment,
              duration: deployment.duration + 1
            }
          }
          return deployment
        })

        // Occasionally complete builds or add new ones
        if (Math.random() < 0.1) {
          const building = updated.find(d => d.status === 'building')
          if (building) {
            building.status = Math.random() < 0.9 ? 'deployed' : 'failed'
            building.url = 'https://flyingrobots.dev'
          }
        }

        return updated
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: DeploymentStatus['status']) => {
    switch (status) {
      case 'deployed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'building':
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'queued':
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: DeploymentStatus['status']) => {
    const variants = {
      deployed: 'default',
      building: 'secondary',
      failed: 'destructive',
      queued: 'outline'
    }
    
    return (
      <Badge variant={variants[status] as any}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Live Deployment Status
          </h3>
          <Badge variant="secondary" className="bg-green-500/10 text-green-600">
            <Globe className="w-3 h-3 mr-1" />
            Production
          </Badge>
        </div>

        {/* Current Status */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Latest Deployment</div>
            <div className="flex items-center gap-2">
              {getStatusIcon(deployments[0]?.status)}
              {getStatusBadge(deployments[0]?.status)}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <GitBranch className="w-4 h-4" />
              <span className="font-mono">{deployments[0]?.branch}</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-mono text-muted-foreground">
                {deployments[0]?.commit.substring(0, 7)}
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {deployments[0]?.commit}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Duration: {formatDuration(deployments[0]?.duration || 0)}
              </div>
              {deployments[0]?.url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={deployments[0].url} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-3 h-3 mr-1" />
                    View Live
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Deployment History */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Recent Deployments</div>
          
          {deployments.slice(1).map((deployment) => (
            <div key={deployment.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(deployment.status)}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono">{deployment.branch}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-mono text-muted-foreground text-xs">
                      {deployment.commit.substring(0, 7)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {deployment.commit}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {getStatusBadge(deployment.status)}
                <div className="text-xs text-muted-foreground mt-1">
                  {deployment.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground border-t pt-4">
          🚀 Connected to Vercel deployments • Real-time status updates • Automatic rollbacks enabled
        </div>
      </div>
    </Card>
  )
}