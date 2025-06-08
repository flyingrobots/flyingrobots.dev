'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Code2, Database, Cloud, Cpu, Globe, Zap } from 'lucide-react'

interface SkillNode {
  id: string
  name: string
  level: number
  x: number
  y: number
  connections: string[]
  icon: React.ElementType
  color: string
}

export function InteractiveSkillNetwork() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  
  const skills: SkillNode[] = [
    {
      id: 'react',
      name: 'React',
      level: 95,
      x: 50,
      y: 30,
      connections: ['nextjs', 'typescript'],
      icon: Code2,
      color: '#61DAFB'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      level: 90,
      x: 30,
      y: 50,
      connections: ['react', 'nodejs'],
      icon: Globe,
      color: '#000000'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      level: 88,
      x: 70,
      y: 50,
      connections: ['react', 'nodejs'],
      icon: Code2,
      color: '#3178C6'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      level: 85,
      x: 50,
      y: 70,
      connections: ['nextjs', 'typescript', 'database'],
      icon: Cpu,
      color: '#339933'
    },
    {
      id: 'database',
      name: 'Databases',
      level: 80,
      x: 20,
      y: 80,
      connections: ['nodejs', 'cloud'],
      icon: Database,
      color: '#4479A1'
    },
    {
      id: 'cloud',
      name: 'Cloud/DevOps',
      level: 75,
      x: 80,
      y: 80,
      connections: ['database', 'nodejs'],
      icon: Cloud,
      color: '#FF9900'
    }
  ]
  
  const getSkillDescription = (skillId: string) => {
    const descriptions: Record<string, string> = {
      'react': 'Expert in React hooks, state management, and component architecture',
      'nextjs': 'Full-stack development with SSR, SSG, and API routes',
      'typescript': 'Type-safe development with advanced TypeScript patterns',
      'nodejs': 'Backend APIs, microservices, and real-time applications',
      'database': 'PostgreSQL, MongoDB, Redis, and database optimization',
      'cloud': 'AWS, Vercel, Docker, CI/CD, and infrastructure as code'
    }
    return descriptions[skillId] || ''
  }
  
  return (
    <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            Interactive Skill Network
          </h3>
          <span className="text-sm text-muted-foreground">Click to explore</span>
        </div>
        
        {/* Skill Network Visualization */}
        <div ref={canvasRef} className="relative h-80 bg-background/20 rounded-lg overflow-hidden">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {skills.map(skill => 
              skill.connections.map(targetId => {
                const target = skills.find(s => s.id === targetId)
                if (!target) return null
                
                return (
                  <motion.line
                    key={`${skill.id}-${targetId}`}
                    x1={`${skill.x}%`}
                    y1={`${skill.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={hoveredSkill === skill.id || hoveredSkill === targetId ? skill.color : '#666'}
                    strokeWidth={hoveredSkill === skill.id || hoveredSkill === targetId ? 3 : 1}
                    opacity={hoveredSkill && hoveredSkill !== skill.id && hoveredSkill !== targetId ? 0.2 : 0.5}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                )
              })
            )}
          </svg>
          
          {/* Skill Nodes */}
          {skills.map((skill, i) => {
            const Icon = skill.icon
            const isSelected = selectedSkill === skill.id
            const isHovered = hoveredSkill === skill.id
            
            return (
              <motion.div
                key={skill.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isHovered ? 20 : 10
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? 1.2 : 1, 
                  opacity: 1 
                }}
                transition={{ 
                  delay: i * 0.1,
                  scale: { duration: 0.2 }
                }}
                onClick={() => setSelectedSkill(skill.id)}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div
                  className={`relative rounded-full p-4 transition-all ${
                    isSelected ? 'ring-4 ring-offset-2 ring-offset-background' : ''
                  }`}
                  style={{ 
                    backgroundColor: skill.color + '20',
                    borderColor: skill.color,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    boxShadow: isHovered ? `0 0 20px ${skill.color}50` : 'none'
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: skill.color }} />
                  
                  {/* Skill Level Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke={skill.color}
                      strokeWidth="2"
                      strokeDasharray={`${skill.level * 2.83} 283`}
                      opacity="0.5"
                    />
                  </svg>
                </div>
                
                {/* Skill Label */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <div className="text-xs text-muted-foreground text-center">{skill.level}%</div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Skill Details */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background/50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">
                {skills.find(s => s.id === selectedSkill)?.name}
              </h4>
              <span className="text-sm font-medium" style={{ 
                color: skills.find(s => s.id === selectedSkill)?.color 
              }}>
                {skills.find(s => s.id === selectedSkill)?.level}% Proficiency
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {getSkillDescription(selectedSkill)}
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  )
}