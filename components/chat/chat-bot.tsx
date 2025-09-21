"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your EduEWS assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle scroll events within chat container
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
    }

    const chatContainer = chatContainerRef.current
    if (chatContainer) {
      chatContainer.addEventListener('wheel', handleWheel, { passive: false })
      return () => {
        chatContainer.removeEventListener('wheel', handleWheel)
      }
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response with loading state
    setTimeout(() => {
      setIsTyping(false)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1500)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! Welcome to EduEWS. I can help you with information about our early warning system, features, or navigation."
    }

    if (input.includes("feature") || input.includes("what")) {
      return "EduEWS offers AI-powered risk detection, predictive analytics, cohort management, smart notifications, privacy compliance, and comprehensive reporting. Which feature would you like to know more about?"
    }

    if (input.includes("help") || input.includes("support")) {
      return "I'm here to help! You can ask me about EduEWS features, how to navigate the platform, or general questions about student dropout prevention."
    }

    if (input.includes("risk") || input.includes("prediction")) {
      return "Our AI analyzes attendance, assessment scores, and fee payment patterns to predict dropout risk with 95% accuracy. Would you like to know more about how this works?"
    }

    if (input.includes("privacy") || input.includes("data")) {
      return "EduEWS is fully compliant with DPDP Act regulations. We implement comprehensive data governance, audit trails, and privacy controls to protect student information."
    }

    return "That's a great question! While I'm still learning, you can explore our comprehensive help section or contact our support team for detailed assistance. Is there anything specific about EduEWS I can help you with?"
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] h-[32rem] max-h-[calc(100vh-8rem)] sm:w-96"
          >
            <Card className="h-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm flex flex-col overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-t-lg flex-shrink-0 p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    EduEWS Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent 
                className="p-0 flex flex-col flex-1 overflow-hidden min-h-0 chat-container"
                ref={chatContainerRef}
                onWheel={(e) => e.stopPropagation()}
              >
                <div 
                  className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3"
                  style={{ height: 'calc(100% - 80px)' }}
                  ref={scrollAreaRef}
                  onWheel={(e) => e.stopPropagation()}
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg shadow-sm chat-message ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-sm"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-600" />}
                          {message.sender === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                            <span className={`text-xs mt-1 block ${
                              message.sender === "user" ? "text-white/70" : "text-gray-500"
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] p-3 rounded-lg shadow-sm bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-sm">
                        <div className="flex items-start gap-2">
                          <Bot className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-600" />
                          <div className="flex items-center gap-1">
                            <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                            <span className="text-sm text-gray-600">Typing...</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t bg-white rounded-b-lg flex-shrink-0" style={{ height: '80px' }}>
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask me anything..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      disabled={isTyping}
                      className="flex-1 focus:ring-2 focus:ring-indigo-500 border-gray-300"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="sm"
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
