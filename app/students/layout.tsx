"use client"

import type { ReactNode } from "react"
import { StudentStoreProvider } from "@/lib/providers/student-provider"

export default function StudentsLayout({ children }: { children: ReactNode }) {
  return <StudentStoreProvider>{children}</StudentStoreProvider>
}
