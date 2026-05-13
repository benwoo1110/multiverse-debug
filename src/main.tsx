import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import Dumps from "./pages/dumps.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { BrowserRouter, Route, Routes } from "react-router"
import Index from "./pages/index.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route index element={<Index />} />
          <Route path=":id" element={<Dumps />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
