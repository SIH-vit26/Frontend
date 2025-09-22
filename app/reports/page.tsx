"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BarChart3,
  Download,
  CalendarIcon,
  FileText,
  TrendingUp,
  Users,
  AlertTriangle,
  DollarSign,
  Clock,
  Eye,
} from "lucide-react"
import { format } from "date-fns"

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })

  const reportTypes = [
    {
      id: "risk-summary",
      name: "Risk Summary Report",
      description: "Comprehensive overview of student risk levels and trends",
      icon: AlertTriangle,
      lastGenerated: "2024-01-15",
      frequency: "Weekly",
      recipients: 5,
    },
    {
      id: "attendance-report",
      name: "Attendance Analysis",
      description: "Detailed attendance patterns and insights",
      icon: Users,
      lastGenerated: "2024-01-14",
      frequency: "Daily",
      recipients: 8,
    },
    {
      id: "performance-report",
      name: "Academic Performance",
      description: "Student performance trends and analysis",
      icon: TrendingUp,
      lastGenerated: "2024-01-13",
      frequency: "Monthly",
      recipients: 3,
    },
    {
      id: "fee-report",
      name: "Fee Collection Report",
      description: "Fee payment status and outstanding amounts",
      icon: DollarSign,
      lastGenerated: "2024-01-12",
      frequency: "Monthly",
      recipients: 2,
    },
    {
      id: "compliance-report",
      name: "DPDP Compliance Report",
      description: "Data protection and privacy compliance status",
      icon: FileText,
      lastGenerated: "2024-01-10",
      frequency: "Quarterly",
      recipients: 1,
    },
  ]

  const recentReports = [
    {
      id: 1,
      name: "Weekly Risk Summary - Week 3",
      type: "Risk Summary",
      generatedAt: "2024-01-15 09:00",
      status: "completed",
      size: "2.4 MB",
      downloads: 12,
    },
    {
      id: 2,
      name: "Daily Attendance Report - Jan 14",
      type: "Attendance",
      generatedAt: "2024-01-14 08:30",
      status: "completed",
      size: "1.8 MB",
      downloads: 8,
    },
    {
      id: 3,
      name: "Monthly Performance Analysis - Dec 2023",
      type: "Performance",
      generatedAt: "2024-01-01 10:00",
      status: "completed",
      size: "5.2 MB",
      downloads: 15,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate, schedule, and manage comprehensive reports and analytics"
        action={
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Downloads</p>
                    <p className="text-2xl font-bold">1.2K</p>
                  </div>
                  <Download className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Latest generated reports and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.type} • Generated {report.generatedAt} • {report.size}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      <span className="text-sm text-muted-foreground">{report.downloads} downloads</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportTypes.map((reportType) => {
              const Icon = reportType.icon
              return (
                <Card key={reportType.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-lg">{reportType.name}</CardTitle>
                          <CardDescription>{reportType.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span>{reportType.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Recipients:</span>
                      <span>{reportType.recipients} users</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Generated:</span>
                      <span>{reportType.lastGenerated}</span>
                    </div>
                    <div className="flex items-center space-x-2 pt-2 border-t">
                      <Button size="sm" className="flex-1">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Generate Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input placeholder="Search reports..." className="flex-1" />
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="risk">Risk Reports</SelectItem>
                <SelectItem value="attendance">Attendance Reports</SelectItem>
                <SelectItem value="performance">Performance Reports</SelectItem>
                <SelectItem value="compliance">Compliance Reports</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                    : "Select dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => range && setDateRange(range as { from: Date; to: Date })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Reports History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>Complete history of all generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Generated on {report.generatedAt} • {report.size}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      <span className="text-sm text-muted-foreground">{report.downloads} downloads</span>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
