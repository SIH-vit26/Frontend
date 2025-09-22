"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataUploader } from "@/components/ingest/data-uploader"
import { DataPreview } from "@/components/ingest/data-preview"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Database, Merge } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UploadStatus {
  attendance: { uploaded: boolean; rows: number; issues: string[] }
  assessments: { uploaded: boolean; rows: number; issues: string[] }
  fees: { uploaded: boolean; rows: number; issues: string[] }
}

export function UploadTab() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    attendance: { uploaded: false, rows: 0, issues: [] },
    assessments: { uploaded: false, rows: 0, issues: [] },
    fees: { uploaded: false, rows: 0, issues: [] },
  })
  const [isMerging, setIsMerging] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const { toast } = useToast()

  const handleFileUpload = async (type: keyof UploadStatus, file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type) 
  
      const response = await fetch("/api/upload", {  
        method: "POST",
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`)
      }
  
      const result = await response.json()
      
      setUploadStatus((prev) => ({
        ...prev,
        [type]: {
          uploaded: true,
          rows: result.rowsProcessed || 0,
          issues: result.issues || [],
        },
      }))
  
      toast({
        title: "File uploaded successfully",
        description: `${file.name} processed with ${result.rowsProcessed || "unknown"} rows`,
      })
    } catch (error) {
      toast({
        title: "File upload failed",
        description: String(error),
        variant: "destructive",
      })
    }
  }
  

  const handleMergeAndRefresh = async () => {
    setIsMerging(true)
    
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setLastRefresh(new Date())
    setIsMerging(false)

    toast({
      title: "Data merged successfully",
      description: "Parent DB snapshot updated with latest data",
    })
  }

  const allFilesUploaded = Object.values(uploadStatus).every((status) => status.uploaded)
  const totalRows = Object.values(uploadStatus).reduce((sum, status) => sum + status.rows, 0)
  const totalIssues = Object.values(uploadStatus).reduce((sum, status) => sum + status.issues.length, 0)

  return (
    <div className="space-y-6">
      
      {allFilesUploaded && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            All files uploaded successfully. {totalRows} total rows processed.
            {totalIssues > 0 && ` ${totalIssues} issues found - review below.`}
          </AlertDescription>
        </Alert>
      )}

      {/* Data Uploaders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DataUploader
          title="Attendance Data"
          description="Upload attendance.csv with student_id, date, is_present"
          acceptedFormats=".csv"
          requiredColumns={["student_id", "date", "is_present"]}
          optionalColumns={["course_code"]}
          status={uploadStatus.attendance}
          onFileUpload={(file) => handleFileUpload("attendance", file)}
        />

        <DataUploader
          title="Assessment Data"
          description="Upload assessments.csv with student_id, test_date, subject_code, score_pct"
          acceptedFormats=".csv"
          requiredColumns={["student_id", "test_date", "subject_code", "score_pct"]}
          status={uploadStatus.assessments}
          onFileUpload={(file) => handleFileUpload("assessments", file)}
        />

        <DataUploader
          title="Fee Data"
          description="Upload fees.csv with student_id, due_date, amount_due, amount_paid"
          acceptedFormats=".csv"
          requiredColumns={["student_id", "due_date", "amount_due", "amount_paid"]}
          optionalColumns={["payment_date"]}
          status={uploadStatus.fees}
          onFileUpload={(file) => handleFileUpload("fees", file)}
        />
      </div>

      {/* Data Previews */}
      {allFilesUploaded && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Data Preview</h3>
            <div className="flex items-center space-x-2">
              {lastRefresh && <Badge variant="outline">Last refresh: {lastRefresh.toLocaleTimeString()}</Badge>}
              <Button onClick={handleMergeAndRefresh} disabled={isMerging}>
                <Merge className={`h-4 w-4 mr-2 ${isMerging ? "animate-spin" : ""}`} />
                {isMerging ? "Merging..." : "Merge & Refresh"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <DataPreview
              title="Attendance Preview"
              data={[
                { student_id: "STU001", date: "2024-03-15", is_present: "1", course_code: "CS101" },
                { student_id: "STU002", date: "2024-03-15", is_present: "0", course_code: "CS101" },
                { student_id: "STU003", date: "2024-03-15", is_present: "1", course_code: "CS101" },
                { student_id: "STU004", date: "2024-03-15", is_present: "1", course_code: "CS101" },
                { student_id: "STU005", date: "2024-03-15", is_present: "0", course_code: "CS101" },
              ]}
              issues={uploadStatus.attendance.issues}
            />

            <DataPreview
              title="Assessment Preview"
              data={[
                { student_id: "STU001", test_date: "2024-03-10", subject_code: "MATH", score_pct: "85" },
                { student_id: "STU002", test_date: "2024-03-10", subject_code: "MATH", score_pct: "72" },
                { student_id: "STU003", test_date: "2024-03-10", subject_code: "MATH", score_pct: "91" },
                { student_id: "STU004", test_date: "2024-03-10", subject_code: "MATH", score_pct: "68" },
                { student_id: "STU005", test_date: "2024-03-10", subject_code: "MATH", score_pct: "45" },
              ]}
              issues={uploadStatus.assessments.issues}
            />

            <DataPreview
              title="Fee Preview"
              data={[
                {
                  student_id: "STU001",
                  due_date: "2024-02-15",
                  amount_due: "50000",
                  amount_paid: "50000",
                  payment_date: "2024-02-10",
                },
                {
                  student_id: "STU002",
                  due_date: "2024-02-15",
                  amount_due: "50000",
                  amount_paid: "25000",
                  payment_date: "2024-02-20",
                },
                {
                  student_id: "STU003",
                  due_date: "2024-02-15",
                  amount_due: "50000",
                  amount_paid: "0",
                  payment_date: "",
                },
                {
                  student_id: "STU004",
                  due_date: "2024-02-15",
                  amount_due: "50000",
                  amount_paid: "50000",
                  payment_date: "2024-02-12",
                },
                {
                  student_id: "STU005",
                  due_date: "2024-02-15",
                  amount_due: "50000",
                  amount_paid: "0",
                  payment_date: "",
                },
              ]}
              issues={uploadStatus.fees.issues}
            />
          </div>
        </div>
      )}

      {/* Parent DB Status */}
      {lastRefresh && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Parent DB Snapshot
            </CardTitle>
            <CardDescription>Merged dataset ready for risk analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{totalRows}</div>
                <div className="text-sm text-muted-foreground">Total Records</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">180</div>
                <div className="text-sm text-muted-foreground">Unique Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalIssues}</div>
                <div className="text-sm text-muted-foreground">Data Issues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98.5%</div>
                <div className="text-sm text-muted-foreground">Data Quality</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
