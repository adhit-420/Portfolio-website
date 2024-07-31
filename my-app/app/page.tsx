// app/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Section = 'home' | 'about' | 'projects' | 'contact';

const sections: Section[] = ['home', 'about', 'projects', 'contact'];

export default function Home() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollX;
      const windowWidth = window.innerWidth;
      const newActiveSection = sections[Math.floor(scrollPosition / windowWidth)] as Section;
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
        window.history.pushState(null, '', `/#${newActiveSection}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (section: Section) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
      {sections.map((section) => (
        <section
          key={section}
          id={section}
          className="w-screen h-screen flex-shrink-0 snap-start bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </h1>
          {/* Add your content for each section here */}
        </section>
      ))}
      
      <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`mx-2 text-sm font-medium transition-colors duration-200 ${
              activeSection === section
                ? 'text-blue-500 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </nav>
    </main>
  );
}

