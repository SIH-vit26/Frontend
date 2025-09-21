import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type RiskLevel = "green" | "amber" | "red"

interface RiskBadgeProps {
  level: RiskLevel
  score?: number
  className?: string
}

export function RiskBadge({ level, score, className }: RiskBadgeProps) {
  const variants = {
    green: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300",
    amber: "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300",
    red: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300",
  }

  const labels = {
    green: "Low Risk",
    amber: "Medium Risk",
    red: "High Risk",
  }

  return (
    <Badge variant="secondary" className={cn(variants[level], className)}>
      {labels[level]} {score && `(${score})`}
    </Badge>
  )
}
