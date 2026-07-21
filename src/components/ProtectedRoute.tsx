"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/services/api"

interface Props {
  children: React.ReactNode
  allowedRoles?: string[]
}

export default function ProtectedRoute({
  children,
  allowedRoles = []
}: Props) {

  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const res = await api.get("/auth/me")
        const user = res.data

        if (!user) {
          router.push("/login")
          return
        }

        if (
          allowedRoles.length > 0 &&
          !allowedRoles.includes(user.role)
        ) {
          router.push("/unauthorized")
          return
        }

      } catch (err) {
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

  }, [])

  if (loading) return <p>Loading...</p>

  return children
}