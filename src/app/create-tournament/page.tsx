"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CreateTournamentForm from "../component/CreateTournamentForm"

export default function CreateTournamentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 py-12">
      <div className="container mx-auto p-4">
      <Link
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-100 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Create Tournament</h1>
        <div className="max-w-2xl mx-auto shadow-xl bg-gray-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl text-white font-semibold">Tournament Details</h2>
          </div>
          <div className="p-6">
            <CreateTournamentForm />
          </div>
        </div>
      </div>
    </div>
  )
}
