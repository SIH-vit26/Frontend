export interface Student {
  id: string
  name: string
  program: string
  cohort: string
  mentorId?: string
  attendancePercent: number
  avgScore: number
  feeStatus: "paid" | "overdue" | "partial"
  attemptsCount: number
  backlogsCount: number
  lastActiveAt: string
  compositeRiskScore: number
  riskLevel: "green" | "amber" | "red"
  reasons: string[]
  avatar?: string
}

export interface AttendanceRecord {
  studentId: string
  date: string
  isPresent: boolean
  courseCode?: string
}

export interface AssessmentRecord {
  studentId: string
  testDate: string
  subjectCode: string
  scorePercent: number
}

export interface FeeRecord {
  studentId: string
  dueDate: string
  amountDue: number
  amountPaid: number
  paymentDate?: string
}

export interface RiskThresholds {
  attendanceMinimum: number
  marksDropTolerance: number
  feeDelayDays: number
  attendanceWeight: number
  assessmentWeight: number
  attemptsWeight: number
  feesWeight: number
}

export interface NotificationTemplate {
  id: string
  name: string
  type: "email" | "sms" | "whatsapp"
  subject?: string
  content: string
  variables: string[]
}
