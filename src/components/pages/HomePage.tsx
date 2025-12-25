// HPI 1.6-V
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Star, Clock, Shield } from 'lucide-react';

// --- Types & Interfaces ---

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

// --- Utility Components ---

/**
 * AnimatedReveal
 * Mandatory component for scroll-triggered reveals using IntersectionObserver.
 */
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
};

const AnimatedReveal: React.FC<AnimatedElementProps> = ({ 
  children, 
  className, 
  delay = 0,
  direction = 'up' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add a small delay via setTimeout if needed, or just let CSS handle transition-delay
        setTimeout(() => {
            element.classList.add('is-visible');
        }, delay * 1000);
        observer.unobserve(element);
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    switch(direction) {
      case 'up': return 'translate-y-12';
      case 'down': return '-translate-y-12';
      case 'left': return 'translate-x-12';
      case 'right': return '-translate-x-12';
      default: return '';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out opacity-0 ${getTransform()} ${className || ''}`}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

/**
 * ParallaxImage
 * A wrapper that applies a parallax effect to an image based on scroll.
 */
const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  aspectRatio?: string;
}> = ({ src, alt, className, speed = 0.1, aspectRatio = "aspect-[3/4]" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${aspectRatio} ${className || ''}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <Image
          src={src}
          alt={alt}
          width={800}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  // Canonical Data Sources
  const services: ServiceItem[] = [
    {
      title: 'Modern Filo',
      description: 'En yeni teknolojiye sahip uçaklarımızla güvenli yolculuk.',
      icon: Plane,
      image: "https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=service-fleet"
    },
    {
      title: 'Konforlu Koltuklar',
      description: 'Geniş ve rahat koltuklar ile keyifli bir deneyim.',
      icon: Star,
      image: "https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=service-seats"
    },
    {
      title: 'İkram Servisi',
      description: 'Özenle hazırlanmış yemek ve içecek seçenekleri.',
      icon: Clock,
      image: "https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=service-food"
    },
    {
      title: '7/24 Destek',
      description: 'Her an yanınızda olan müşteri hizmetleri ekibimiz.',
      icon: Shield,
      image: "https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=service-support"
    }
  ];

  // Scroll Progress for Global Line
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-primary font-paragraph selection:bg-pastelblue selection:text-primary overflow-clip">
      <Header />

      {/* Global Central Axis Line - Fixed Background Element */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center">
        <div className="w-px h-full bg-primary/5 relative">
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }} 
            className="absolute top-0 left-0 w-full h-full bg-primary/20"
          />
        </div>
      </div>

      <main className="relative z-10">
        
        {/* --- HERO SECTION --- 
            Replicating the structure of the inspiration image:
            - Central Axis
            - Staggered Images
            - Large Typography
        */}
        <section className="relative w-full min-h-[140vh] flex flex-col items-center pt-32 pb-20">
          
          {/* Sticky Title Container */}
          <div className="sticky top-32 z-20 text-center mix-blend-multiply pointer-events-none">
            <AnimatedReveal direction="up" delay={0.2}>
              <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85] text-primary">
                SKY
                <span className="block text-4xl md:text-6xl lg:text-7xl my-4 font-light italic font-paragraph">&</span>
                AIRLENS
              </h1>
            </AnimatedReveal>
            <AnimatedReveal direction="up" delay={0.4}>
              <p className="mt-8 text-lg md:text-xl tracking-widest uppercase text-softgraytext font-medium">
                Est. 2024 • Global Aviation
              </p>
            </AnimatedReveal>
          </div>

          {/* Image Grid - Absolute Positioning relative to the tall section to create the staggered layout */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="w-full max-w-[120rem] mx-auto h-full relative px-6">
              
              {/* Top Left Image */}
              <div className="absolute top-[15%] left-6 md:left-12 w-[40vw] md:w-[25vw] max-w-md z-10">
                <AnimatedReveal direction="left" delay={0.5}>
                  <ParallaxImage 
                    src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hero-left-plane"
                    alt="Cabin Interior"
                    aspectRatio="aspect-[3/4]"
                    speed={0.2}
                  />
                </AnimatedReveal>
              </div>

              {/* Middle Right Image */}
              <div className="absolute top-[45%] right-6 md:right-12 w-[45vw] md:w-[30vw] max-w-lg z-10">
                <AnimatedReveal direction="right" delay={0.7}>
                  <ParallaxImage 
                    src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hero-right-cockpit"
                    alt="Cockpit View"
                    aspectRatio="aspect-square"
                    speed={0.15}
                  />
                </AnimatedReveal>
              </div>

              {/* Bottom Left Image (New addition for balance) */}
              <div className="absolute top-[80%] left-[15%] w-[35vw] md:w-[20vw] max-w-sm z-10">
                <AnimatedReveal direction="up" delay={0.9}>
                  <ParallaxImage 
                    src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hero-bottom-cloud"
                    alt="Sky View"
                    aspectRatio="aspect-[4/5]"
                    speed={0.25}
                  />
                </AnimatedReveal>
              </div>

            </div>
          </div>
        </section>


        {/* --- MANIFESTO / ABOUT SECTION --- 
            "Vertical Sticky" Layout
        */}
        <section className="relative w-full bg-pastelblue/30 py-32 border-t border-primary/10">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Sticky Sidebar */}
              <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                  <AnimatedReveal>
                    <span className="block text-xs font-bold tracking-[0.2em] uppercase text-softgraytext mb-4">
                      01 — Vizyonumuz
                    </span>
                    <h2 className="font-heading text-5xl lg:text-6xl text-primary leading-tight">
                      Gökyüzünde <br/>
                      <span className="italic text-secondary-foreground/70">Yeni Bir</span> <br/>
                      Standart.
                    </h2>
                    <div className="w-12 h-px bg-primary mt-8"></div>
                  </AnimatedReveal>
                </div>
              </div>

              {/* Scrolling Content */}
              <div className="lg:col-span-8 space-y-24">
                <AnimatedReveal className="max-w-3xl">
                  <p className="font-paragraph text-2xl lg:text-3xl leading-relaxed text-primary/90">
                    Sky Airlens, modern havacılık standartlarını en üst seviyede tutarak yolcularına konforlu ve güvenli bir yolculuk deneyimi sunmaktadır.
                  </p>
                </AnimatedReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <AnimatedReveal delay={0.2}>
                    <div className="aspect-[4/5] overflow-hidden rounded-sm">
                      <Image 
                        src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=about-detail-1"
                        alt="Service Detail"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        width={600}
                      />
                    </div>
                  </AnimatedReveal>
                  <div className="space-y-8">
                    <AnimatedReveal delay={0.4}>
                      <p className="text-lg text-softgraytext leading-loose">
                        Deneyimli pilotlarımız ve son teknoloji uçaklarımızla, her uçuşta mükemmelliği hedefliyoruz. Geniş rota ağımız ile dünyanın dört bir yanına ulaşmanızı sağlıyor, her yolculuğunuzda unutulmaz anılar biriktirmenize yardımcı oluyoruz.
                      </p>
                    </AnimatedReveal>
                    <AnimatedReveal delay={0.6}>
                      <div className="flex items-center gap-4 text-primary font-medium group cursor-pointer">
                        <span className="uppercase tracking-widest text-sm">Hikayemizi Oku</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                      </div>
                    </AnimatedReveal>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* --- SERVICES SECTION --- 
            "Magazine Flow" - Alternating Layout with Parallax
        */}
        <section className="w-full py-32 bg-background relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-creamhighlight/50 -z-10"></div>
          
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12 mb-24">
            <AnimatedReveal className="text-center max-w-2xl mx-auto">
              <span className="block text-xs font-bold tracking-[0.2em] uppercase text-softgraytext mb-4">
                02 — Hizmetlerimiz
              </span>
              <h2 className="font-heading text-4xl lg:text-6xl text-primary">
                Ayrıcalıklı Bir Deneyim
              </h2>
            </AnimatedReveal>
          </div>

          <div className="max-w-[100rem] mx-auto px-6 lg:px-12 space-y-32">
            {services.map((service, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <AnimatedReveal direction={index % 2 === 0 ? 'left' : 'right'}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-secondary/20 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                      <div className="relative aspect-[16/10] overflow-hidden border border-primary/10 bg-white">
                        <Image 
                          src={service.image}
                          alt={service.title}
                          width={800}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </AnimatedReveal>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <AnimatedReveal delay={0.2}>
                    <div className="flex items-center gap-4 mb-6 text-secondary">
                      <service.icon className="w-8 h-8" strokeWidth={1.5} />
                      <div className="h-px w-12 bg-secondary/50"></div>
                    </div>
                    <h3 className="font-heading text-3xl lg:text-4xl text-primary mb-6">
                      {service.title}
                    </h3>
                    <p className="font-paragraph text-lg lg:text-xl text-softgraytext leading-relaxed mb-8 max-w-md">
                      {service.description}
                    </p>
                    <Link to="/flights" className="inline-flex items-center text-sm uppercase tracking-widest border-b border-primary/30 pb-1 hover:border-primary transition-colors">
                      Detaylı Bilgi
                    </Link>
                  </AnimatedReveal>
                </div>

              </div>
            ))}
          </div>
        </section>


        {/* --- CINEMATIC CTA SECTION --- 
            Full bleed parallax background
        */}
        <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax */}
          <div className="absolute inset-0 z-0">
            <ParallaxImage 
              src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=cta-sky-view"
              alt="Sky View"
              aspectRatio="h-full"
              className="h-full w-full"
              speed={0.1}
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <AnimatedReveal direction="up">
              <h2 className="font-heading text-5xl lg:text-8xl text-white mb-8 drop-shadow-lg">
                Dünyayı Keşfet
              </h2>
            </AnimatedReveal>
            
            <AnimatedReveal direction="up" delay={0.2}>
              <p className="font-paragraph text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Geniş destinasyon ağımız ve uygun fiyatlarımızla hayalinizdeki yolculuğa çıkın.
              </p>
            </AnimatedReveal>

            <AnimatedReveal direction="up" delay={0.4}>
              <Link 
                to="/flights"
                className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-medium text-primary bg-white shadow-2xl transition duration-300 ease-out hover:w-full"
              >
                <span className="absolute inset-0 w-full h-full bg-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-3 font-heading text-lg tracking-wide">
                  Uçuşları Görüntüle
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </AnimatedReveal>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}