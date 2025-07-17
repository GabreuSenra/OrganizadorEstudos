import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  const links = [
    { path: '/', label: 'Home' },
    { path: '/historico', label: 'Histórico' },
  ]

  return (
    <header className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-2xl tracking-wide hover:text-yellow-300 transition">
          Organizador de Estudos
        </Link>


      </div>
    </header>
  )
}
