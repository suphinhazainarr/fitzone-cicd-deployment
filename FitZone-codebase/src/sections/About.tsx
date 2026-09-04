import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const facilities = [
  "Modern Cardio Zone",
  "Strength Training Area",
  "CrossFit Studio",
  "Locker Rooms",
  "Steam & Shower"
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop" 
                alt="FitZone Facility" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="absolute -bottom-8 -right-8 md:bottom-8 md:-right-12 glass p-6 rounded-2xl max-w-[280px]"
            >
              <h4 className="text-xl font-heading text-primary mb-2">Our Mission</h4>
              <p className="text-sm text-text-secondary">Empower every member to become healthier and stronger.</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white">
                More Than <br /> Just A Gym
              </h2>
            </div>
            
            <p className="text-text-secondary text-lg leading-relaxed">
              FitZone was built to help people achieve sustainable fitness transformations through expert coaching and community support. We provide an environment that pushes you to your limits while ensuring you feel at home.
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-6">World-Class Facilities</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {facilities.map((facility, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 text-text-secondary"
                  >
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    <span>{facility}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
