import { motion } from 'framer-motion';
import TrainerLayout from '@/components/layouts/TrainerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from "react";

import { 
  Check, X, Crown, CreditCard, ShieldCheck, 
  ArrowRight, Sparkles, TrendingUp 
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PLANS = {
  monthly: {
    id: "monthly",
    name: "Monthly Plan",
    price: 100,
    duration: "/mo",
    billingText: "Next billing: Jan 15, 2026",
    description: "Essential tools for growing gyms.",
    features: [
      "Basic Slot Management",
      "Standard Analytics Dashboard",
      "Email Support (48h response)",
      "Up to 500 Active Members",
    ],
  },
  yearly: {
    id: "yearly",
    name: "Yearly Plan",
    price: 1000,
    duration: "/year",
    billingText: "Next billing: Jan 15, 2026",
    description: "Full power for scaling empires.",
    features: [
      "Everything in Monthly",
      "Advanced AI Analytics & Forecasts",
      "Unlimited Members",
      "Priority 24/7 Support",
      "Custom Branding Options",
    ],
  },
};

const TrainerSubscription = () => {
  // Mocked backend value (later: const currentPlan = subscription.plan;)
const [currentPlan] = useState<"monthly" | "yearly">("monthly");

  const activePlan = PLANS[currentPlan];
  const saving = (PLANS.monthly.price * 12) - PLANS.yearly.price;

  return (
    <TrainerLayout gymName="PowerFit Arena" subscriptionStatus="active">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
        
        {/* --- 1. HERO HEADER --- */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2"
          >
            <Crown className="w-4 h-4" /> Gymholic Elite
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Upgrade Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Gym Empire</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Unlock advanced AI analytics, unlimited slots, and priority support to scale your fitness business.
          </p>
        </div>

        {/* --- 2. ACTIVE PLAN "CREDIT CARD" UI --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative w-full max-w-3xl mx-auto"
        >
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl blur opacity-25"></div>
            
            <div className="relative bg-slate-900 text-white rounded-2xl p-6 md:p-8 overflow-hidden shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Current Membership</p>
                        <h2 className="text-3xl font-black flex items-center gap-3">
                           {activePlan.name} <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 border-0">Active</Badge>
                        </h2>
                        <div className="flex items-center gap-2 mt-2 text-sm text-slate-300">
                            <CreditCard className="w-4 h-4" />
                            <span>{activePlan.billingText}</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                         <div className="text-right">
                             <p className="text-xs text-slate-400 font-bold uppercase">Amount Due</p>
                             <p className="text-2xl font-bold">₹{activePlan.price}<span className="text-sm font-normal text-slate-500">{activePlan.duration}</span></p>
                         </div>
                         <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-slate-900 h-8 text-xs transition-colors">
                             Update Payment Method
                         </Button>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* --- 3. PLANS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
            
            {/* STANDARD PLAN */}
            <Card className="border-2 border-slate-100 shadow-sm hover:border-slate-300 transition-all duration-300 relative overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-2xl font-black text-slate-900">Monthly</CardTitle>
                    <CardDescription>Essential tools for growing gyms.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-slate-900">₹100</span>
                        <span className="text-slate-500 font-medium">/month</span>
                    </div>
                    
                    <div className="space-y-3">
                        <FeatureItem text="Basic Slot Management" />
                        <FeatureItem text="Standard Analytics Dashboard" />
                        <FeatureItem text="Email Support (48h response)" />
                        <FeatureItem text="Up to 500 Active Members" />
                        <div className="opacity-50 space-y-3">
                            <FeatureItem text="AI Smart Insights" included={false} />
                            <FeatureItem text="Revenue Forecasting" included={false} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={currentPlan === "monthly"}
                    >
                      {currentPlan === "monthly" ? "Current Plan" : "Switch to Monthly"}
                    </Button>
                </CardFooter>
            </Card>

            {/* PRO PLAN (HERO) */}
            <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card className="border-2 border-orange-500 shadow-xl bg-white relative overflow-hidden h-full flex flex-col">
                    {/* Badge */}
                    <div className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
                        Most Popular
                    </div>

                    <CardHeader>
                        <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-2">
                            Yearly <Sparkles className="w-5 h-5 text-orange-500 fill-orange-500" />
                        </CardTitle>
                        <CardDescription>Full power for scaling empires.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 flex-1">
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-slate-900">₹1,000</span>
                            <span className="text-slate-500 font-medium">/year</span>
                        </div>
                        {/* Savings Alert - shown only when user is not already yearly */}
                        {currentPlan !== "yearly" && (
                          <div className="bg-green-50 border border-green-100 p-2 rounded-lg flex items-center gap-2 text-xs font-bold text-green-700">
                              <TrendingUp className="w-4 h-4" />
                              You save ₹{saving} per year with this plan!
                          </div>
                        )}

                        <div className="space-y-3">
                            <FeatureItem text="Everything in Monthly" highlight />
                            <FeatureItem text="Advanced AI Analytics & Forecasts" highlight />
                            <FeatureItem text="Unlimited Members" highlight />
                            <FeatureItem text="Priority 24/7 Support" highlight />
                            <FeatureItem text="Custom Branding Options" highlight />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-lg shadow-orange-500/25 h-12 text-md"
                          disabled={currentPlan === "yearly"}
                        >
                          {currentPlan === "yearly"
                            ? "Current Plan"
                            : "Upgrade to Elite"} 
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>

        {/* --- 4. FAQ / TRUST SECTION --- */}
        <div className="max-w-3xl mx-auto pt-10">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-bold text-slate-800">Can I switch back to Monthly?</AccordionTrigger>
                    <AccordionContent className="text-slate-500">
                        Yes, you can downgrade at the end of your yearly billing cycle. Your data will remain safe.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-bold text-slate-800">What happens to my data if I cancel?</AccordionTrigger>
                    <AccordionContent className="text-slate-500">
                        We keep your data for 90 days after cancellation in case you decide to return. You can also export it anytime.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="font-bold text-slate-800">Do you offer refunds?</AccordionTrigger>
                    <AccordionContent className="text-slate-500">
                        We offer a 7-day money-back guarantee for Yearly plans if you are not satisfied with the Elite features.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="font-bold text-slate-800">Is my payment information secure?</AccordionTrigger>
                    <AccordionContent className="text-slate-500">
                        Yes. All payments are processed securely via Razorpay, and we never store your card or UPI details on our servers
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className="font-bold text-slate-800">Can I cancel my subscription anytime?</AccordionTrigger>
                    <AccordionContent className="text-slate-500">
                        Yes. You can cancel your subscription at any time from the dashboard. Your access will continue until the end of the current billing period.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
        
        {/* Trust Footer */}
        <div className="text-center pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-400 font-medium flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Secure Payment via Stripe • Cancel Anytime
            </p>
        </div>

      </div>
    </TrainerLayout>
  );
};

// Helper Component for Feature List
const FeatureItem = ({ text, included = true, highlight = false }: { text: string, included?: boolean, highlight?: boolean }) => (
    <div className={`flex items-center gap-3 text-sm ${included ? 'text-slate-700' : 'text-slate-400'}`}>
        {included ? (
            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${highlight ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
                <Check className="w-3 h-3" />
            </div>
        ) : (
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center">
                <X className="w-3 h-3" />
            </div>
        )}
        <span className={highlight ? 'font-bold' : 'font-medium'}>{text}</span>
    </div>
);

export default TrainerSubscription;

