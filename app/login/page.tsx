"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, Shield } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/lib/stores/auth-store"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"admin" | "mentor">("admin")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { login } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Sample credentials validation
    const validCredentials = {
      admin: { email: "admin@school.edu", password: "admin123" },
      mentor: { email: "mentor@school.edu", password: "mentor123" },
    }

    if (email === validCredentials[role].email && password === validCredentials[role].password) {
      login({
        id: role === "admin" ? "admin-1" : "mentor-1",
        email,
        name: role === "admin" ? "Admin User" : "Mentor User",
        role,
      })
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Please use the sample credentials provided.")
    }

    setIsLoading(false)
  }

  const fillSampleCredentials = (selectedRole: "admin" | "mentor") => {
    const credentials = {
      admin: { email: "admin@school.edu", password: "admin123" },
      mentor: { email: "mentor@school.edu", password: "mentor123" },
    }
    setEmail(credentials[selectedRole].email)
    setPassword(credentials[selectedRole].password)
    setRole(selectedRole)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">EduEWS</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Early Warning System for Student Success</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Choose your role and enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: "admin" | "mentor") => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Continue"}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="text-sm text-center text-gray-600 dark:text-gray-400">Sample Credentials:</div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => fillSampleCredentials("admin")} className="text-xs">
                  Use Admin Login
                </Button>
                <Button variant="outline" size="sm" onClick={() => fillSampleCredentials("mentor")} className="text-xs">
                  Use Mentor Login
                </Button>
              </div>
              <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                Admin: admin@school.edu / admin123
                <br />
                Mentor: mentor@school.edu / mentor123
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            href="/privacy"
            className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 flex items-center justify-center gap-1"
          >
            <Shield className="h-3 w-3" />
            Privacy and DPDP Notice
          </Link>
        </div>
      </div>
    </div>
  )
}
