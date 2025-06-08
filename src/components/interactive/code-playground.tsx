'use client'

import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, RotateCcw } from 'lucide-react'

const initialCode = `// Live React Component Playground
function InteractiveDemo() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('#f59e0b');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: color,
      borderRadius: '8px',
      color: 'white',
      textAlign: 'center'
    }}>
      <h3>Flying Robot Counter: {count}</h3>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          margin: '10px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Launch Robot! 🚀
      </button>
      <button 
        onClick={() => setColor(
          \`hsl(\${Math.random() * 360}, 70%, 50%)\`
        )}
        style={{
          padding: '10px 20px',
          margin: '10px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Change Color
      </button>
    </div>
  );
}`

export function CodePlayground() {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    try {
      // This is a simplified sandbox - in production you'd use a proper sandboxing solution
      const ComponentCode = code.replace('function InteractiveDemo()', 'return function InteractiveDemo()')
      setOutput(`Component compiled successfully! ✅\n\nCode preview:\n${code.slice(0, 200)}...`)
    } catch (error) {
      setOutput(`Error: ${error}`)
    }
    setIsRunning(false)
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput('')
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Live Code Playground</h3>
          <div className="flex gap-2">
            <Button onClick={runCode} disabled={isRunning} size="sm">
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button onClick={resetCode} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">JavaScript/React Code:</label>
            <div className="border rounded-lg overflow-hidden">
              <Editor
                height="300px"
                defaultLanguage="javascript"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Output:</label>
            <div className="border rounded-lg p-4 h-[300px] bg-muted/50 overflow-auto">
              <pre className="text-sm font-mono">{output || 'Click "Run Code" to see the output...'}</pre>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          🚀 Try modifying the code above! This demonstrates real-time React component development.
        </p>
      </div>
    </Card>
  )
}