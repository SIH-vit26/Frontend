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
  Filter,
  Search,
  RefreshCw,
  Settings,
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
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200"
      case "processing":
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200"
      case "failed":
        return "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200"
      default:
        return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="space-y-8">
        <PageHeader
          title="Reports & Analytics"
          description="Generate comprehensive reports, track analytics, and manage automated reporting schedules"
        >
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </PageHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Report Templates
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Report History
              </TabsTrigger>
            </TabsList>
          </div>

        <TabsContent value="overview" className="space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Reports</p>
                    <p className="text-3xl font-bold text-slate-800">156</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">+12 this month</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">This Month</p>
                    <p className="text-3xl font-bold text-slate-800">23</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">+15% from last month</p>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <TrendingUp className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Scheduled</p>
                    <p className="text-3xl font-bold text-slate-800">8</p>
                    <p className="text-xs text-blue-600 font-medium mt-1">Auto-generated</p>
                  </div>
                  <div className="p-3 bg-amber-100 rounded-full">
                    <Clock className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Downloads</p>
                    <p className="text-3xl font-bold text-slate-800">1.2K</p>
                    <p className="text-xs text-purple-600 font-medium mt-1">+8% this week</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Download className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
            <CardHeader className="border-b border-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-slate-800">Recent Reports</CardTitle>
                  <CardDescription className="text-slate-600">Latest generated reports and their status</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-slate-300">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-6 border border-slate-200/50 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 hover:shadow-md">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-1">{report.name}</h4>
                      <p className="text-sm text-slate-600">
                        {report.type} • Generated {report.generatedAt} • {report.size}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getStatusColor(report.status)} font-medium`}>{report.status}</Badge>
                      <span className="text-sm text-slate-600 font-medium">{report.downloads} downloads</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-600">
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

        <TabsContent value="templates" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {reportTypes.map((reportType) => {
              const Icon = reportType.icon
              return (
                <Card key={reportType.id} className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                          <Icon className="h-7 w-7 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-slate-800 mb-1">{reportType.name}</CardTitle>
                          <CardDescription className="text-slate-600 text-sm leading-relaxed">
                            {reportType.description}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-50/80 rounded-lg p-3">
                        <span className="text-slate-500 block mb-1">Frequency</span>
                        <span className="font-semibold text-slate-800">{reportType.frequency}</span>
                      </div>
                      <div className="bg-slate-50/80 rounded-lg p-3">
                        <span className="text-slate-500 block mb-1">Recipients</span>
                        <span className="font-semibold text-slate-800">{reportType.recipients} users</span>
                      </div>
                    </div>
                    <div className="bg-slate-50/80 rounded-lg p-3">
                      <span className="text-slate-500 text-sm block mb-1">Last Generated</span>
                      <span className="font-semibold text-slate-800">{reportType.lastGenerated}</span>
                    </div>
                    <div className="flex items-center space-x-3 pt-4 border-t border-slate-200/50">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Generate Now
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-8">
          {/* Filters */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search reports by name, type, or content..." 
                    className="pl-10 bg-white/80 border-slate-300 focus:border-blue-500 focus:ring-blue-500" 
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full lg:w-48 bg-white/80 border-slate-300">
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
                    <Button variant="outline" className="w-full lg:w-auto bg-white/80 border-slate-300 hover:bg-white">
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
                <Button variant="outline" className="lg:w-auto bg-white/80 border-slate-300 hover:bg-white">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reports History */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
            <CardHeader className="border-b border-slate-200/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl text-slate-800">Report History</CardTitle>
                  <CardDescription className="text-slate-600">Complete history of all generated reports</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-slate-300">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-300">
                    <Download className="h-4 w-4 mr-2" />
                    Export All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border border-slate-200/50 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 hover:shadow-md gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-1">{report.name}</h4>
                      <p className="text-sm text-slate-600">
                        Generated on {report.generatedAt} • {report.size}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                      <Badge className={`${getStatusColor(report.status)} font-medium whitespace-nowrap`}>
                        {report.status}
                      </Badge>
                      <span className="text-sm text-slate-600 font-medium whitespace-nowrap">
                        {report.downloads} downloads
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-600">
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
    </div>
  )
}
