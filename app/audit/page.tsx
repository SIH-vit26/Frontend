"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Eye } from "lucide-react"
import { AuditOverview } from "@/components/audit/audit-overview"
import { ComplianceReport } from "@/components/audit/compliance-report"

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("all")
  const [filterUser, setFilterUser] = useState("all")

  const auditLogs = [
    {
      id: "AUD-001",
      timestamp: "2024-01-15 14:30:25",
      user: "admin@school.edu",
      action: "DATA_ACCESS",
      resource: "Student Profile - STU001",
      details: "Viewed student profile for Rahul Sharma",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome/120.0.0.0",
      status: "success",
      riskLevel: "low",
    },
    {
      id: "AUD-002",
      timestamp: "2024-01-15 14:25:12",
      user: "mentor@school.edu",
      action: "RISK_CALCULATION",
      resource: "Risk Engine",
      details: "Triggered risk calculation for Batch 2023",
      ipAddress: "192.168.1.101",
      userAgent: "Chrome/120.0.0.0",
      status: "success",
      riskLevel: "medium",
    },
    {
      id: "AUD-003",
      timestamp: "2024-01-15 14:20:45",
      user: "admin@school.edu",
      action: "DATA_EXPORT",
      resource: "Student Data",
      details: "Exported attendance data for 156 students",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome/120.0.0.0",
      status: "success",
      riskLevel: "high",
    },
    {
      id: "AUD-004",
      timestamp: "2024-01-15 14:15:33",
      user: "system",
      action: "NOTIFICATION_SENT",
      resource: "Notification System",
      details: "Sent high risk alert to 45 recipients",
      ipAddress: "system",
      userAgent: "System Process",
      status: "success",
      riskLevel: "low",
    },
    {
      id: "AUD-005",
      timestamp: "2024-01-15 14:10:18",
      user: "mentor@school.edu",
      action: "LOGIN_FAILED",
      resource: "Authentication System",
      details: "Failed login attempt - incorrect password",
      ipAddress: "192.168.1.102",
      userAgent: "Chrome/120.0.0.0",
      status: "failed",
      riskLevel: "medium",
    },
  ]

  const getActionColor = (action: string) => {
    switch (action) {
      case "DATA_ACCESS":
        return "bg-blue-100 text-blue-800"
      case "DATA_EXPORT":
        return "bg-purple-100 text-purple-800"
      case "RISK_CALCULATION":
        return "bg-orange-100 text-orange-800"
      case "NOTIFICATION_SENT":
        return "bg-green-100 text-green-800"
      case "LOGIN_FAILED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = filterAction === "all" || log.action === filterAction
    const matchesUser = filterUser === "all" || log.user === filterUser
    return matchesSearch && matchesAction && matchesUser
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit & Compliance"
        description="Monitor system activity, track data access, and ensure DPDP compliance"
        action={
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Audit Log
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AuditOverview />
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="DATA_ACCESS">Data Access</SelectItem>
                <SelectItem value="DATA_EXPORT">Data Export</SelectItem>
                <SelectItem value="RISK_CALCULATION">Risk Calculation</SelectItem>
                <SelectItem value="NOTIFICATION_SENT">Notification Sent</SelectItem>
                <SelectItem value="LOGIN_FAILED">Login Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterUser} onValueChange={setFilterUser}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="admin@school.edu">Admin</SelectItem>
                <SelectItem value="mentor@school.edu">Mentor</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>System Activity Log</CardTitle>
              <CardDescription>Complete record of all system activities and data access</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">{log.timestamp}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{log.user}</p>
                          <p className="text-xs text-muted-foreground">{log.ipAddress}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getActionColor(log.action)}>{log.action.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{log.resource}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{log.details}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskColor(log.riskLevel)}>{log.riskLevel}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceReport />
        </TabsContent>
      </Tabs>
    </div>
  )
}
