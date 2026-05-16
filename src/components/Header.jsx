import { motion } from 'framer-motion';
import { navItems } from '../data/portfolio.js';

export default function Header({ activeSection }) {
  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <a className="brand" href="#home" aria-label="Go to home section">
        <img src="/assets/kel-logo.png" alt="KEL logo" />
        <span>
          <strong>KEL</strong>
          <small>Portfolio</small>
        </span>
      </a>

      <nav className="nav-dock" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? 'is-active' : ''}
          >
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
