"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadTab } from "@/components/ingest/upload-tab"
import { ConnectTab } from "@/components/ingest/connect-tab"
import { ModelTab } from "@/components/ingest/model-tab"
import { Button } from "@/components/ui/button"
import { RefreshCw, Database } from "lucide-react"

export default function IngestPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Ingestion and Model"
        description="Upload data, configure connections, and run risk prediction models"
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
          <Button variant="outline" size="sm">
            <Database className="h-4 w-4 mr-2" />
            View Parent DB
          </Button>
        </div>
      </PageHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="connect">Connect</TabsTrigger>
          <TabsTrigger value="model">Model & Signals</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <UploadTab />
        </TabsContent>

        <TabsContent value="connect" className="space-y-6">
          <ConnectTab />
        </TabsContent>

        <TabsContent value="model" className="space-y-6">
          <ModelTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
