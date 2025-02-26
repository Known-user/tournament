"use client"

import type React from "react"
import { useState } from "react"
import { createTournament } from "../utils/api"
import type { CreateTournament } from "../types/tournament"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Calendar, DollarSign, AlignLeft, Check, Clock, CheckCircle } from "lucide-react"

export default function CreateTournamentForm() {
  const [formData, setFormData] = useState<CreateTournament>({
    title: "",
    gameName: "",
    date: "",
    prizePool: 0,
    status: "Upcoming",
    description: "",
  })
  const [notification, setNotification] = useState({ show: false, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTournament(formData)
      setNotification({ show: true, message: "Tournament created successfully!" })
      setTimeout(() => setNotification({ show: false, message: "" }), 3000)
      setFormData({
        title: "",
        gameName: "",
        date: "",
        prizePool: 0,
        status: "Upcoming",
        description: "",
      })
    } catch (error) {
      console.error("Error creating tournament:", error)
      setNotification({ show: true, message: "Error creating tournament. Please try again." })
      setTimeout(() => setNotification({ show: false, message: "" }), 3000)
    };
  }

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-lg w-full"
      >
        <AnimatePresence>
          {notification.show && (
            <motion.div
              key="notification"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white text-center ${
                notification.message.includes("Error") ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["title", "gameName"].map((field, index) => (
            <div className="relative" key={index}>
              <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600 dark:text-indigo-400" />
              <input
                type="text"
                placeholder={field === "title" ? "Tournament Title" : "Game Name"}
                value={formData[field as keyof CreateTournament]} 
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
          ))}

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600 dark:text-indigo-400" />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600 dark:text-indigo-400" />
            <input
              type="number"
              placeholder="Prize Pool"
              value={formData.prizePool}
              onChange={(e) => setFormData({ ...formData, prizePool: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              min="0" 
              required
            />
          </div>

          <div className="relative">
            {formData.status === "Upcoming" ? (
        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600 dark:text-indigo-400" />
      ) : (
        <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600 dark:text-indigo-400" />
      )}
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "Upcoming" | "Completed" })}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="relative">
            <AlignLeft className="absolute left-3 top-3 text-indigo-600 dark:text-indigo-400" />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 min-h-[100px]"
              maxLength={500} 
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors duration-300 font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Tournament
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}