import { redirect } from "next/navigation"

export default function Home() {
  // later you can check auth token here
  // const isLoggedIn = ...

  const isLoggedIn = false

  if (!isLoggedIn) {
    redirect("/login")
  }

  redirect("/platform")
}