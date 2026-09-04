import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/Button"

const plans = [
  {
    name: "Basic",
    price: "999",
    highlighted: false,
    features: [
      "Gym Access (Off-peak)",
      "Locker Facility",
      "Free WiFi",
      "1 Group Class / Month"
    ]
  },
  {
    name: "Premium",
    price: "1999",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Unlimited Gym Access",
      "Personal Training (2/mo)",
      "Nutrition Coaching",
      "Unlimited Group Classes",
      "Locker & Towel Service"
    ]
  },
  {
    name: "Elite",
    price: "2999",
    highlighted: false,
    features: [
      "All Premium Features",
      "Unlimited Personal Training",
      "Priority Support",
      "Advanced Programs",
      "Spa & Recovery Room Access"
    ]
  }
]

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="pricing" className="py-24 relative bg-surface/30" ref={ref}>
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Membership Plans</span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mt-2 mb-4">
            Invest In Your Health
          </h2>
          <p className="text-text-secondary text-lg">
            Choose the perfect plan that fits your goals and lifestyle. No hidden fees.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              className={`relative rounded-[2rem] p-8 flex flex-col h-full ${
                plan.highlighted 
                  ? "bg-gradient-to-b from-primary/20 to-surface border border-primary/50 shadow-[0_0_40px_rgba(255,77,0,0.15)]" 
                  : "glass"
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-heading text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white tracking-tight">₹{plan.price}</span>
                  <span className="text-text-secondary">/month</span>
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-secondary">
                    <div className={`rounded-full p-1 ${plan.highlighted ? "bg-primary/20 text-primary" : "bg-white/5 text-white/50"}`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8 border-t border-white/10">
                <Button 
                  variant={plan.highlighted ? "default" : "secondary"} 
                  className="w-full"
                >
                  Choose {plan.name}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
