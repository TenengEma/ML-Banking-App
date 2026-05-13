import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Landing = () => (
  <main className="relative min-h-screen bg-sand-50 px-4 py-12">
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-clay-700">Invisible Security Banking</p>
        <h1 className="text-4xl font-semibold leading-tight text-charcoal-900">Banking that feels human, secure, and instant.</h1>
        <p className="mt-4 text-charcoal-700">Open your account in minutes with behavior-aware protection that works silently in the background.</p>
        <div className="mt-8 flex gap-3">
          <Link className="rounded-lg bg-terracotta-600 px-5 py-3 text-sm font-medium text-cream-50" to="/login">Sign in</Link>
          <Link className="rounded-lg border border-clay-400 px-5 py-3 text-sm font-medium text-clay-700" to="/identity-info">Open account</Link>
        </div>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-[420px] w-full rounded-3xl object-cover shadow-soft"
        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80"
        alt="Diverse customer using secure banking app"
      />
    </div>
  </main>
)

export default Landing
