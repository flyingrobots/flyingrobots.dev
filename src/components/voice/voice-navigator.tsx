'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, Loader2, CheckCircle } from 'lucide-react'

export function VoiceNavigator() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [command, setCommand] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const recognitionRef = useRef<any>(null)
  
  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      
      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)
        
        if (event.results[current].isFinal) {
          processCommand(transcript)
        }
      }
      
      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])
  
  const processCommand = (text: string) => {
    setIsProcessing(true)
    setCommand(text)
    setCommandHistory(prev => [...prev.slice(-4), text])
    
    // Simulate command processing
    setTimeout(() => {
      const lowerText = text.toLowerCase()
      
      if (lowerText.includes('projects')) {
        speak('Navigating to projects page')
        // In real app, would use router.push('/projects')
      } else if (lowerText.includes('about')) {
        speak('Showing about section')
      } else if (lowerText.includes('contact')) {
        speak('Opening contact information')
      } else if (lowerText.includes('resume')) {
        speak('Displaying resume')
      } else if (lowerText.includes('dark mode')) {
        speak('Toggling dark mode')
      } else {
        speak('Command not recognized. Try saying: show projects, about me, or contact')
      }
      
      setIsProcessing(false)
      setTranscript('')
    }, 1000)
  }
  
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    }
  }
  
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in your browser')
      return
    }
    
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      setTranscript('')
    } else {
      recognitionRef.current.start()
      setIsListening(true)
      speak('Listening for your command')
    }
  }
  
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-blue-500" />
            Voice Navigation
          </h3>
          <div className="text-sm text-muted-foreground">
            Say "Show projects" or "About me"
          </div>
        </div>
        
        {/* Voice Control Button */}
        <div className="flex justify-center">
          <motion.div
            animate={isListening ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: isListening ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              className="rounded-full w-24 h-24 relative"
              onClick={toggleListening}
            >
              {isListening ? (
                <>
                  <MicOff className="w-8 h-8" />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-current"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                </>
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </Button>
          </motion.div>
        </div>
        
        {/* Transcript Display */}
        <AnimatePresence>
          {(transcript || isProcessing) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-background/50 rounded-lg p-4 space-y-2"
            >
              {transcript && (
                <div className="text-sm text-muted-foreground">
                  Hearing: "{transcript}"
                </div>
              )}
              
              {isProcessing && (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Processing command...</span>
                </div>
              )}
              
              {command && !isProcessing && (
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Command: "{command}"</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Command History */}
        {commandHistory.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Recent Commands</h4>
            <div className="space-y-1">
              {commandHistory.map((cmd, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-xs bg-background/30 rounded px-2 py-1"
                >
                  "{cmd}"
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Voice Waveform Visualization */}
        {isListening && (
          <div className="flex items-center justify-center gap-1 h-8">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-blue-500 rounded-full"
                animate={{
                  height: [8, 20 + Math.random() * 20, 8],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}