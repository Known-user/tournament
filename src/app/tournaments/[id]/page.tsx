"use client"

import type { Tournament } from "@/app/types/tournament"
import { fetchTournamentById } from "@/app/utils/api"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Calendar, DollarSign, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TournamentDetails() {
  const params = useParams()
  const { id } = params
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const loadTournament = async () => {
        try {
          setIsLoading(true)
          const data = await fetchTournamentById(Number(id))
          setTournament(data)
        } catch (error) {
          console.error("Error fetching tournament:", error)
        } finally {
          setIsLoading(false)
        }
      }
      loadTournament()
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
        <p className="text-2xl text-indigo-800 dark:text-indigo-200">Tournament not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <Link
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-100 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-6 text-indigo-800 dark:text-indigo-200">{tournament.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Trophy className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
              <p className="text-lg">{tournament.gameName}</p>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Calendar className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
              <p className="text-lg">{new Date(tournament.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <DollarSign className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
              <p className="text-lg">Prize Pool: ${tournament.prizePool}</p>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Users className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
              <p className="text-lg">Status: {tournament.status}</p>
            </div>
          </div>
          <div className="bg-indigo-50 dark:bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800 dark:text-indigo-200">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{tournament.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

