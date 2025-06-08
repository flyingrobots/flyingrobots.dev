'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Terminal as TerminalIcon } from 'lucide-react'

interface TerminalLine {
  type: 'input' | 'output' | 'error'
  content: string
  timestamp: number
}

const commands = {
  help: 'Available commands: help, about, skills, projects, contact, clear, whoami, ls, cat resume.txt',
  about: 'Full-stack developer specializing in React, Next.js, and modern web technologies. I build impossible things.',
  skills: 'JavaScript/TypeScript • React/Next.js • Node.js • Python • PostgreSQL • Docker • AWS • Git',
  projects: 'universalcharter.org - AI governance framework\ngitscrolls.org - Git visualization tool\nflyingrobots.dev - This interactive portfolio',
  contact: 'Email: hello@flyingrobots.dev\nLinkedIn: /in/jamesross\nGitHub: /flyingrobots',
  whoami: 'james@flyingrobots.dev',
  ls: 'projects/  skills/  experience/  contact.txt  resume.pdf',
  'cat resume.txt': `
JAMES ROSS - Full Stack Developer
================================

Experience:
• 3+ years building web applications
• Expertise in React, Next.js, TypeScript
• Strong background in system architecture
• Passionate about user experience

Key Projects:
• Universal Charter - AI governance platform
• GitScrolls - Developer visualization tool
• Multiple client projects and consulting work

Skills:
• Frontend: React, Next.js, TypeScript, Tailwind
• Backend: Node.js, Python, PostgreSQL, Redis
• DevOps: Docker, AWS, Vercel, CI/CD
• Tools: Git, VS Code, Linear, Figma

Contact: hello@flyingrobots.dev
Portfolio: flyingrobots.dev
  `.trim(),
  clear: '__CLEAR__'
}

export function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to flyingrobots.dev terminal v2.0', timestamp: Date.now() },
    { type: 'output', content: 'Type "help" for available commands', timestamp: Date.now() + 1 }
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase()
    const newLines = [...lines]
    
    // Add input line
    newLines.push({ type: 'input', content: `$ ${input}`, timestamp: Date.now() })

    if (trimmedInput === 'clear') {
      setLines([])
      return
    }

    // Execute command
    if (commands[trimmedInput as keyof typeof commands]) {
      const output = commands[trimmedInput as keyof typeof commands]
      
      if (output === '__CLEAR__') {
        setLines([])
        return
      }

      // Simulate typing effect for longer outputs
      if (output.length > 50) {
        setIsTyping(true)
        newLines.push({ type: 'output', content: '', timestamp: Date.now() })
        setLines(newLines)

        let i = 0
        const typeInterval = setInterval(() => {
          if (i < output.length) {
            setLines(prev => {
              const updated = [...prev]
              updated[updated.length - 1].content = output.substring(0, i + 1)
              return updated
            })
            i++
          } else {
            clearInterval(typeInterval)
            setIsTyping(false)
          }
        }, 20)
      } else {
        newLines.push({ type: 'output', content: output, timestamp: Date.now() })
        setLines(newLines)
      }
    } else if (trimmedInput === '') {
      setLines(newLines)
    } else {
      newLines.push({ 
        type: 'error', 
        content: `Command not found: ${trimmedInput}. Type "help" for available commands.`, 
        timestamp: Date.now() 
      })
      setLines(newLines)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim() && !isTyping) {
      executeCommand(currentInput)
      setCurrentInput('')
    }
  }

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  return (
    <Card className="p-6 bg-black text-green-400 font-mono">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-5 h-5" />
            <span className="text-lg font-bold">Interactive Terminal</span>
          </div>
          <Badge variant="secondary" className="bg-green-900/50 text-green-400">
            Live Shell
          </Badge>
        </div>

        <div 
          ref={terminalRef}
          className="bg-black border border-green-800 rounded p-4 h-96 overflow-y-auto cursor-text"
          onClick={handleTerminalClick}
        >
          {lines.map((line, index) => (
            <div key={index} className={`
              ${line.type === 'input' ? 'text-green-300' : ''}
              ${line.type === 'error' ? 'text-red-400' : ''}
              ${line.type === 'output' ? 'text-green-400' : ''}
              whitespace-pre-wrap mb-1
            `}>
              {line.content}
            </div>
          ))}
          
          {!isTyping && (
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-green-300 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="bg-transparent border-none outline-none text-green-400 flex-1"
                placeholder="Type a command..."
                autoComplete="off"
                autoFocus
              />
              <span className="animate-pulse text-green-400">▊</span>
            </form>
          )}
        </div>

        <div className="text-xs text-green-600 border-t border-green-800 pt-4">
          💻 Try commands: help, about, skills, projects, contact, whoami, ls, cat resume.txt, clear
        </div>
      </div>
    </Card>
  )
}