import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Apple, Dumbbell, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200])
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 400])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center"
    >
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 right-0 -mr-[20%] -mt-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            style={{ y: yText, opacity }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center self-start px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
              Kochi's Premium Fitness Center
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading leading-[0.9] text-white"
            >
              Build Your <br />
              <span className="text-gradient">Strongest Body</span> <br />
              With Expert Trainers
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-text-secondary text-lg md:text-xl max-w-lg leading-relaxed"
            >
              Personalized training, nutrition guidance, and world-class facilities designed to transform your lifestyle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              <Button size="lg">Join Now</Button>
              <Button variant="secondary" size="lg">Book Free Trial</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-white/10"
            >
              {[
                { label: "Members", value: "500+" },
                { label: "Trainers", value: "15+" },
                { label: "Years", value: "10+" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-heading text-white">{stat.value}</span>
                  <span className="text-sm text-text-secondary uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Gym Showcase */}
          <motion.div
            style={{ y: yImage, opacity }}
            className="relative lg:h-[700px] w-full flex items-center justify-center mt-12 lg:mt-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full rounded-[2rem] overflow-hidden border border-white/10"
            >
              {/* Replace src with a real high quality gym image from unsplash */}
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
                alt="Premium Gym Showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-6 lg:-left-12 glass px-6 py-4 rounded-2xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Weight Loss</p>
                <p className="text-xs text-text-secondary">Programs</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-32 -right-6 lg:-right-12 glass px-6 py-4 rounded-2xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <Apple className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Nutrition</p>
                <p className="text-xs text-text-secondary">Coaching</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-4 rounded-2xl flex items-center gap-4 w-max"
            >
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Personal Training</p>
                <p className="text-xs text-text-secondary">1-on-1 Coaching</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
