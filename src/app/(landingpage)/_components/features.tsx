"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Zap, PenTool, Image, BarChart, Clock, Palette, Share2 } from "lucide-react"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      title: "AI-Powered Content",
      description: "Generate professional content for your slides with just a few prompts.",
    },
    {
      icon: <PenTool className="h-6 w-6 text-purple-500" />,
      title: "Smart Templates",
      description: "Choose from hundreds of professionally designed templates.",
    },
    {
      icon: <Image className="h-6 w-6 text-purple-500" />,
      title: "Auto Design",
      description: "Our AI automatically designs your slides with perfect layouts.",
    },
    {
      icon: <BarChart className="h-6 w-6 text-purple-500" />,
      title: "Data Visualization",
      description: "Transform your data into compelling charts and graphs.",
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      title: "Time-Saving",
      description: "Create presentations in minutes instead of hours.",
    },
    {
      icon: <Palette className="h-6 w-6 text-purple-500" />,
      title: "Brand Consistency",
      description: "Maintain your brand identity across all presentations.",
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time.",
    },
    {
      icon: <Share2 className="h-6 w-6 text-purple-500" />,
      title: "Easy Sharing",
      description: "Share your presentations with a simple link.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for{" "}
            <span className="bg-vivid-gradient bg-clip-text text-transparent">
              Stunning Presentations
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Everything you need to create professional presentations without the hassle
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card hover:bg-card/80 p-6 rounded-xl border border-border transition-colors duration-300 hover:border-purple-500/30"
            >
              <div className="p-3 bg-primary/5 rounded-lg w-fit mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

