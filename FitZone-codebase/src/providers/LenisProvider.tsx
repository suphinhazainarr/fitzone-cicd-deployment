import {
  useEffect,
  useState,
  type ReactNode,
} from "react"
import Lenis from "@studio-freight/lenis"
import { LenisContext } from "./lenis-context"

const NAV_OFFSET = -120

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    setLenis(instance)

    let rafId = 0
    function raf(time: number) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!anchor) return

      const hash = anchor.getAttribute("href")
      if (!hash) return

      event.preventDefault()

      if (hash === "#") {
        instance.scrollTo(0)
        return
      }

      const target = document.querySelector(hash)
      if (target) {
        instance.scrollTo(hash, { offset: NAV_OFFSET })
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("click", handleAnchorClick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}
