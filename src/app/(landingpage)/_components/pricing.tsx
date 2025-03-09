"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [annual, setAnnual] = useState(true);

  //   const plans = [
  //     {
  //       name: "Free",
  //       description: "Perfect for trying out PresentAI",
  //       price: annual ? 0 : 0,
  //       features: [
  //         "5 presentations per month",
  //         "Basic templates",
  //         "AI content generation (limited)",
  //         "Export to PDF",
  //         "24/7 support",
  //       ],
  //       cta: "Get Started",
  //       popular: false,
  //     },
  //     {
  //       name: "Pro",
  //       description: "For professionals and small teams",
  //       price: annual ? 19 : 29,
  //       features: [
  //         "Unlimited presentations",
  //         "All templates",
  //         "Advanced AI content generation",
  //         "Export to multiple formats",
  //         "Brand kit integration",
  //         "Collaboration for up to 5 users",
  //         "Priority support",
  //       ],
  //       cta: "Start Free Trial",
  //       popular: true,
  //     },
  //     {
  //       name: "Enterprise",
  //       description: "For organizations with advanced needs",
  //       price: annual ? 49 : 69,
  //       features: [
  //         "Everything in Pro",
  //         "Unlimited team members",
  //         "Advanced analytics",
  //         "Custom templates",
  //         "API access",
  //         "SSO authentication",
  //         "Dedicated account manager",
  //       ],
  //       cta: "Contact Sales",
  //       popular: false,
  //     },
  //   ]

  const plans = [
    {
      name: "Pro",
      description: "For businesses and power users",
      id: process.env.NEXT_PUBLIC_PRO_PLAN_ID!,
      price: 30,
      features: [
        "Unlimited presentations generation for seamless productivity",
        "Effortlessly create, delete multiple presentations",
        "Share presentations via customized and secure shareable links",
      ],
      cta: "Go Pro",
      popular: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="pricing" className="py-24 bg-background/50 w-full">
      <div className="flex flex-col justify-between items-center p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple,{" "}
            <span className="bg-vivid-gradient bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            Choose the plan that works best for you and your team
          </p>
          {/* 
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 ${!annual ? "text-foreground" : "text-foreground/60"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={`${
                  annual ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-primary transition-transform`}
              />
            </button>
            <span className={`ml-3 ${annual ? "text-foreground" : "text-foreground/60"}`}>
              Yearly <span className="text-sm text-green-500">(Save 20%)</span>
            </span>
          </div> */}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-card border rounded-xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "shadow-lg shadow-purple-500/10 relative"
                  : "border-border hover:border-purple-500/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-vivid-gradient text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              {/* Discount Badge - positioned at top right */}
              <div className="absolute -top-3 -right-3 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-md">
                10% Discount
              </div>
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/70 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-foreground/70">
                    {plan.price === 0 ? "" : annual ? "/month" : "/month"}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular ? "bg-vivid-gradient hover:to-pink-600" : ""
                }`}
                variant={plan.popular ? "outline" : "default"}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
