'use client'

import { motion } from 'framer-motion'
import { PerformanceDashboard } from '@/components/monitoring/performance-dashboard'
import { InteractiveTerminal } from '@/components/interactive/terminal'
import { DeploymentStatusMonitor } from '@/components/deployment/status-monitor'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail } from 'lucide-react'
import { Github } from 'lucide-react'
import { VisitorAnalyticsDashboard } from '@/components/analytics/visitor-dashboard'
import { InteractiveSkillNetwork } from '@/components/skills/skill-network'
import { VoiceNavigator } from '@/components/voice/voice-navigator'
import { LiveChatWidget } from '@/components/chat/live-chat'
import { ControlCenterDashboard } from '@/components/admin/control-center'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              James Ross
            </h1>
            <p className="mt-6 text-xl text-muted-foreground sm:text-2xl max-w-3xl mx-auto">
              Full Stack Developer specializing in Next.js, React, and modern web technologies. 
              Building scalable, performant applications with clean code and great user experiences.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" className="group">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:james@flyingrobots.dev">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ULTIMATE DEVELOPER EXPERIENCE SHOWCASE */}
      <section className="py-16 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Beyond the Impossible
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Real-time analytics, voice control, AI chat, interactive visualizations, and system monitoring. 
                This isn't just a portfolio—it's a glimpse into the future of web development.
              </p>
            </div>
            
            {/* Control Center - The Crown Jewel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ControlCenterDashboard />
            </motion.div>

            {/* First Row - Analytics & Skills */}
            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                data-analytics
              >
                <VisitorAnalyticsDashboard />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                data-skills
              >
                <InteractiveSkillNetwork />
              </motion.div>
            </div>

            {/* Second Row - Performance & Terminal (existing) */}
            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                data-performance
              >
                <PerformanceDashboard />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                data-terminal
              >
                <InteractiveTerminal />
              </motion.div>
            </div>

            {/* Third Row - Voice Navigation & Deployment */}
            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <VoiceNavigator />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <DeploymentStatusMonitor />
              </motion.div>
            </div>

            {/* Bottom Call-out */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="text-center space-y-4 pt-8"
            >
              <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span>5 Real-time Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span>Voice-Controlled Navigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                  <span>AI-Powered Chat</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                  <span>Interactive 3D Graphics</span>
                </div>
              </div>
              
              <p className="text-lg font-medium">
                Every feature here demonstrates real technical capabilities I'd bring to your team.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Chat Widget - Always Visible */}
      <LiveChatWidget />
    </main>
  )
}