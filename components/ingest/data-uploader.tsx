"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataUploaderProps {
  title: string
  description: string
  acceptedFormats: string
  requiredColumns: string[]
  optionalColumns?: string[]
  status: {
    uploaded: boolean
    rows: number
    issues: string[]
  }
  onFileUpload: (file: File) => void
}

export function DataUploader({
  title,
  description,
  acceptedFormats,
  requiredColumns,
  optionalColumns = [],
  status,
  onFileUpload,
}: DataUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      const csvFile = files.find((file) => file.name.endsWith(".csv"))

      if (csvFile) {
        setSelectedFile(csvFile)
        onFileUpload(csvFile)
      }
    },
    [onFileUpload],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setSelectedFile(file)
        onFileUpload(file)
      }
    },
    [onFileUpload],
  )

  return (
    <Card
      className={cn("transition-colors", status.uploaded && "border-green-200 bg-green-50/50 dark:bg-green-950/20")}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          {status.uploaded && <CheckCircle className="h-5 w-5 text-green-600" />}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!status.uploaded ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
              isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById(`file-${title}`)?.click()}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">Drop your CSV file here</p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
            <input
              id={`file-${title}`}
              type="file"
              accept={acceptedFormats}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">{selectedFile?.name}</span>
              </div>
              <Badge variant="outline">{status.rows} rows</Badge>
            </div>

            {status.issues.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-medium">Issues found:</p>
                    <ul className="list-disc list-inside text-sm">
                      {status.issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="text-xs text-muted-foreground">Last uploaded: {new Date().toLocaleString()}</div>
          </div>
        )}

        {/* Column Requirements */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Required Columns</h4>
          <div className="flex flex-wrap gap-1">
            {requiredColumns.map((column) => (
              <Badge key={column} variant="secondary" className="text-xs">
                {column}
              </Badge>
            ))}
          </div>
          {optionalColumns.length > 0 && (
            <>
              <h4 className="text-sm font-medium">Optional Columns</h4>
              <div className="flex flex-wrap gap-1">
                {optionalColumns.map((column) => (
                  <Badge key={column} variant="outline" className="text-xs">
                    {column}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
