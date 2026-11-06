import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Link, Globe, Mail } from "lucide-react"

const trainers = [
  {
    name: "Betty Benny",
    role: "Head Coach & Nutritionist",
    experience: "8+ Years",
    certifications: "ISSA Certified",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop",
    socials: { ig: "#", tw: "#", li: "#" }
  },
  {
    name: "John Mathew",
    role: "Strength & Conditioning",
    experience: "10+ Years",
    certifications: "NSCA CSCS",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop",
    socials: { ig: "#", tw: "#", li: "#" }
  },
  {
    name: "Arun Joseph",
    role: "CrossFit Specialist",
    experience: "6+ Years",
    certifications: "CrossFit Level 2",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
    socials: { ig: "#", tw: "#", li: "#" }
  }
]

export default function Trainers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="trainers" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Expert Coaches</span>
            <h2 className="text-4xl md:text-5xl font-heading text-white mt-2 mb-4">
              Meet Your Trainers
            </h2>
            <p className="text-text-secondary text-lg">
              Our certified professionals are dedicated to helping you achieve your fitness goals safely and effectively.
            </p>
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[2rem] glass h-[420px]"
            >
              {/* Image */}
              <img 
                src={trainer.image} 
                alt={trainer.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-heading text-white tracking-wide">{trainer.name}</h3>
                  <p className="text-primary font-medium mb-3">{trainer.role}</p>
                  
                  {/* Hidden Details revealed on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                      <span>{trainer.experience}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{trainer.certifications}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <a href={trainer.socials.ig} className="text-white/70 hover:text-white transition-colors">
                        <Link className="w-5 h-5" />
                      </a>
                      <a href={trainer.socials.tw} className="text-white/70 hover:text-white transition-colors">
                        <Globe className="w-5 h-5" />
                      </a>
                      <a href={trainer.socials.li} className="text-white/70 hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
