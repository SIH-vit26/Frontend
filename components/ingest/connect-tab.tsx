"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, CheckCircle, AlertCircle, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Connection {
  id: string
  name: string
  type: "google_sheets" | "excel_online"
  url: string
  status: "connected" | "error" | "pending"
  lastSync?: Date
}

export function ConnectTab() {
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "1",
      name: "Attendance Tracker",
      type: "google_sheets",
      url: "https://docs.google.com/spreadsheets/d/1abc123/edit",
      status: "connected",
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: "2",
      name: "Assessment Results",
      type: "google_sheets",
      url: "https://docs.google.com/spreadsheets/d/2def456/edit",
      status: "error",
    },
  ])
  const [newConnectionUrl, setNewConnectionUrl] = useState("")
  const [newConnectionName, setNewConnectionName] = useState("")
  const { toast } = useToast()

  const handleAddConnection = () => {
    if (!newConnectionUrl || !newConnectionName) return

    const newConnection: Connection = {
      id: Date.now().toString(),
      name: newConnectionName,
      type: "google_sheets",
      url: newConnectionUrl,
      status: "pending",
    }

    setConnections([...connections, newConnection])
    setNewConnectionUrl("")
    setNewConnectionName("")

    // Simulate connection test
    setTimeout(() => {
      setConnections((prev) =>
        prev.map((conn) =>
          conn.id === newConnection.id
            ? { ...conn, status: Math.random() > 0.3 ? "connected" : "error", lastSync: new Date() }
            : conn,
        ),
      )
    }, 2000)

    toast({
      title: "Connection added",
      description: "Testing connection to Google Sheets...",
    })
  }

  const handleRemoveConnection = (id: string) => {
    setConnections(connections.filter((conn) => conn.id !== id))
    toast({
      title: "Connection removed",
      description: "The connection has been deleted",
    })
  }

  const handleTestConnection = (id: string) => {
    setConnections((prev) => prev.map((conn) => (conn.id === id ? { ...conn, status: "pending" } : conn)))

    setTimeout(() => {
      setConnections((prev) =>
        prev.map((conn) =>
          conn.id === id
            ? { ...conn, status: Math.random() > 0.2 ? "connected" : "error", lastSync: new Date() }
            : conn,
        ),
      )
    }, 1500)
  }

  const getStatusBadge = (status: Connection["status"]) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "pending":
        return <Badge variant="outline">Testing...</Badge>
    }
  }

  const getStatusIcon = (status: Connection["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    }
  }

  return (
    <div className="space-y-6">
      <Alert>
        <ExternalLink className="h-4 w-4" />
        <AlertDescription>
          Connect to Google Sheets or Excel Online to automatically sync data. Make sure your sheets have the required
          column headers and are publicly accessible or shared with the service account.
        </AlertDescription>
      </Alert>

      {/* Add New Connection */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Connection</CardTitle>
          <CardDescription>Connect to Google Sheets or Excel Online for automatic data sync</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="connection-name">Connection Name</Label>
              <Input
                id="connection-name"
                placeholder="e.g., Attendance Tracker"
                value={newConnectionName}
                onChange={(e) => setNewConnectionName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sheet-url">Google Sheets URL</Label>
              <Input
                id="sheet-url"
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={newConnectionUrl}
                onChange={(e) => setNewConnectionUrl(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleAddConnection} disabled={!newConnectionUrl || !newConnectionName}>
            Add Connection
          </Button>
        </CardContent>
      </Card>

      {/* Existing Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Sources</CardTitle>
          <CardDescription>Manage your existing data connections</CardDescription>
        </CardHeader>
        <CardContent>
          {connections.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ExternalLink className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No connections configured</p>
              <p className="text-sm">Add a Google Sheets connection to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {connections.map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(connection.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{connection.name}</h4>
                        {getStatusBadge(connection.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{connection.url}</p>
                      {connection.lastSync && (
                        <p className="text-xs text-muted-foreground">
                          Last sync: {connection.lastSync.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestConnection(connection.id)}
                      disabled={connection.status === "pending"}
                    >
                      Test
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.open(connection.url, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveConnection(connection.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Connection Help */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
          <CardDescription>How to prepare your Google Sheets for connection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">1. Prepare Your Sheet</h4>
              <p className="text-sm text-muted-foreground">
                Ensure your Google Sheet has the required column headers in the first row
              </p>
            </div>
            <div>
              <h4 className="font-medium">2. Share Your Sheet</h4>
              <p className="text-sm text-muted-foreground">
                Make your sheet publicly viewable or share it with: eduews-service@your-project.iam.gserviceaccount.com
              </p>
            </div>
            <div>
              <h4 className="font-medium">3. Copy the URL</h4>
              <p className="text-sm text-muted-foreground">
                Copy the full Google Sheets URL from your browser and paste it above
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
