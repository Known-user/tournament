"use client"

import { useEffect, useState } from "react"
import type { Tournament } from "./types/tournament"
import { fetchTournaments, searchTournaments } from "./utils/api"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trophy, Calendar, DollarSign, Users, Search, X } from "lucide-react"

export default function Home() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [filter, setFilter] = useState<"Upcoming" | "Completed">("Upcoming")
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setIsLoading(true)
        const data = await fetchTournaments()
        setTournaments(data)
      } catch (error) {
        console.error("Error fetching tournaments:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadTournaments()
  }, [])

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        setIsLoading(true)
        const data = await searchTournaments(searchQuery)
        setTournaments(data)
      } catch (error) {
        console.error("Error searching tournaments:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleResetSearch = async () => {
    setSearchQuery("")
    try {
      setIsLoading(true)
      const data = await fetchTournaments()
      setTournaments(data)
    } catch (error) {
      console.error("Error resetting search:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTournaments = tournaments.filter((t) => t.status === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 py-12">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Tournament Dashboard</h1>
        <div className="flex justify-center space-x-4 mb-8">
          <button 
            onClick={() => setFilter("Upcoming")} 
            className={`px-4 py-2 rounded-md text-white ${filter === "Upcoming" ? "bg-blue-600" : "bg-gray-500"}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setFilter("Completed")} 
            className={`px-4 py-2 rounded-md text-white ${filter === "Completed" ? "bg-blue-600" : "bg-gray-500"}`}
          >
            Completed
          </button>
        </div>
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-full max-w-md bg-white p-2 rounded-md shadow-md">
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 outline-none"
            />
            {searchQuery && (
              <button onClick={handleResetSearch} className="p-2 text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            )}
            <button onClick={handleSearch} className="p-2 bg-blue-600 text-white rounded-md">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="text-center mb-8">
          <Link href="/create-tournament">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Create New Tournament</button>
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map((tournament) => (
                <div key={tournament.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-white mb-2">{tournament.title}</h2>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                      <p>{tournament.gameName}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                      <p>{new Date(tournament.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                      <p>Prize Pool: ${tournament.prizePool}</p>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-red-400" />
                      <p>Status: {tournament.status}</p>
                    </div>
                    <Link href={`/tournaments/${tournament.id}`}>
                      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md">View Details</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-white">
                No results found
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}