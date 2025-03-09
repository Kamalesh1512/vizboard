"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

import { ArrowRight, Sparkles } from "lucide-react"
import Header from "./header"

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-background to-background/95">
      <Header />
      <div className="container mx-auto px-4 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-foreground/5 px-4 py-2 rounded-full text-sm"
            >
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>Revolutionize your presentations with AI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Create stunning{" "}
              <span className="bg-vivid-gradient bg-clip-text text-transparent">
                presentations
              </span>{" "}
              in minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-foreground/80 max-w-lg"
            >
              Transform your ideas into professional presentations with our AI-powered platform. No design skills
              required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-vivid-gradient hover:to-pink-600 text-white font-medium px-8"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-sm text-foreground/60 mt-4"
            >
              No credit card required • Free plan available
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <motion.div
                animate={{
                  boxShadow: isHovered
                    ? "0 0 40px 5px rgba(168, 85, 247, 0.4)"
                    : "0 0 20px 0px rgba(168, 85, 247, 0.2)",
                }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden"
              >
                <img
                  src="/preview-create-page.png"
                  alt="PresentAI Dashboard"
                  className="w-full h-full rounded-xl"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-xl pointer-events-none"
              />
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 2,
              }}
              className="absolute -top-8 -right-8 bg-background/80 backdrop-blur-md p-4 rounded-lg shadow-lg border border-purple-500/20"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span className="font-medium">AI-powered templates</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 3,
              }}
              className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-md p-4 rounded-lg shadow-lg border border-pink-500/20"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-pink-500" />
                <span className="font-medium">Creative AI assistance</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10" />
    </section>
  )
}

