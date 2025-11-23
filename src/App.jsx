import './styles/App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/shared/components/ui/toaster"

function App() {
  return (
    <>
      <Pages />
      <Toaster />
    </>
  )
}

export default App 