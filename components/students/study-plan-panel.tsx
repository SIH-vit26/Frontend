"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle, Clock, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StudyPlanPanelProps {
  studentId: string
}

interface StudyTask {
  id: string
  title: string
  subject: string
  dueDate: string
  completed: boolean
  priority: "high" | "medium" | "low"
  mentorOverride?: boolean
}

export function StudyPlanPanel({ studentId }: StudyPlanPanelProps) {
  const [tasks, setTasks] = useState<StudyTask[]>([
    {
      id: "1",
      title: "Complete Chapter 5 exercises",
      subject: "Mathematics",
      dueDate: "2024-03-18",
      completed: false,
      priority: "high",
    },
    {
      id: "2",
      title: "Review Physics lab notes",
      subject: "Physics",
      dueDate: "2024-03-19",
      completed: true,
      priority: "medium",
    },
    {
      id: "3",
      title: "Practice programming problems",
      subject: "Programming",
      dueDate: "2024-03-20",
      completed: false,
      priority: "high",
      mentorOverride: true,
    },
    {
      id: "4",
      title: "Read Chemistry chapter 8",
      subject: "Chemistry",
      dueDate: "2024-03-21",
      completed: false,
      priority: "low",
    },
  ])
  const { toast } = useToast()

  const handleTaskToggle = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))

    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      toast({
        title: task.completed ? "Task marked incomplete" : "Task completed",
        description: `"${task.title}" status updated`,
      })
    }
  }

  const handleGenerateNewPlan = () => {
    // Simulate generating new study plan
    const newTasks: StudyTask[] = [
      {
        id: Date.now().toString(),
        title: "Focus on weak areas identified in assessment",
        subject: "Mathematics",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        completed: false,
        priority: "high",
        mentorOverride: true,
      },
      {
        id: (Date.now() + 1).toString(),
        title: "Attend extra tutorial sessions",
        subject: "Physics",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        completed: false,
        priority: "medium",
      },
    ]

    setTasks([...newTasks, ...tasks.filter((t) => !t.completed)])

    toast({
      title: "Study plan updated",
      description: "New personalized tasks added based on current performance",
    })
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="outline">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Personal Study Plan
        </CardTitle>
        <CardDescription>
          Weekly tasks with mentor oversight - delivered to WhatsApp
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm">
              Progress: {completedTasks}/{totalTasks} tasks
            </span>
            <Badge variant="outline">{completionRate}% complete</Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Generate New Plan Button */}
        <Button onClick={handleGenerateNewPlan} variant="outline" size="sm" className="w-full bg-transparent">
          <RotateCcw className="h-4 w-4 mr-2" />
          Generate Updated Plan
        </Button>

        {/* Tasks List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start space-x-3 p-3 border rounded-lg ${task.completed ? "bg-muted/50" : ""}`}
            >
              <Checkbox checked={task.completed} onCheckedChange={() => handleTaskToggle(task.id)} className="mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {task.mentorOverride && (
                      <Badge variant="outline" className="text-xs">
                        Mentor
                      </Badge>
                    )}
                    {getPriorityBadge(task.priority)}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Subject: {task.subject}</div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            <p className="text-sm">No study tasks assigned</p>
          </div>
        )}

        {/* WhatsApp Integration Note */}
        <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
          <CheckCircle className="h-3 w-3 inline mr-1" />
          Tasks are automatically synced to student's WhatsApp for easy access
        </div>
      </CardContent>
    </Card>
  )
}
