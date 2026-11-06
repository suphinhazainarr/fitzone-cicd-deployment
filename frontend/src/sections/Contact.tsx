import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/Button"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  membershipPlan: z.string().min(1, "Please select a plan"),
  message: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log(data)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-heading text-white mt-2 mb-6">
              Start Your Journey Today
            </h2>
            <p className="text-text-secondary text-lg mb-12 max-w-md">
              Have questions about our programs or memberships? Drop us a line, or visit us in person. We're here to help you every step of the way.
            </p>

            <div className="space-y-8">
              {[
                { icon: MapPin, title: "Location", detail: "123 Fitness Avenue, MG Road, Kochi, Kerala 682011" },
                { icon: Phone, title: "Phone", detail: "+91 98765 43210" },
                { icon: Mail, title: "Email", detail: "hello@fitzonekochi.com" },
                { icon: Clock, title: "Working Hours", detail: "Mon - Sat: 5:00 AM - 11:00 PM\nSun: 6:00 AM - 12:00 PM" }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-primary flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-text-secondary whitespace-pre-line">{item.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="glass p-8 md:p-10 rounded-[2rem]">
              {isSubmitted ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-success/20 text-success flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading text-white mb-2">Message Sent!</h3>
                  <p className="text-text-secondary">We'll get back to you within 24 hours.</p>
                  <Button className="mt-8" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Full Name</label>
                      <input 
                        {...register("name")}
                        className="w-full h-14 bg-surface border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Phone Number</label>
                      <input 
                        {...register("phone")}
                        className="w-full h-14 bg-surface border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Email Address</label>
                    <input 
                      {...register("email")}
                      className="w-full h-14 bg-surface border border-white/10 rounded-xl px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Interested Plan</label>
                    <select 
                      {...register("membershipPlan")}
                      className="w-full h-14 bg-surface border border-white/10 rounded-xl px-4 text-white appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    >
                      <option value="" disabled className="text-white/30">Select a plan</option>
                      <option value="basic">Basic - Rs. 999/mo</option>
                      <option value="premium">Premium - Rs. 1999/mo</option>
                      <option value="elite">Elite - Rs. 2999/mo</option>
                      <option value="trial">Book Free Trial</option>
                    </select>
                    {errors.membershipPlan && <p className="text-red-500 text-xs">{errors.membershipPlan.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Message (Optional)</label>
                    <textarea 
                      {...register("message")}
                      className="w-full h-32 bg-surface border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
