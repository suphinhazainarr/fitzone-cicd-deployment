import Lenis from "@studio-freight/lenis"
import { createContext, useContext } from "react"

type LenisContextValue = Lenis | null

export const LenisContext = createContext<LenisContextValue>(null)

export function useLenis() {
  return useContext(LenisContext)
}
