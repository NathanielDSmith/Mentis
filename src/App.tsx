import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AmbientBackground from './components/AmbientBackground'

const MentisHome = lazy(() => import('./pages/MentisHome'))
const ScenarioRunner = lazy(() => import('./pages/ScenarioRunner'))

function App() {
  return (
    <BrowserRouter>
      <AmbientBackground />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <span className="font-mono text-mentis-accent text-sm tracking-widest animate-pulse">
            MENTIS
          </span>
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
