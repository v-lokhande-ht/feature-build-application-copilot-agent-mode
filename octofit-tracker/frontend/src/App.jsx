import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigationItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiOrigin = codespaceName
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000'

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/users" className="brand" aria-label="OctoFit Tracker home">
          <img src={octofitLogo} alt="OctoFit Tracker" />
          <span>OctoFit Tracker</span>
        </NavLink>

        <nav className="nav-tabs" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content-panel">
        <div className="status-strip">
          <div>
            <span className="label">API origin</span>
            <strong>{apiOrigin}</strong>
          </div>
          <div>
            <span className="label">Environment</span>
            <strong>{codespaceName ? 'Codespaces' : 'Localhost fallback'}</strong>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
