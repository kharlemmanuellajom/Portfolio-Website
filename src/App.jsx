import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AmbientBackground from './components/AmbientBackground.jsx';
import Accordion from './components/Accordion.jsx';
import {
  dataCampCertificates,
  education,
  professionalCertificates,
  profile,
  projects,
  skillGroups,
  timeline
} from './data/portfolio.js';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <path d="M12 10.4h.01" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
      <path d="M4 7h16v12H4z" />
      <path d="M4 12h16" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </svg>
  );
}

function ManilaClock() {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Manila'
    }).format(new Date())
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(
        new Intl.DateTimeFormat('en-PH', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Manila'
        }).format(new Date())
      );
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  return <span>{time} (UTC +08:00)</span>;
}

function ProfileSidebar() {
  const contactRows = [
    { icon: <BriefcaseIcon />, value: profile.role },
    { icon: <MailIcon />, value: profile.email },
    { icon: <PhoneIcon />, value: profile.phone},
    { icon: <PinIcon />,  value: profile.location },
  ];

  return (
    <motion.aside
      className="profile-rail"
      id="about"
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="profile-rail__inner">
        <div className="avatar-wrap">
          <img src="/assets/profile.jpg" alt="Kharl Emmanuel S. M. Lajom" />
        </div>

        <div className="profile-heading">
          <h1>{profile.shortName}</h1>
          <span>{profile.school}</span>
        </div>

        <div className="identity-list" aria-label="Profile information">
          {contactRows.map((row) => {
            const content = (
              <>
                <i>{row.icon}</i>
                <span>
                  <small>{row.label}</small>
                  <strong>{row.value}</strong>
                </span>
              </>
            );

            return row.href ? (
              <a key={row.href} href={row.href}>{content}</a>
            ) : (
              <div key={String(row.value)}>{content}</div>
            );
          })}
        </div>

        <p className="rail-summary">{profile.summary}</p>

        <div className="rail-contact-note">
          <span>Availability</span>
          <p>Open for <b>INTERNSHIP OPPORTUNITIES</b> and <b>PROJECT COLLABORATIONS</b>.</p>
        </div>

        <div className="left-contact-actions">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="left-action-btn resume-btn"
          >
            <span>Resume</span>
            <ArrowIcon />
          </a>

          <a
            href={`mailto:${profile.email}?subject=Portfolio%20Inquiry`}
            className="left-action-btn contact-btn"
          >
            <span>Contact me</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </motion.aside>
  );
}

function Card({ as: Component = motion.article, className = '', children, ...props }) {
  return (
    <Component
      className={`bento-card ${className}`}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      {...props}
    >
      {children}
    </Component>
  );
}

function Heatmap() {
  const cells = useMemo(
    () => Array.from({ length: 126 }, (_, index) => ((index * 7 + index * index + 3) % 5)),
    []
  );

  return (
    <div className="heatmap" aria-label="Decorative GitHub-style activity graph">
      {cells.map((level, index) => (
        <span key={index} data-level={level} />
      ))}
    </div>
  );
}

function GithubCard() {
  return (
    <Card className="github-card bento-card--tall">
      <div className="card-topline">
        <img src="/assets/github.png" alt="GitHub" />
        <a href={profile.github} target="_blank" rel="noreferrer">
          {profile.handle}
          <ArrowIcon />
        </a>
      </div>
      <Heatmap />
      <p>
        Academic and personal repositories focused on interface layouts, system prototypes, and
        hands-on software development practice.
      </p>
    </Card>
  );
}

function QuickFactsCard() {
  return (
    <Card className="linkedin-card">
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        className="linkedin-card-inner"
      >
        <div className="linkedin-main">
          <div className="linkedin-header">
            <div className="linkedin-icon-wrap">
              <img src="/assets/linkedin.png" alt="LinkedIn" />
            </div>

            <div>
              <span>LinkedIn</span>
              <p>@kharlemmanuellajom</p>
            </div>
          </div>

          <div className="linkedin-content">
            <h3>Professional Profile</h3>
            <p>
              View my education, internship experience, certifications,
              projects, and professional updates.
            </p>
          </div>

          <div className="linkedin-action">
            <span>Open LinkedIn</span>
            <ArrowIcon />
          </div>
        </div>

      </a>
    </Card>
  );
}

function SkillsCard() {
  return (
    <Card className="skills-card" id="skills">
      <h2>Technical Stack</h2>
      <div className="skill-grid">
        {skillGroups.map((group) => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <div className="chip-row">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Card>
  );
}

function EducationCard() {
  return (
    <Card className="education-card education-card--timeline">
      <div className="education-heading">
        <h2>Education</h2>
        <div className="education-track" aria-hidden="true">
          {education.map((item) => (
            <span key={item.school} />
          ))}
        </div>
      </div>

      <div className="education-list education-list--timeline" aria-label="Education history">
        {education.map((item) => (
          <article key={item.school}>
            <div className="education-meta">
              <span>{item.year}</span>
              <small>{item.level}</small>
            </div>
            <div>
              <h3>{item.school}</h3>
              <p>{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}

function ProjectsCard() {
  return (
    <Card className="projects-card bento-card--wide" id="work">
      <h2>Projects</h2>
      <div className="project-strip">
        {projects.map((project) => (
          <a key={project.title} href={project.href} target="_blank" rel="noreferrer">
            <img src={project.image} alt={`${project.title} preview`} />
            <div>
              <small>{project.type}</small>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span>{project.year}</span>
            </div>
            <ArrowIcon />
          </a>
        ))}
      </div>
    </Card>
  );
}

function CredentialsCard() {
  return (
    <Card className="credentials-card bento-card--wide" id="credentials">
      <h2>Credentials</h2>

      <div className="accordion-stack">
        <Accordion title="Professional Experience">
          {timeline.map((item) => (
            <div className="timeline-card" key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.company}</p>
              </div>
              <span>{item.period} • {item.meta}</span>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </Accordion>

        <Accordion title="Professional Certificates">
          <ol className="certificate-numbered-list">
            {professionalCertificates.map((certificate) => (
              <li key={certificate}>{certificate}</li>
            ))}
          </ol>
        </Accordion>

        <Accordion title="DataCamp Certificates">
          <ol className="certificate-numbered-list">
            {dataCampCertificates.map((certificate) => (
              <li key={certificate}>{certificate}</li>
            ))}
          </ol>
        </Accordion>
      </div>
    </Card>
  );
}

function Dashboard() {
  return (
    <section className="dashboard section-shell" id="home">
      <ProfileSidebar />

      <motion.div
        className="dashboard-main"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="bento-grid">
          <GithubCard />
          <QuickFactsCard />
          <SkillsCard />
          <EducationCard />
          <ProjectsCard />
          <CredentialsCard />
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer section-shell">
      <span>© {new Date().getFullYear()} Kharl Emmanuel S. M. Lajom</span>
      <a href="#home">Back to top</a>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <AmbientBackground />
      <main>
        <Dashboard />
      </main>
    </>
  );
}
