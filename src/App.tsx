import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Briefcase, FileText, Mail, User, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';

type Language = 'en' | 'es';

const translations = {
  en: {
    nav: {
      resume: 'Resume',
      research: 'Education',
      projects: 'Experience',
      contact: 'Contact',
    },
    hero: {
      title: 'Carlos',
      lastName: 'Cardenas',
      subtitle: 'Data Analyst & Business Intelligence',
      taglines: [
        "Data-Driven Insights",
        "Strategic Storytelling",
        "Automated Efficiency"
      ],
      cta: 'Explore my Professional Journey'
    },
    sections: [
      {
        id: 'about',
        title: 'About',
        description: 'An overview of my analytical mindset and core values.',
      },
      {
        id: 'experience',
        title: 'Experience',
        description: 'A professional timeline of my roles and career growth.',
      },
      {
        id: 'education',
        title: 'Education',
        description: 'My academic foundation, certifications and commitment to continuous learning.',
      },
      {
        id: 'expertise_skills',
        title: 'Expertise & Skills',
        description: 'A quick look at my technical tools and core expertise.',
      },
      {
        id: 'contact',
        title: 'Contact',
        description: 'Let´s connect. Open to new opportunities and data projects',
      }
    ],
    about: {
      title: 'About',
      p1: 'Data Analyst dedicated to transforming raw data into strategic storytelling and automated efficiency. My focus is on uncovering hidden patterns that drive smarter, faster business decisions.',
      p2: 'I believe in the power of data-driven insights to solve complex problems, creating scalable solutions that bridge the gap between technical analysis and executive action.'
    },
    work: {
      title: 'Experience',
      items: [
        {
          title: 'DHL GLOBAL FORWARDING (GSC)',
          meta: 'Associate Control Tower | November 2024 - December 2025',
          description: 'Focused on end-to-end monitoring and validation of maritime shipment data to ensure total integrity from origin to destination. Responsible for consolidating and verifying information across CargoWise and internal systems, while cleaning datasets to maintain high-quality standards. Expertly tracks logistics KPIs through Excel and Power BI, generating strategic operational reports to proactively identify process inconsistencies and mitigate delays.'
        },
        {
          title: 'KASAN GLOBAL',
          meta: 'Online Store Management (Dropshipping) | January 2024 - January 2025',
          description: 'Optimizes Shopify digital catalogs and manages strategic product selection by analyzing market trends via Dropi. Responsible for data-driven inventory integration and refining product descriptions to align store content with real-time demand and operational requirements.'
        },
        {
          title: 'JAKE DOMICILIOS URBANOS',
          meta: 'Marketing Assistant',
          description: 'Monitors digital campaigns and commercial partnerships by analyzing performance metrics to identify content and segmentation optimization opportunities. Coordinates the delivery of digital assets across multiple channels, ensuring precise execution and strategic alignment with campaign objectives.'
        }
      ]
    },
    research: {
      title: 'Education',
      p1: 'Marketing and International Business professional transitioning into Big Data and Analytics, transforming complex information into actionable intelligence.',
      list: [
        'Universidad Compensar,  Postgraduate Specialization in Big Data -  “ In progress ”',
        'Universidad de la Sabana , Diplomado Big Data & Business Analytics  Agu-Nov 2024',
        'Australian Pacific College, Certificate IV in Marketing and Communication, Dec 2022 - NOV 2023, Australia, Brisbane',
        'Universidad Sergio Arboleda, Bachelors Degree in Marketing and International Business 2017-2022'
      ]
    },
    publications: {
      title: 'Expertise & Skills',
      items: [
        {
          title: 'Excel',
          description: 'Advanced, including Power Query, Power Pivot, data modeling, dynamic dashboards, advanced formulas, and basic macro automation.'
        },
        {
          title: 'Power BI',
          description: 'Solid knowledge in report creation, data sourcing, transformation and cleaning, relationship modeling, DAX calculations, visual design, and Power BI Service for publishing and sharing dashboards.'
        },
        {
          title: 'SQL',
          description: 'Solid SQL skills for querying, cleaning, transforming, and analyzing data across relational databases, with experience in joins, aggregations, subqueries.'
        },
        {
          title: 'Python',
          description: 'Practical experience with Python for data analysis, using libraries such as Pandas, NumPy, and Matplotlib, along with a clear understanding of mutability, environments, and Jupyter workflows'
        },
        {
          title: 'AI Tools',
          description: 'I regularly leverage AI tools such as Gemini and Copilot to support content creation, idea generation, problem‑solving, and productivity across both Microsoft and Google ecosystems. For research and reliable sources, I use Perplexity, and for creating personalized avatars, I work with HeyGen.'
        },
        {
          title: 'Cloud & Storage Basics',
          description: 'Working knowledge of cloud environments such as Google Cloud, Azure, and AWS for storage, hosting, and data access workflows.'
        }
      ]
    },
    contact: {
      title: 'Contact',
      p1: 'I’m open to new opportunities in data analytics. Feel free to contact me',
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
      resume: 'Perfil',
      research: 'Educación',
      projects: 'Experiencia',
      contact: 'Contacto',
    },
    hero: {
      title: 'Carlos',
      lastName: 'Cárdenas',
      subtitle: 'Analista de Datos e Inteligencia de Negocios',
      taglines: [
        "Insights Basados en Datos",
        "Storytelling Estratégico",
        "Eficiencia Automatizada"
      ],
      cta: 'Explora mi Trayectoria Profesional'
    },
    sections: [
      {
        id: 'about',
        title: 'Sobre mí',
        description: 'Una visión general de mi mentalidad analítica y valores fundamentales.',
      },
      {
        id: 'experience',
        title: 'Experiencia',
        description: 'Una línea de tiempo profesional de mis roles y crecimiento profesional.',
      },
      {
        id: 'education',
        title: 'Educación',
        description: 'Mi base académica, certificaciones y compromiso con el aprendizaje continuo.',
      },
      {
        id: 'expertise_skills',
        title: 'Experiencia y Habilidades',
        description: 'Un vistazo rápido a mis herramientas técnicas y experiencia principal.',
      },
      {
        id: 'contact',
        title: 'Contacto',
        description: 'Conectemos. Abierto a nuevas oportunidades y proyectos de datos.',
      }
    ],
    about: {
      title: 'Sobre mí',
      p1: 'Analista de Datos dedicado a transformar datos en storytelling estratégico y eficiencia automatizada. Mi enfoque está en descubrir patrones ocultos que impulsan decisiones comerciales más inteligentes y rápidas.',
      p2: 'Creo en el poder de los insights basados en datos para resolver problemas complejos, creando soluciones escalables que cierran la brecha entre el análisis técnico y la acción ejecutiva.'
    },
    work: {
      title: 'Experiencia',
      items: [
        {
          title: 'DHL GLOBAL FORWARDING (GSC)',
          meta: 'Associate Control Tower | Noviembre 2024 - Diciembre 2025',
          description: 'Enfocado en el monitoreo y validación de extremo a extremo de datos de envíos marítimos para garantizar la integridad total desde el origen hasta el destino. Responsable de consolidar y verificar información a través de CargoWise y sistemas internos, mientras se limpian conjuntos de datos para mantener altos estándares de calidad. Realiza un seguimiento experto de los KPI logísticos a través de Excel y Power BI, generando informes operativos estratégicos para identificar proactivamente inconsistencias en los procesos y mitigar retrasos.'
        },
        {
          title: 'KASAN GLOBAL',
          meta: 'Gestión de Tienda Online (Dropshipping) | Enero 2024 - Enero 2025',
          description: 'Optimiza catálogos digitales de Shopify y gestiona la selección estratégica de productos mediante el análisis de tendencias del mercado a través de Dropi. Responsable de la integración de inventario basada en datos y de refinar las descripciones de productos para alinear el contenido de la tienda con la demanda en tiempo real y los requisitos operativos.'
        },
        {
          title: 'JAKE DOMICILIOS URBANOS',
          meta: 'Asistente de Marketing',
          description: 'Monitorea campañas digitales y asociaciones comerciales mediante el análisis de métricas de rendimiento para identificar oportunidades de optimización de contenido y segmentación. Coordina la entrega de activos digitales a través de múltiples canales, asegurando una ejecución precisa y una alineación estratégica con los objetivos de la campaña.'
        }
      ]
    },
    research: {
      title: 'Educación',
      p1: 'Profesional en Marketing y Negocios Internacionales en transición hacia Big Data y Analítica, transformando información compleja en inteligencia accionable.',
      list: [
        'Universidad Compensar, Especialización en Big Data - "En curso"',
        'Universidad de la Sabana, Diplomado en Big Data & Business Analytics, Ago-Nov 2024',
        'Australian Pacific College, Certificado IV en Marketing y Comunicación, Dic 2022 - Nov 2023, Australia, Brisbane',
        'Universidad Sergio Arboleda, Profesional en Marketing y Negocios Internacionales 2017-2022'
      ]
    },
    publications: {
      title: 'Experiencia y Habilidades',
      items: [
        {
          title: 'Excel',
          description: 'Avanzado, incluyendo Power Query, Power Pivot, modelado de datos, tableros dinámicos, fórmulas avanzadas y automatización básica con macros.'
        },
        {
          title: 'Power BI',
          description: 'Conocimiento sólido en la creación de informes, obtención de datos, transformación y limpieza, modelado de relaciones, cálculos DAX, diseño visual y Power BI Service para publicar y compartir tableros.'
        },
        {
          title: 'SQL',
          description: 'Sólidas habilidades en SQL para consultar, limpiar, transformar y analizar datos en bases de datos relacionales, con experiencia en joins, agregaciones y subconsultas.'
        },
        {
          title: 'Python',
          description: 'Experiencia práctica con Python para análisis de datos, utilizando bibliotecas como Pandas, NumPy y Matplotlib, junto con una clara comprensión de la mutabilidad, entornos y flujos de trabajo de Jupyter.'
        },
        {
          title: 'Herramientas de IA',
          description: 'Aprovecho regularmente herramientas de IA como Gemini y Copilot para apoyar la creación de contenido, generación de ideas, resolución de problemas y productividad en los ecosistemas de Microsoft y Google. Para investigación y fuentes confiables utilizo Perplexity, y para crear avatares personalizados trabajo con HeyGen.'
        },
        {
          title: 'Conceptos Básicos de Nube y Almacenamiento',
          description: 'Conocimiento práctico de entornos en la nube como Google Cloud, Azure y AWS para flujos de trabajo de almacenamiento, alojamiento y acceso a datos.'
        }
      ]
    },
    contact: {
      title: 'Contacto',
      p1: 'Estoy abierto a nuevas oportunidades en análisis de datos. No dudes en contactarme.',
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
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop',
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
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
              <a href="#about" className="hover:text-cyan-400 transition-colors">{t.nav.resume}</a>
              <a href="#experience" className="hover:text-cyan-400 transition-colors">{t.nav.projects}</a>
              <a href="#education" className="hover:text-cyan-400 transition-colors">{t.nav.research}</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">{t.nav.contact}</a>
            </div>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-300 transition-colors"
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 blur-2xl opacity-40 animate-pulse" />
            <img 
              src="https://storage.googleapis.com/carlos-cardenas-data-analyst/carlos_blanco.png" 
              alt="Portrait" 
              className="relative w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-2xl z-10"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-brand-text mb-2">
              {t.hero.title} <span className="text-gradient">{t.hero.lastName}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light mb-6 max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              {t.hero.taglines.map((tag, index) => (
                <div 
                  key={index}
                  className="relative group rounded-full p-[1px] bg-gradient-to-r from-blue-600/30 to-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-[1.02] transition-all duration-200"
                >
                  <span className="block px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-sm font-medium text-slate-300">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
            
            <a 
              href="#sections-grid"
              className="group inline-flex items-center gap-2 px-9 py-3.5 bg-blue-600 text-slate-50 rounded-full font-medium transition-all duration-200 shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_12px_36px_rgb(37,99,235,0.4)] hover:scale-[1.02] hover:brightness-110"
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
                className={`group relative block overflow-hidden rounded-3xl glass-card transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(34,211,238,0.1)] cursor-pointer ${
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
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/50 backdrop-blur-md flex items-center justify-center mb-6 border border-slate-700">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-slate-300 font-light leading-relaxed max-w-md">
                    {section.description}
                  </p>
                  
                  <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur-md flex items-center justify-center border border-slate-700 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
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
            <div className="text-lg text-slate-400 leading-[1.7] max-w-3xl space-y-5">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </section>

          <section id="experience" className="scroll-mt-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-brand-text tracking-tight">{t.work.title}</h2>
            <div className="space-y-6 max-w-3xl">
              {t.work.items.map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-900/30 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:scale-[1.02]">
                  <h4 className="font-bold text-xl mb-1 text-brand-text tracking-tight">{item.title}</h4>
                  <p className="text-sm text-cyan-400 font-medium mb-3">{item.meta}</p>
                  <p className="text-slate-400 leading-[1.7]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="expertise_skills" className="scroll-mt-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-brand-text tracking-tight">{t.publications.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.publications.items.map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-900/30 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:scale-[1.02]">
                  <h4 className="font-bold text-xl mb-3 text-brand-text tracking-tight">{item.title}</h4>
                  <p className="text-slate-400 leading-[1.7]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="education" className="scroll-mt-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-brand-text tracking-tight">{t.research.title}</h2>
            <div className="text-lg text-slate-400 leading-[1.7] max-w-3xl">
              <p className="mb-6">{t.research.p1}</p>
              <ul className="list-disc pl-5 space-y-3">
                {t.research.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-brand-text tracking-tight">{t.contact.title}</h2>
            <div className="max-w-xl">
              <p className="text-lg text-slate-400 mb-8 leading-[1.7]">{t.contact.p1}</p>
              <form className="flex flex-col gap-5" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder={t.contact.form.name} 
                    className="w-full px-6 py-4 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 shadow-sm" 
                  />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t.contact.form.email} 
                    className="w-full px-6 py-4 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 shadow-sm" 
                  />
                </div>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder={t.contact.form.message} 
                  rows={5} 
                  className="w-full px-6 py-4 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 resize-none shadow-sm"
                ></textarea>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-2 self-start px-9 py-4 bg-blue-600 text-slate-50 rounded-xl font-medium transition-all duration-200 shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.4)] hover:scale-[1.02] hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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
        className="w-full max-w-5xl mt-20 pt-8 border-t border-brand-grey/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400/70"
      >
        <p>© {new Date().getFullYear()} Carlos Cardenas. {t.footer.rights}</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-cyan-400 transition-colors duration-200">Twitter</a>
          <a href="#" className="hover:text-cyan-400 transition-colors duration-200">LinkedIn</a>
          <a href="#" className="hover:text-cyan-400 transition-colors duration-200">Dribbble</a>
          <a href="#" className="hover:text-cyan-400 transition-colors duration-200">GitHub</a>
        </div>
      </motion.footer>
    </div>
  );
}
