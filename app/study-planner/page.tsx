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

    if (!parentEmail.includes("@gmail.com")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid Gmail address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
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

      // Reset form
      setParentEmail("")
      setSubject("")
      setMessage("")
      setIsLoading(false)

      toast({
        title: "Study Plan Sent!",
        description: `Successfully sent study plan to ${parentEmail}`,
      })
    }, 2000)
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
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="text-indigo-600 hover:text-indigo-700"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                EduEWS
              </Button>
              <div className="h-6 w-px bg-indigo-200"></div>
              <h1 className="text-2xl font-bold text-gray-900">Study Planner</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Send Study Plan Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Study Plan to Parent
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="parentEmail" className="text-sm font-medium text-gray-700">
                    Parent's Gmail Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
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
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject
                  </Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
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
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
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
                  className="w-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
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
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{plan.subject}</h4>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(plan.status)}
                          <Badge className={getStatusColor(plan.status)}>{plan.status}</Badge>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Mail className="w-3 h-3" />
                          To: {plan.parentEmail}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {plan.timestamp.toLocaleDateString()} at {plan.timestamp.toLocaleTimeString()}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 line-clamp-2">{plan.message}</p>
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
            <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{studyPlans.length}</div>
              <div className="text-sm text-blue-600">Total Plans Sent</div>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {studyPlans.filter((p) => p.status === "sent").length}
              </div>
              <div className="text-sm text-green-600">Successfully Delivered</div>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-purple-600">Delivery Success Rate</div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
