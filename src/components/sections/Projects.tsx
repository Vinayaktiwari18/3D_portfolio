// src/components/sections/Projects.tsx
'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';

type Project = {
  number: string;
  title: string;
  tags: string[];
  github: string;
  description: string;
};

const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'AI Slop Detector',
    tags: ['Python', 'NLP', 'AI API'],
    github: 'https://github.com/Vinayaktiwari18/AI-slop-detector',
    description: 'Detects AI-generated content using NLP to analyze patterns and statistical markers.',
  },
  {
    number: '02',
    title: 'Resume Forge',
    tags: ['JavaScript', 'HTML/CSS', 'AI API'],
    github: 'https://github.com/Vinayaktiwari18/RESUME-forge',
    description: 'Analyzes job descriptions and generates tailored professional resumes using AI.',
  },
  {
    number: '03',
    title: 'StyleSense AI',
    tags: ['Python', 'Computer Vision', 'AI API'],
    github: 'https://github.com/Vinayaktiwari18/stylesense-AI',
    description: 'Computer vision analyzes style and suggests personalized outfit recommendations.',
  },
  {
    number: '04',
    title: 'Emotion Music System',
    tags: ['Python', 'Emotion AI', 'Music API'],
    github: 'https://github.com/Vinayaktiwari18/emotion-music',
    description: 'Detects emotional state via facial analysis, suggests matching music dynamically.',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  const onGithubEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.borderColor = 'var(--black)';
    e.currentTarget.style.background = 'var(--black)';
    e.currentTarget.style.color = '#fff';
  };
  const onGithubLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)';
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = 'var(--black)';
  };
  const onExplainEnter = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = 'var(--cyan)';
    e.currentTarget.style.color = '#fff';
  };
  const onExplainLeave = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = 'var(--cyan)';
  };

  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '4px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-6px) rotateX(2deg)' : 'translateY(0) rotateX(0)',
        transition: `transform 0.3s ease, box-shadow 0.3s ease`,
        transitionDelay: `${index * 100}ms`,
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: 'var(--orange)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.3s ease',
        }}
      />

      <span
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '11px',
          color: 'var(--orange)',
          letterSpacing: '0.1em',
          display: 'block',
          marginBottom: '12px',
        }}
      >
        {project.number}
      </span>

      <h3
        style={{
          fontFamily: 'Teko, sans-serif',
          fontSize: '28px',
          color: 'var(--black)',
          margin: '0 0 14px',
          letterSpacing: '0.02em',
          lineHeight: 1,
        }}
      >
        {project.title}
      </h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.06em',
              padding: '3px 10px',
              background: 'rgba(255,106,0,0.07)',
              color: 'var(--orange)',
              borderRadius: '2px',
              border: '1px solid rgba(255,106,0,0.15)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <p
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '14px',
          color: 'var(--gray)',
          lineHeight: 1.7,
          margin: '0 0 24px',
        }}
      >
        {project.description}
      </p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <a href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={onGithubEnter}
          onMouseLeave={onGithubLeave}
          style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '8px 18px',
            background: 'transparent',
            color: 'var(--black)',
            border: '1.5px solid rgba(0,0,0,0.15)',
            borderRadius: '2px',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ↗ GitHub
        </a>

        <button
          onClick={() => setExpanded((p) => !p)}
          onMouseEnter={onExplainEnter}
          onMouseLeave={onExplainLeave}
          style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '8px 18px',
            background: 'transparent',
            color: 'var(--cyan)',
            border: '1.5px solid var(--cyan)',
            borderRadius: '2px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {expanded ? 'Less ↑' : 'Explain ↓'}
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: '116px 80px', maxWidth: '1280px', margin: '0 auto' }}
    >
      <SectionLabel text="// 02 — Work" color="orange" />
      <h2
        className="reveal"
        style={{
          fontFamily: 'Teko, sans-serif',
          fontSize: 'clamp(42px, 6vw, 63px)',
          color: 'var(--black)',
          margin: '0 0 8px',
          letterSpacing: '0.02em',
          lineHeight: 1,
        }}
      >
        PROJECTS
      </h2>
      <p
        className="reveal"
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '16px',
          color: 'var(--gray)',
          margin: '0 0 56px',
          lineHeight: 1.6,
        }}
      >
        Real problems. Real solutions. Built from scratch.
      </p>
      <div
        className="projects-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}