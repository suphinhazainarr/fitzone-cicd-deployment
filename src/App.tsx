import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Services from "./sections/Services"
import Trainers from "./sections/Trainers"
import Pricing from "./sections/Pricing"
import Testimonials from "./sections/Testimonials"
import Contact from "./sections/Contact"
import Footer from "./components/Footer"
import { LenisProvider } from "./providers/LenisProvider"

function App() {
  return (
    <LenisProvider>
      <div className="bg-background min-h-screen text-text-primary selection:bg-primary/30">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Trainers />
          <Pricing />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </LenisProvider>
  )
}

export default App
