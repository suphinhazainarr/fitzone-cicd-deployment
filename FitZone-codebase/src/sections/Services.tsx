import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Dumbbell, Flame, Apple, Users } from "lucide-react"

const services = [
  {
    title: "Personal Training",
    icon: Dumbbell,
    description: "One-on-one coaching programs tailored to your specific goals."
  },
  {
    title: "Weight Loss Programs",
    icon: Flame,
    description: "Customized fat-loss transformations that actually work."
  },
  {
    title: "Nutrition Coaching",
    icon: Apple,
    description: "Meal plans and lifestyle guidance for sustainable results."
  },
  {
    title: "Group Classes",
    icon: Users,
    description: "HIIT, Yoga, CrossFit and more in an electric atmosphere."
  }
]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 relative bg-surface/50" ref={ref}>
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mt-2 mb-4">
            Everything You Need To Succeed
          </h2>
          <p className="text-text-secondary text-lg">
            We provide comprehensive fitness solutions to ensure you reach your potential.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative glass p-8 rounded-3xl transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)] border border-white/5 hover:border-primary/30"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 blur-[40px] transition-opacity duration-500 rounded-3xl -z-10 pointer-events-none" />
                
                <div className="w-14 h-14 rounded-2xl bg-surface border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:text-primary transition-colors text-white">
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
