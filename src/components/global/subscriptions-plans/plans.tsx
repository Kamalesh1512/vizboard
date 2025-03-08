"use client"
import { Check, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const pricingPlans = [
    // {
    //   name: "Basic",
    //   description: "For individuals and small teams",
    //   price: 10,
    //   id:process.env.NEXT_PUBLIC_BASIC_PLAN_ID!,
    //   features: [
    //     "Generate up to 30 reports every month",
    //     "Download reports instantly into PDF format",
    //     "No Daily limit",
    //   ],
    // },
    {
      name: "Pro",
      description: "For businesses and power users",
      id:process.env.NEXT_PUBLIC_PRO_PLAN_ID!,
      price: 30,
      features: [
        "Unlimited presentations generation for seamless productivity",
        "Effortlessly create, delete multiple presentations",
        "Share presentations via customized and secure shareable links",
      ],
    }
  ]


const Subscriptions = ({ onClose }: { onClose: () => void }) => {

    const {user} = useClerk()


  return (
    <div>
    <div className="text-center mb-5">
      <p className="text-lg text-muted-foreground">Choose the plan that's right for you</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols- gap-8 max-w-5xl mx-auto">
      {pricingPlans.map((plan, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle>{plan.name}
                {plan.name =='Pro' ? 
            <Badge variant={"premium"} className="ml-5 text-black">10% Discount</Badge>:
            <></>}</CardTitle>
            <CardDescription>
              {plan.description}
              </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-4xl font-bold mb-6">
              <span className="line-through mr-3">${plan.price}</span>
              $27
              <span className="text-xl font-normal text-muted-foreground">/month</span></div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="justify-center">
           <Link href={`/payments/checkout/${plan.id}`}>
            <Button onClick={()=>{onClose();}}>
            Go Pro
            </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
    </div>
  );
};


export default Subscriptions;