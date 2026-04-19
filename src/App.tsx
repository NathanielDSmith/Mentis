import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const MentisHome = lazy(() => import('./pages/MentisHome'))
const ScenarioRunner = lazy(() => import('./pages/ScenarioRunner'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-mentis-bg flex items-center justify-center">
          <span className="font-mono text-mentis-accent text-sm tracking-widest">MENTIS</span>
        </div>
      }>
        <Routes>
          <Route path="/" element={<MentisHome />} />
          <Route path="/scenario/:scenarioId" element={<ScenarioRunner />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
