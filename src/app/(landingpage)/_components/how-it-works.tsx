"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Wand2, Layers, ArrowRight } from "lucide-react"

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      icon: <FileText className="h-10 w-10 text-purple-500" />,
      title: "Start with a prompt",
      description: "Describe what you need in your presentation or choose from our templates.",
      color: "from-purple-500/20 to-purple-500/5",
    },
    {
      icon: <Wand2 className="h-10 w-10 text-pink-500" />,
      title: "AI generates content",
      description: "Our AI creates professional slides with compelling content and visuals.",
      color: "from-pink-500/20 to-pink-500/5",
    },
    {
      icon: <Layers className="h-10 w-10 text-purple-500" />,
      title: "Customize and refine",
      description: "Edit, customize, and perfect your presentation with our intuitive editor.",
      color: "from-purple-500/20 to-purple-500/5",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="how-it-works" className="py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-vivid-gradient bg-clip-text text-transparent">
              VizboardAI
            </span>{" "}
            Works
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Create professional presentations in just three simple steps
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              <div className="bg-card border border-border rounded-xl p-8 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-xl -z-10 opacity-30`} />
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-background rounded-full mb-6 border border-border">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-foreground/20" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          {/* <Button
            size="lg"
            className="bg-vivid-gradient hover:to-pink-600"
          >
            Try It Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button> */}
        </motion.div>
      </div>
    </section>
  )
}

