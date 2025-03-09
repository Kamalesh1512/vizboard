"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Star } from "lucide-react"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content:
        "PresentAI has completely transformed how our marketing team creates presentations. What used to take days now takes minutes, and the quality is even better!",
      avatar: "/placeholder.svg?height=80&width=80",
      stars: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Innovate Inc",
      content:
        "The AI-generated content is surprisingly good. It understands context and creates slides that actually make sense. This tool has saved me countless hours.",
      avatar: "/placeholder.svg?height=80&width=80",
      stars: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Sales Executive",
      company: "Global Sales",
      content:
        "My sales presentations have never looked better. The templates are professional, and the AI helps me focus on what matters - closing deals, not designing slides.",
      avatar: "/placeholder.svg?height=80&width=80",
      stars: 5,
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
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Thousands
            </span>{" "}
            of Users
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            See what our customers have to say about their experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-8 hover:border-purple-500/30 transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                {Array(testimonial.stars)
                  .fill(null)
                  .map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
              </div>
              <p className="text-foreground/80 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-foreground/60">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

