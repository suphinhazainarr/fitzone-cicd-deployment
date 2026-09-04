import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Dumbbell } from "lucide-react"
import { Button } from "./ui/Button"
import { useLenis } from "@/providers/lenis-context"

const NAV_ITEMS = ["Home", "About", "Services", "Trainers", "Pricing", "Contact"]

export default function Navbar() {
  const lenis = useLenis()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      setIsScrolled(lenis.scroll > 20)
    }

    handleScroll()
    lenis.on("scroll", handleScroll)
    return () => lenis.off("scroll", handleScroll)
  }, [lenis])

  useEffect(() => {
    if (!lenis) return

    if (mobileMenuOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [mobileMenuOpen, lenis])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 h-[90px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <span className="font-heading text-3xl tracking-wider text-white uppercase group-hover:text-primary transition-colors">
            FitZone
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="secondary" size="sm">
            Book Free Trial
          </Button>
          <Button size="sm">
            Join Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-white hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/10">
                <Button variant="secondary" className="w-full">
                  Book Free Trial
                </Button>
                <Button className="w-full">
                  Join Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
