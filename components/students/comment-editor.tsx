"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CommentEditorProps {
  studentId: string
}

interface Comment {
  id: string
  author: string
  authorRole: string
  content: string
  timestamp: Date
  avatar?: string
}

export function CommentEditor({ studentId }: CommentEditorProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Dr. Sarah Johnson",
      authorRole: "Mentor",
      content:
        "Student showed improvement in last counseling session. Recommended additional study hours for mathematics.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: "2",
      author: "Admin User",
      authorRole: "Admin",
      content: "Fee payment reminder sent to parent. Follow up scheduled for next week.",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
  ])
  const { toast } = useToast()

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Current User",
      authorRole: "Admin",
      content: newComment,
      timestamp: new Date(),
    }

    setComments([comment, ...comments])
    setNewComment("")

    toast({
      title: "Comment added",
      description: "Your note has been saved to the student record",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Mentor Notes
        </CardTitle>
        <CardDescription>Add observations and track interactions with the student</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Comment */}
        <div className="space-y-3">
          <Textarea
            placeholder="Add your observations, meeting notes, or action items..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <Button onClick={handleAddComment} disabled={!newComment.trim()} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3 p-3 bg-muted/50 rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                <AvatarFallback>
                  {comment.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">({comment.authorRole})</span>
                  <span className="text-xs text-muted-foreground">
                    {comment.timestamp.toLocaleDateString()} {comment.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
