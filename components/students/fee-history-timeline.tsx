"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, CheckCircle, AlertTriangle, Clock } from "lucide-react"

interface FeeHistoryTimelineProps {
  studentId: string
}

export function FeeHistoryTimeline({ studentId }: FeeHistoryTimelineProps) {
  // Mock fee history data
  const feeHistory = [
    {
      id: "1",
      semester: "Semester 1",
      dueDate: "2024-01-15",
      amount: 50000,
      paidAmount: 50000,
      paidDate: "2024-01-10",
      status: "paid",
      daysOverdue: 0,
    },
    {
      id: "2",
      semester: "Semester 2",
      dueDate: "2024-02-15",
      amount: 50000,
      paidAmount: 25000,
      paidDate: "2024-02-20",
      status: "partial",
      daysOverdue: 5,
    },
    {
      id: "3",
      semester: "Semester 3",
      dueDate: "2024-03-15",
      amount: 50000,
      paidAmount: 0,
      paidDate: null,
      status: "overdue",
      daysOverdue: 45,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "partial":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
      case "partial":
        return <Badge variant="outline">Partial</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalDue = feeHistory.reduce((sum, fee) => sum + fee.amount, 0)
  const totalPaid = feeHistory.reduce((sum, fee) => sum + fee.paidAmount, 0)
  const totalOverdue = feeHistory.filter((fee) => fee.status === "overdue").reduce((sum, fee) => sum + fee.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Fee History
        </CardTitle>
        <CardDescription>
          Payment timeline with overdue markers
          <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
            <div>
              <span className="text-muted-foreground">Total Due:</span>
              <div className="font-medium">₹{totalDue.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total Paid:</span>
              <div className="font-medium">₹{totalPaid.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Overdue:</span>
              <div className="font-medium text-red-600">₹{totalOverdue.toLocaleString()}</div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feeHistory.map((fee, index) => (
            <div key={fee.id} className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                {getStatusIcon(fee.status)}
                {index < feeHistory.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{fee.semester}</h4>
                  {getStatusBadge(fee.status)}
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Due: {new Date(fee.dueDate).toLocaleDateString()}</div>
                  <div>
                    Amount: ₹{fee.paidAmount.toLocaleString()} / ₹{fee.amount.toLocaleString()}
                  </div>
                  {fee.paidDate && <div>Paid: {new Date(fee.paidDate).toLocaleDateString()}</div>}
                  {fee.daysOverdue > 0 && (
                    <div className="text-red-600 font-medium">{fee.daysOverdue} days overdue</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
