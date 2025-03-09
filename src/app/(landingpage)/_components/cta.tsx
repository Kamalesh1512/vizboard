"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Cta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 md:p-12"
          ref={ref}
        >
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5),transparent)]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl"
            >
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Presentation Game
              </span>
              ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-foreground/80 mb-8 max-w-3xl"
            >
              Join thousands of professionals who are saving time and creating stunning presentations with PresentAI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </motion.div>
          </div>

          {/* Background elements */}
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-pink-500/30 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  )
}

