import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Briefcase, FileText, Mail, User, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';

type Language = 'en' | 'es';

const translations = {
  en: {
    nav: {
      resume: 'Resume',
      research: 'Research',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      title: 'Carlos',
      lastName: 'Cardenas',
      subtitle: 'Data Analyst & Business Intelligence',
      taglines: [
        "Data-Driven Insights",
        "Exploring AI Interactions",
        "Building the Future"
      ],
      cta: 'View My Work'
    },
    sections: [
      {
        id: 'about',
        title: 'About',
        description: 'Discover my journey, philosophy, and the core values that drive my work.',
      },
      {
        id: 'work',
        title: 'Work',
        description: 'A curated selection of my most impactful projects and case studies.',
      },
      {
        id: 'research',
        title: 'Research',
        description: 'Deep dives into emerging technologies, AI interactions, and data behavior.',
      },
      {
        id: 'publications',
        title: 'Publications',
        description: 'Articles, papers, and thought leadership published across the web.',
      },
      {
        id: 'contact',
        title: 'Contact',
        description: 'Get in touch for collaborations, speaking engagements, or just to say hi.',
      }
    ],
    about: {
      title: 'About',
      p1: 'I am a Data Analyst and AI Researcher with over a decade of experience in crafting data-driven solutions that blend analytical rigor with actionable insights. My work focuses on the intersection of data science, human-computer interaction, and artificial intelligence.',
      p2: 'I believe in analytics as a tool for solving complex problems, creating intuitive models that empower decision-makers while maintaining a high standard of statistical excellence.'
    },
    work: {
      title: 'Work',
      items: [
        {
          title: 'AI Analytics System',
          description: 'A comprehensive analytics system built specifically for generative AI interfaces, focusing on transparency, user control, and seamless data integration.'
        },
        {
          title: 'Fintech Dashboard',
          description: 'A complete redesign of a major financial platform\'s reporting, improving user engagement by 40% and simplifying complex data visualization for everyday users.'
        }
      ]
    },
    research: {
      title: 'Research',
      p1: 'My research explores how users perceive and interact with data systems. I conduct qualitative and quantitative studies to understand trust, mental models, and the ethical implications of AI in everyday products.',
      list: [
        'Trust in Generative Models',
        'Mental Models of Machine Learning',
        'Ethical Data Patterns for AI'
      ]
    },
    publications: {
      title: 'Publications',
      items: [
        {
          title: 'Analyzing the AI Era',
          meta: 'Data Collective • 2023',
          description: 'An exploration of new analytical paradigms required when working with non-deterministic systems and generative models.'
        },
        {
          title: 'The Future of Data Interfaces',
          meta: 'Smashing Magazine • 2022',
          description: 'How conversational UI and generative AI are reshaping the way we think about data-driven interactions and user flows.'
        }
      ]
    },
    contact: {
      title: 'Contact',
      p1: 'I\'m always open to discussing data analytics work or partnership opportunities. Feel free to reach out.',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Failed to send message. Please try again.'
      }
    },
    footer: {
      rights: 'All rights reserved.'
    }
  },
  es: {
    nav: {
      resume: 'Currículum',
      research: 'Investigación',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      title: 'Carlos',
      lastName: 'Cárdenas',
      subtitle: 'Analista de Datos e Inteligencia de Negocios',
      taglines: [
        "Insights Basados en Datos",
        "Explorando Interacciones de IA",
        "Construyendo el Futuro"
      ],
      cta: 'Ver mi Trabajo'
    },
    sections: [
      {
        id: 'about',
        title: 'Sobre mí',
        description: 'Descubre mi trayectoria, filosofía y los valores fundamentales que impulsan mi trabajo.',
      },
      {
        id: 'work',
        title: 'Trabajo',
        description: 'Una selección curada de mis proyectos y casos de estudio más impactantes.',
      },
      {
        id: 'research',
        title: 'Investigación',
        description: 'Análisis profundos sobre tecnologías emergentes, interacciones de IA y comportamiento de datos.',
      },
      {
        id: 'publications',
        title: 'Publicaciones',
        description: 'Artículos, ensayos y liderazgo de opinión publicados en la web.',
      },
      {
        id: 'contact',
        title: 'Contacto',
        description: 'Ponte en contacto para colaboraciones, conferencias o simplemente para saludar.',
      }
    ],
    about: {
      title: 'Sobre mí',
      p1: 'Soy un Analista de Datos e Investigador de IA con más de una década de experiencia en la creación de soluciones basadas en datos que combinan el rigor analítico con insights accionables. Mi trabajo se centra en la intersección de la ciencia de datos, la interacción humano-computadora y la inteligencia artificial.',
      p2: 'Creo en la analítica como una herramienta para resolver problemas complejos, creando modelos intuitivos que empoderan a los tomadores de decisiones mientras se mantiene un alto estándar de excelencia estadística.'
    },
    work: {
      title: 'Trabajo',
      items: [
        {
          title: 'Sistema de Analítica de IA',
          description: 'Un sistema analítico integral construido específicamente para interfaces de IA generativa, centrado en la transparencia, el control del usuario y la integración fluida de datos.'
        },
        {
          title: 'Dashboard Fintech',
          description: 'Un rediseño completo de los reportes de una importante plataforma financiera, mejorando el engagement del usuario en un 40% y simplificando la visualización de datos complejos para usuarios cotidianos.'
        }
      ]
    },
    research: {
      title: 'Investigación',
      p1: 'Mi investigación explora cómo los usuarios perciben e interactúan con los sistemas de datos. Realizo estudios cualitativos y cuantitativos para comprender la confianza, los modelos mentales y las implicaciones éticas de la IA en los productos cotidianos.',
      list: [
        'Confianza en Modelos Generativos',
        'Modelos Mentales de Machine Learning',
        'Patrones Éticos de Datos para IA'
      ]
    },
    publications: {
      title: 'Publicaciones',
      items: [
        {
          title: 'Analizando la Era de la IA',
          meta: 'Data Collective • 2023',
          description: 'Una exploración de los nuevos paradigmas analíticos requeridos al trabajar con sistemas no deterministas y modelos generativos.'
        },
        {
          title: 'El Futuro de las Interfaces de Datos',
          meta: 'Smashing Magazine • 2022',
          description: 'Cómo la interfaz de usuario conversacional y la IA generativa están remodelando la forma en que pensamos sobre las interacciones basadas en datos y los flujos de usuarios.'
        }
      ]
    },
    contact: {
      title: 'Contacto',
      p1: 'Siempre estoy abierto a discutir trabajos de análisis de datos u oportunidades de asociación. No dudes en contactarme.',
      form: {
        name: 'Nombre',
        email: 'Correo Electrónico',
        message: 'Mensaje',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado con éxito!',
        error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
      }
    },
    footer: {
      rights: 'Todos los derechos reservados.'
    }
  }
};

const sectionIcons = [User, Briefcase, BookOpen, FileText, Mail];
const sectionImages = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=800&auto=format&fit=crop'
];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_fdk8qag',
        'template_cgqizew',
        {
          from_name: name,
          from_email: email,
          message: message,
          subject: name
        },
        'da_Y8OcdntwYjkMvJ'
      );
      
      setSubmitStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('app_language') as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
        setLang(savedLang);
      }
    } catch (e) {
      console.warn('localStorage not available', e);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    try {
      localStorage.setItem('app_language', newLang);
    } catch (e) {
      console.warn('localStorage not available', e);
    }
  };

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        e.preventDefault();
        const id = anchor.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-8 md:py-16">
      <main className="w-full max-w-5xl flex flex-col gap-16 md:gap-24">
        
        {/* Top Navigation */}
        <nav className="w-full flex justify-between items-center">
          <div className="font-display font-bold text-2xl tracking-tight text-brand-text">CC.</div>
          <div className="flex items-center gap-6 md:gap-8">
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
              <a href="#about" className="hover:text-brand-indigo transition-colors">{t.nav.resume}</a>
              <a href="#research" className="hover:text-brand-indigo transition-colors">{t.nav.research}</a>
              <a href="#work" className="hover:text-brand-indigo transition-colors">{t.nav.projects}</a>
              <a href="#contact" className="hover:text-brand-indigo transition-colors">{t.nav.contact}</a>
            </div>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-sm font-medium text-slate-700 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-indigo to-brand-purple blur-2xl opacity-40 animate-pulse" />
            <img 
              src="https://storage.googleapis.com/carlos-cardenas-data-analyst/carlos_blanco.png" 
              alt="Portrait" 
              className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl z-10"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-brand-text mb-2">
              {t.hero.title} <span className="text-gradient">{t.hero.lastName}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light mb-6 max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              {t.hero.taglines.map((tag, index) => (
                <div 
                  key={index}
                  className="relative group rounded-full p-[1px] bg-gradient-to-r from-brand-indigo/30 to-brand-purple/30 hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] hover:scale-[1.02] transition-all duration-200"
                >
                  <span className="block px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-sm font-medium text-slate-700">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
            
            <a 
              href="#sections-grid"
              className="group inline-flex items-center gap-2 px-9 py-3.5 bg-brand-blue text-white rounded-full font-medium transition-all duration-200 shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_12px_36px_rgb(37,99,235,0.4)] hover:scale-[1.02] hover:brightness-110"
            >
              {t.hero.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.section>

        {/* Bento Grid Sections */}
        <section id="sections-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-24">
          {t.sections.map((section, index) => {
            const Icon = sectionIcons[index];
            return (
              <motion.a
                href={`#${section.id}`}
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`group relative block overflow-hidden rounded-3xl glass-card transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] cursor-pointer ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                } ${index === 1 ? 'md:col-span-1 lg:col-span-1' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80 z-10" />
                <img 
                  src={sectionImages[index]} 
                  alt={section.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                <div className="relative z-20 h-full min-h-[300px] flex flex-col justify-end p-8 text-white">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 border border-white/30">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-white/80 font-light leading-relaxed max-w-md">
                    {section.description}
                  </p>
                  
                  <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </section>

        {/* Content Sections */}
        <div className="flex flex-col gap-16 md:gap-20 mt-8">
          <section id="about" className="scroll-mt-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-brand-text tracking-tight">{t.about.title}</h2>
            <div className="text-lg text-slate-600 leading-[1.7] max-w-3xl space-y-5">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </section>

          <section id="work" className="scroll-mt-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-brand-text tracking-tight">{t.work.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.work.items.map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-white/60 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:scale-[1.02]">
                  <h4 className="font-bold text-xl mb-3 text-brand-text tracking-tight">{item.title}</h4>
                  <p className="text-slate-600 leading-[1.7]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="research" className="scroll-mt-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-brand-text tracking-tight">{t.research.title}</h2>
            <div className="text-lg text-slate-600 leading-[1.7] max-w-3xl">
              <p className="mb-6">{t.research.p1}</p>
              <ul className="list-disc pl-5 space-y-3">
                {t.research.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="publications" className="scroll-mt-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-brand-text tracking-tight">{t.publications.title}</h2>
            <div className="space-y-6 max-w-3xl">
              {t.publications.items.map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-white/60 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:scale-[1.02]">
                  <h4 className="font-bold text-xl mb-1 text-brand-text tracking-tight">{item.title}</h4>
                  <p className="text-sm text-brand-indigo font-medium mb-3">{item.meta}</p>
                  <p className="text-slate-600 leading-[1.7]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-brand-text tracking-tight">{t.contact.title}</h2>
            <div className="max-w-xl">
              <p className="text-lg text-slate-600 mb-8 leading-[1.7]">{t.contact.p1}</p>
              <form className="flex flex-col gap-5" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder={t.contact.form.name} 
                    className="w-full px-6 py-4 rounded-xl border border-black/5 bg-white/50 hover:bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 transition-all duration-200 shadow-sm" 
                  />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t.contact.form.email} 
                    className="w-full px-6 py-4 rounded-xl border border-black/5 bg-white/50 hover:bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 transition-all duration-200 shadow-sm" 
                  />
                </div>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder={t.contact.form.message} 
                  rows={5} 
                  className="w-full px-6 py-4 rounded-xl border border-black/5 bg-white/50 hover:bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-indigo/20 transition-all duration-200 resize-none shadow-sm"
                ></textarea>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-2 self-start px-9 py-4 bg-brand-blue text-white rounded-xl font-medium transition-all duration-200 shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.4)] hover:scale-[1.02] hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
                </button>
                {submitStatus === 'success' && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-600 font-medium text-sm mt-2">
                    {t.contact.form.success}
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-600 font-medium text-sm mt-2">
                    {t.contact.form.error}
                  </motion.p>
                )}
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="w-full max-w-5xl mt-20 pt-8 border-t border-brand-grey/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500/70"
      >
        <p>© {new Date().getFullYear()} Carlos Cardenas. {t.footer.rights}</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-indigo transition-colors duration-200">Twitter</a>
          <a href="#" className="hover:text-brand-indigo transition-colors duration-200">LinkedIn</a>
          <a href="#" className="hover:text-brand-indigo transition-colors duration-200">Dribbble</a>
          <a href="#" className="hover:text-brand-indigo transition-colors duration-200">GitHub</a>
        </div>
      </motion.footer>
    </div>
  );
}
