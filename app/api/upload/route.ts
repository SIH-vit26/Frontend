import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebaseClient"
import { doc, getDoc, setDoc } from "firebase/firestore"
import Papa from "papaparse"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const type = (formData.get("type") as string)?.toLowerCase()

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const text = await file.text()
    const parsed = Papa.parse(text, { header: true, skipEmptyLines: true })
    const rows = parsed.data as Record<string, string>[]

    const issues: string[] = []

    for (const [index, row] of rows.entries()) {
      const normalized = Object.fromEntries(
        Object.entries(row).map(([k, v]) => [
          k.trim().toLowerCase().replace(/\s+/g, "_"),
          v === "" ? null : v,
        ])
      )

      if (index < 3) console.log("Row sample:", normalized)

      // Normalize ID
      const studentId = normalized["student_id"] || normalized["id"]
      if (!studentId) {
        issues.push("Missing student_id in row: " + JSON.stringify(row))
        continue
      }

      normalized["id"] = studentId.toString()
      delete normalized["student_id"]

      const studentRef = doc(db, "students", studentId.toString())
      const studentSnap = await getDoc(studentRef)

      if (!studentSnap.exists()) {
        issues.push(`Student ${studentId} not found in Firestore`)
        continue
      }

      // --- 1️⃣ Update main doc ---
      await setDoc(studentRef, normalized, { merge: true })

      // --- 2️⃣ Update subcollection doc (merge instead of add) ---
      let subPath = "uploads" // fallback
      if (type === "attendance") subPath = "attendance"
      else if (type === "marks") subPath = "marks"
      else if (type === "fees") subPath = "fees"

      // Use studentId (or a combo key) as sub-doc id so it updates instead of creating new docs
      const subDocRef = doc(db, "students", studentId.toString(), subPath, studentId.toString())

      await setDoc(
        subDocRef,
        {
          ...normalized,
          updated_at: new Date(),
        },
        { merge: true }
      )
    }

    return NextResponse.json({
      rowsProcessed: rows.length,
      issues,
    })
  } catch (err: any) {
    console.error("Upload error", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
