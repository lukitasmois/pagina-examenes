"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

interface Message {
  id: string
  sender: {
    id: string
    name: string
    role: "student" | "teacher"
    avatar?: string
  }
  content: string
  timestamp: string
}

interface DiscussionThreadProps {
  messages: Message[]
  studentId: string
  onSendMessage: (content: string) => void
}

export function DiscussionThread({ messages, studentId, onSendMessage }: DiscussionThreadProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!newMessage.trim()) return

    setIsSending(true)
    await onSendMessage(newMessage)
    setNewMessage("")
    setIsSending(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString()
  }

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {}
  messages.forEach((message) => {
    const date = formatDate(message.timestamp)
    if (!groupedMessages[date]) {
      groupedMessages[date] = []
    }
    groupedMessages[date].push(message)
  })

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">Discussion</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date} className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{date}</div>
              </div>

              {dateMessages.map((message) => {
                const isStudent = message.sender.id === studentId
                return (
                  <div
                    key={message.id}
                    className={`flex ${isStudent ? "justify-end" : "justify-start"} gap-3 max-w-full`}
                  >
                    {!isStudent && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {message.sender.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        isStudent
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs font-medium ${isStudent ? "text-blue-100" : "text-gray-600"}`}>
                          {message.sender.name}
                        </span>
                        <span className={`text-xs ${isStudent ? "text-blue-100" : "text-gray-500"}`}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    </div>

                    {isStudent && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {message.sender.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-3 bg-gray-50">
          <div className="flex space-x-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message or question..."
              className="min-h-[60px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              disabled={isSending}
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim() || isSending}
              className="bg-blue-600 hover:bg-blue-700 text-white self-end"
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
