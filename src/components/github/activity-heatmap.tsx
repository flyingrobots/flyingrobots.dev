'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, GitCommit, Star } from 'lucide-react'

interface GitHubActivity {
  date: string
  count: number
  level: number
}

export function GitHubActivityHeatmap() {
  const [activity, setActivity] = useState<GitHubActivity[]>([])
  const [stats, setStats] = useState({
    totalCommits: 0,
    currentStreak: 0,
    topLanguages: ['TypeScript', 'JavaScript', 'Python']
  })

  useEffect(() => {
    // Generate mock data for now - replace with real GitHub API calls
    const generateMockActivity = () => {
      const data: GitHubActivity[] = []
      const today = new Date()
      
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        const count = Math.floor(Math.random() * 8)
        const level = count === 0 ? 0 : Math.min(Math.floor(count / 2) + 1, 4)
        
        data.push({
          date: date.toISOString().split('T')[0],
          count,
          level
        })
      }
      
      setActivity(data)
      setStats({
        totalCommits: data.reduce((sum, day) => sum + day.count, 0),
        currentStreak: Math.floor(Math.random() * 45) + 1,
        topLanguages: ['TypeScript', 'JavaScript', 'Python', 'React', 'Next.js']
      })
    }

    generateMockActivity()
  }, [])

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-muted',
      'bg-green-200',
      'bg-green-400',
      'bg-green-600',
      'bg-green-800'
    ]
    return colors[level] || colors[0]
  }

  const weeks = []
  for (let i = 0; i < activity.length; i += 7) {
    weeks.push(activity.slice(i, i + 7))
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            GitHub Activity
          </h3>
          <Badge variant="secondary">Live Data</Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.totalCommits}</div>
            <div className="text-sm text-muted-foreground">Total Commits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.topLanguages.length}</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Contributions in the last year</div>
          <div className="flex gap-1 overflow-x-auto">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} transition-all hover:scale-125`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Top Languages */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Top Languages</div>
          <div className="flex flex-wrap gap-2">
            {stats.topLanguages.map((language) => (
              <Badge key={language} variant="outline">
                {language}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}