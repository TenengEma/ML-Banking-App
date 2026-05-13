import { motion } from 'framer-motion'

const PageShell = ({ title, subtitle, children }) => (
  <motion.main
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
  >
    <header className="mb-6 rounded-2xl border border-sand-300 bg-cream-100 p-6 shadow-soft">
      <h1 className="text-2xl font-semibold text-charcoal-900">{title}</h1>
      <p className="mt-2 text-sm text-charcoal-600">{subtitle}</p>
    </header>
    {children}
  </motion.main>
)

export default PageShell
