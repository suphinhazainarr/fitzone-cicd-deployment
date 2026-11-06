import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Rahul",
    review: "Lost 15kg in 4 months. The personalized training and nutrition plan completely changed my life. The trainers here actually care about your progress.",
    role: "Premium Member"
  },
  {
    name: "Anjali",
    review: "Best trainers in Kochi. The facilities are top-notch and the community here is incredibly supportive. I look forward to my workouts every day.",
    role: "Elite Member"
  },
  {
    name: "Vikram",
    review: "The CrossFit classes are intense but so rewarding. I've never been stronger or faster. FitZone is truly a game changer.",
    role: "Basic Member"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  
  const ref = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  }

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Success Stories</span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mt-2 mb-4">
            Hear From Our Members
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[300px] md:h-[250px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="absolute inset-0 w-full"
              >
                <div className="glass p-8 md:p-12 rounded-[2rem] h-full flex flex-col justify-center relative border border-white/10">
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5" />
                  
                  <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8 italic relative z-10">
                    "{testimonials[currentIndex].review}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                      <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-white font-heading text-xl">
                        {testimonials[currentIndex].name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-primary">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-8 bg-primary" : "bg-white/20"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
