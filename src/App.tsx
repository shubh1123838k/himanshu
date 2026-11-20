import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { BuildSwarmEngine } from './components/BuildSwarmEngine';
import { CustomCursor } from './components/CustomCursor';
import { DirectionalWords } from './components/DirectionalWords';
import { MagneticButton } from './components/MagneticButton';
import { MusicPlayer } from './components/MusicPlayer';
import {
  EXPERIENCE,
  GITHUB_CELLS,
  HERO_LOGOS,
  PROJECTS,
  SKILLS,
  SOCIALS,
  WRITINGS,
} from './data/portfolio';

const ROLE_TEXT = 'Founder @ AutoPlaced.ai · SDE-2 & Backend Architect';
const BIO_TEXT =
  "Hey, I'm Himanshu Jain, a Software Engineer with 5+ years of experience building scalable backend systems, distributed microservices, and high-performance applications. Currently Founder @ AutoPlaced.ai, an AI-powered job search platform transforming opportunity discovery, applications, and interview prep. Ex-Reputation, Park+, Simpl, Vymo, and Turing. Based in Koramangala, Bengaluru, my expertise spans REST APIs, event-driven architectures, High-Level Design, and low-latency systems powered by";

interface PortfolioFrameProps {
  reducedMotion: boolean;
}

const PortfolioFrame = memo(function PortfolioFrame({ reducedMotion }: PortfolioFrameProps) {
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ghsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ghs = ghsRef.current;
    if (ghs) {
      ghs.scrollLeft = ghs.scrollWidth;
    }

    if (reducedMotion) return;
    const roleEl = roleRef.current;
    if (!roleEl) return;

    let clearFadeTimer: number | undefined;
    const intervalId = window.setInterval(() => {
      roleEl.classList.add('f');
      clearFadeTimer = window.setTimeout(() => {
        roleEl.classList.remove('f');
      }, 1100);
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
      if (clearFadeTimer !== undefined) {
        window.clearTimeout(clearFadeTimer);
      }
      roleEl.classList.remove('f');
    };
  }, [reducedMotion]);

  return (
    <main className="frame">
      <section className="sec" id="hero" data-block>
        <div className="top" data-build="box">
          <a
            className="pill glass"
            target="_blank"
            rel="noopener noreferrer"
            href="https://autoplaced.ai"
          >
            ⌘ AutoPlaced.ai
          </a>
        </div>

        <div className="pfp" data-build="box">
          <img
            src="/images/avatar-hj.svg"
            alt="Himanshu Jain avatar"
            sizes="96px"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            width={96}
            height={96}
          />
        </div>

        <div className="name" data-build="text">
          <h1>Himanshu Jain</h1>
          <svg className="tick" viewBox="0 0 24 24" aria-label="Verified">
            <path
              fill="#1d9bf0"
              d="M12 1l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 23l-2.6-1.9-3.2.1-1-3L2.6 16.3l1-3-1-3 2.6-1.9 1-3 3.200.1z"
            />
            <path
              fill="none"
              stroke="#fff"
              strokeWidth={2}
              d="M7.500 12.200l3 3 6-6.200"
            />
          </svg>
        </div>

        <p
          className="role"
          id="role"
          ref={roleRef}
          data-build="box"
          aria-label={ROLE_TEXT}
        >
          {[...ROLE_TEXT].map((char, index) => (
            <span
              key={index}
              style={{ ['--i' as string]: index }}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
        </p>

        <span className="uline" data-build="box" aria-hidden="true" />

        <DirectionalWords text={BIO_TEXT} dataBuild="box" />

        <div className="logos" data-build="box">
          {HERO_LOGOS.map((item) => (
            <span
              key={item.name}
              className="logo"
              data-tech={item.tech}
              style={{ ['--c' as string]: item.color }}
            >
              <i className="hero-tech-icon" aria-hidden="true">
                <svg
                  viewBox={item.viewBox}
                  dangerouslySetInnerHTML={{ __html: item.svgInner }}
                />
              </i>
              {item.name}
            </span>
          ))}
        </div>
      </section>

      <div className="rule" aria-hidden="true" />

      <section className="sec" id="socials" data-block>
        <h2 data-build="text">Connect</h2>
        <div className="logos" id="soc">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              className="logo"
              href={social.href}
              target={social.href.startsWith('http') || social.href.endsWith('.pdf') ? '_blank' : undefined}
              rel={social.href.startsWith('http') || social.href.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
              style={{ ['--c' as string]: social.color }}
              data-cursor={social.cursor}
              data-build="box"
            >
              <i>
                <svg
                  viewBox={social.viewBox}
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: social.svgInner }}
                />
              </i>
              {social.name}
            </a>
          ))}
        </div>
      </section>

      <div className="rule" aria-hidden="true" />

      <section className="sec" id="music" data-block>
        <h2 data-build="text">Music</h2>
        <MusicPlayer />
      </section>

      <div className="rule" aria-hidden="true" />

      <section className="sec" id="exp" data-block>
        <h2 data-build="text">Experience &amp; Education</h2>
        <div id="ex">
          {EXPERIENCE.map((item, idx) => (
            <div className="row" data-build="box" key={`${item.num}-${idx}`}>
              <div className="tile">{item.num}</div>
              <div>
                <b>{item.title}</b>
                <small>{item.description}</small>
              </div>
              <div className="d">{item.date}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="rule" aria-hidden="true" />

      <section className="sec" id="skills" data-block>
        <h2 data-build="text">Skills &amp; Architecture</h2>
        <div className="chips" id="sk">
          {SKILLS.map((skill) => (
            <span
              key={skill.name}
              className="chip"
              tabIndex={0}
              style={{ ['--c' as string]: skill.color }}
              data-build="box"
            >
              <svg
                className="skill-icon"
                viewBox={skill.viewBox}
                width={18}
                height={18}
                fill="currentColor"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: skill.svgInner }}
              />
              {skill.name}
            </span>
          ))}
        </div>
        <p className="meta" style={{ marginTop: 14 }} data-build="box" />
      </section>

      <div className="rule" aria-hidden="true" />

      <section className="sec" id="projects" data-block>
        <h2 data-build="text">Ventures &amp; Systems</h2>
        <div className="grid" id="pj">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              className="card"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Explore"
              data-build="box"
            >
              <div className="cover">
                <img
                  src={project.cover}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card-content">
                <h3>{project.title}</h3>
                <DirectionalWords text={project.description} />
                <span className="code">Open link ↗</span>
              </div>
            </a>
          ))}
        </div>
        <div className="more-projects" data-build="box">
          <MagneticButton strength={0.8} maxDistance={100}>
            <a
              className="github-button"
              href="https://www.linkedin.com/in/geek-himanshujain"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
              <span>Connect on LinkedIn</span>
              <span className="github-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </MagneticButton>
        </div>
      </section>

      <div className="rule" aria-hidden="true" />

      <section className="sec" id="writings" data-block>
        <h2 data-build="text">Certifications</h2>
        <div id="wr">
          {WRITINGS.map((writing) => (
            <a
              key={writing.title}
              className="w"
              target="_blank"
              rel="noopener noreferrer"
              href={writing.href}
              data-cursor="Credential"
              data-build="box"
            >
              {writing.title} <span>{writing.date}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="rule" aria-hidden="true" />

      <section className="sec" id="gh" data-block>
        <h2 data-build="text">Engineering Cadence</h2>
        <div className="gh" id="ghs" ref={ghsRef} data-build="box">
          <div className="gg" id="gg" style={{ ['--cols' as string]: 53 }}>
            {GITHUB_CELLS.map((cell, idx) => (
              <i key={idx} data-level={cell.level} title={cell.title} />
            ))}
          </div>
        </div>
        <p className="meta" data-build="box">
          {' '}
          5+ years building scalable backend &amp; AI systems ·{' '}
          <a
            className="link"
            href="https://autoplaced.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            autoplaced.ai
          </a>
          .
        </p>
      </section>

      <div className="rule" aria-hidden="true" />
      <div className="rule" aria-hidden="true" />

      <section className="sec" id="quote" data-block>
        <p className="quote" data-build="text">
          “If you&apos;re building something interesting, exploring AI, or simply passionate about creating impactful products, I&apos;d love to connect! Let&apos;s build something meaningful together!”
        </p>
        <p className="meta" data-build="box">
          — Himanshu Jain · Koramangala, Bengaluru
        </p>
      </section>

      <div className="rule" aria-hidden="true" />

      <footer className="sec" id="footer" data-block>
        <div className="mark" data-build="text">
          Himanshu Jain
        </div>
        <p className="meta" data-build="box">
          Koramangala, Bengaluru · manshujain2020@gmail.com
        </p>
      </footer>
    </main>
  );
});

export default function App() {
  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const [built, setBuilt] = useState(false);

  const handleBuilt = useCallback(() => {
    setBuilt(true);
    document.documentElement.classList.add('bg-on');
  }, []);

  return (
    <>
      <AmbientBackground built={built} reducedMotion={reducedMotion} />
      <CustomCursor reducedMotion={reducedMotion} />
      <PortfolioFrame reducedMotion={reducedMotion} />
      <BuildSwarmEngine reducedMotion={reducedMotion} onBuilt={handleBuilt} />
    </>
  );
}
