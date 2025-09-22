"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Send, Mail, Calendar, BookOpen, Users, Clock, CheckCircle, AlertCircle, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

interface StudyPlan {
  id: string
  studentEmail: string
  parentEmail: string
  subject: string
  message: string
  status: "sent" | "pending" | "failed"
  timestamp: Date
}

export default function StudyPlannerPage() {
  const [parentEmail, setParentEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([
    {
      id: "1",
      studentEmail: "student1@school.edu",
      parentEmail: "parent1@gmail.com",
      subject: "Math Study Plan - Week 1",
      message:
        "Your child needs to focus on algebra concepts this week. Please ensure they complete the assigned worksheets.",
      status: "sent",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      studentEmail: "student2@school.edu",
      parentEmail: "parent2@gmail.com",
      subject: "Science Project Reminder",
      message:
        "The science project is due next Friday. Please help your child gather materials for the volcano experiment.",
      status: "sent",
      timestamp: new Date(Date.now() - 172800000),
    },
  ])

  const { toast } = useToast()

  const handleSendPlan = async () => {
  if (!parentEmail || !subject || !message) {
    toast({
      title: "Missing Information",
      description: "Please fill in all fields before sending.",
      variant: "destructive",
    })
    return
  }

  setIsLoading(true)

  try {
    const res = await fetch("http://127.0.0.1:8000/studyplan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comments: message,
        email: parentEmail,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      const newPlan: StudyPlan = {
        id: Date.now().toString(),
        studentEmail: "current-student@school.edu",
        parentEmail,
        subject,
        message,
        status: "sent",
        timestamp: new Date(),
      }

      setStudyPlans((prev) => [newPlan, ...prev])

      setParentEmail("")
      setSubject("")
      setMessage("")

      toast({
        title: "Study Plan Sent!",
        description: `Successfully sent study plan to ${parentEmail}`,
      })
    } else {
      toast({
        title: "Error",
        description: data.error || "Failed to send study plan",
        variant: "destructive",
      })
    }
  } catch (err) {
    toast({
      title: "Network Error",
      description: "Could not reach the backend",
      variant: "destructive",
    })
  } finally {
    setIsLoading(false)
  }
}


  const getStatusIcon = (status: StudyPlan["status"]) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status: StudyPlan["status"]) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/10">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="text-primary hover:text-primary/80"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                EduEWS
              </Button>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-2xl font-bold text-foreground">Study Planner</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Send Study Plan Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-12" />
                  Send Study Plan to Parent
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="parentEmail" className="text-sm font-medium text-foreground">
                    Parent's Gmail Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="parentEmail"
                      type="email"
                      placeholder="parent@gmail.com"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="subject"
                      placeholder="Study Plan - Week 1"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-foreground">
                    Study Plan Details
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Enter detailed study plan, assignments, and recommendations for the parent..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleSendPlan}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Study Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Study Plan History */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-5 h-5" />
                  Recent Study Plans
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {studyPlans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow bg-card"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">{plan.subject}</h4>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(plan.status)}
                          <Badge className={getStatusColor(plan.status)}>{plan.status}</Badge>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Mail className="w-3 h-3" />
                          To: {plan.parentEmail}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {plan.timestamp.toLocaleDateString()} at {plan.timestamp.toLocaleTimeString()}
                        </div>
                      </div>

                      <p className="text-sm text-foreground/80 line-clamp-2">{plan.message}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{studyPlans.length}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Total Plans Sent</div>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {studyPlans.filter((p) => p.status === "sent").length}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">Successfully Delivered</div>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800">
              <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">98%</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Delivery Success Rate</div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
