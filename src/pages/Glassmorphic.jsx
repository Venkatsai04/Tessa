import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, Shield, Zap, Server, 
  Briefcase, Mail, Phone, MapPin, Linkedin, 
  Instagram, Facebook, ArrowUpRight, Globe, CheckCircle, Users, Hexagon,
  Search, Command
} from 'lucide-react';

// --- Animation Components ---

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: '800ms'
      }}
      className={`transition-all ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
        isVisible 
          ? "opacity-100 translate-y-0 filter blur-0" 
          : "opacity-0 translate-y-12 filter blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Visual Elements ---

const NoiseFilter = () => (
  <svg className="hidden">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="noise" />
      <feComposite operator="in" in2="SourceGraphic" result="composite" />
      <feBlend mode="overlay" in="composite" in2="SourceGraphic" />
    </filter>
  </svg>
);

const HeroBeams = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reduced column count for a bolder look (9 columns)
  const columns = 9;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#020202]">
       
       {/* The Columns Container */}
       <div className="absolute inset-0 flex items-end justify-center gap-[4px] opacity-90">
          {[...Array(columns)].map((_, i) => {
             // Calculate color gradient: Left (Orange) -> Center (Blue) -> Right (Cyan)
             let color = '#2B3990'; 
             
             if (i < 3) {
                 color = i % 2 === 0 ? '#F15A29' : '#C04622'; // Orange side
             } else if (i > 5) {
                 color = i % 2 === 0 ? '#27AAE1' : '#1D82AD'; // Cyan side
             } else {
                 color = '#2B3990'; // Deep Blue center
             }

             // V-SHAPE LOGIC:
             // Calculate distance from center (index 4)
             const centerIndex = Math.floor(columns / 2); // 4
             const distanceFromCenter = Math.abs(i - centerIndex);
             
             // Height increases as you move away from center
             const heightBase = 40; 
             const vShapeFactor = distanceFromCenter * 12; // Steeper V
             const height = heightBase + vShapeFactor;

             // Parallax effect based on index
             // Outer columns move faster/slower than inner ones
             const parallaxY = scrollY * (0.2 + (distanceFromCenter * 0.05));

             return (
               <div 
                 key={i}
                 className="flex-1 relative transition-transform duration-100 ease-out will-change-transform"
                 style={{ 
                   height: `${height}%`,
                   transform: `translateY(${parallaxY}px)`, 
                 }}
               >
                 {/* The Gradient Bar */}
                 <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                        background: `linear-gradient(to top, ${color} 0%, ${color} 40%, transparent 100%)`,
                        opacity: 0.85
                    }}
                 ></div>
                 
                 {/* Heavy Grain Texture Overlay */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
               </div>
             )
          })}
       </div>

       {/* Top Fade */}
       <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/80 to-transparent h-[70%] z-10"></div>
       
       {/* Bottom Fade */}
       <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020202] to-transparent z-10"></div>
    </div>
  );
};

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pt-6`}>
      <div className={`
        flex items-center justify-between px-8 py-3 transition-all duration-500
        ${isScrolled 
          ? "w-[90%] bg-[#0a0a0a]/80 backdrop-blur-xl rounded-full border border-white/10" 
          : "w-full max-w-[1400px] bg-transparent"
        }
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
           <img 
             src="tessa-group.png" 
             alt="Tessa Group" 
             className="h-8 w-auto object-contain opacity-100" 
           />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {["Home", "Features", "Resources", "Pricing"].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
            <button className="text-xs font-bold uppercase tracking-widest text-white hover:text-[#F15A29] transition-colors">
                Log in
            </button>
            <button className="px-5 py-2 bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                Start Free ↗
            </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white hover:text-[#F15A29] transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>

    {/* Mobile Menu */}
    <div className={`fixed inset-0 bg-[#020202] z-[60] transition-transform duration-500 cubic-bezier(0.87, 0, 0.13, 1) ${mobileOpen ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex justify-end p-8">
        <button onClick={() => setMobileOpen(false)} className="text-white hover:text-[#F15A29] hover:rotate-90 transition-all duration-300">
          <X className="w-8 h-8" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-[80vh] gap-8">
        {["Home", "Features", "Resources", "Pricing"].map((link, i) => (
          <a 
            key={link} 
            href={`#${link.toLowerCase()}`}
            onClick={() => setMobileOpen(false)}
            className="text-4xl font-bold text-white hover:text-[#F15A29] transition-colors tracking-tight"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden text-center bg-[#020202]">
      {/* Background Graphic Layer */}
      <HeroBeams />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-20 w-full flex flex-col items-center h-full justify-center mt-10">
        
        {/* Badge - RESTORED ORIGINAL */}
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 hover:bg-white/10 transition-colors cursor-default">
            
          </div>
        </Reveal>

        {/* Main Headline - RESTORED ORIGINAL BOLD */}
        <Reveal delay={100}>
          <h1 className="text-[12vw] md:text-[8.5vw] leading-[0.9] font-extrabold text-white tracking-[-0.03em] mb-8 drop-shadow-2xl">
            EMPOWERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B3990] via-[#27AAE1] to-[#F15A29] animate-gradient">
              WHAT'S NEXT.
            </span>
          </h1>
        </Reveal>

        {/* Subhead */}
        <Reveal delay={200}>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Connecting people, systems, and ideas to build a smarter future through adaptive infrastructure in <span className="text-white font-medium">Technology</span>, <span className="text-white font-medium">Security</span>, and <span className="text-white font-medium">Energy</span>.
          </p>
        </Reveal>

        {/* Buttons (Replacing Input) */}
        <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-6">
                <button className="px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                    Start a Project
                </button>
                <button className="px-8 py-4 bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all duration-300">
                    Explore Solutions
                </button>
            </div>
        </Reveal>

        {/* Trusted By */}
        <Reveal delay={500} className="mt-10">
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-widest opacity-60">Trusted by experts at</p>
            <div className="flex flex-wrap justify-center gap-12 items-center opacity-50 hover:opacity-100 transition-opacity duration-500">
                <span className="text-xl font-bold text-white tracking-tighter">Google</span>
                <span className="text-xl font-bold text-white tracking-tighter">Microsoft</span>
                <span className="text-xl font-bold text-white tracking-tighter">stripe</span>
                <span className="text-xl font-bold text-white tracking-tighter">amazon</span>
            </div>
        </Reveal>

      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="py-12 relative z-10 bg-[#020202] border-t border-white/5 overflow-hidden">
      <div className="relative flex whitespace-nowrap animate-marquee">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex items-center gap-20 mx-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500 cursor-default hover:opacity-80">
             <span className="text-2xl font-bold tracking-tighter text-white">CISCO</span>
             <span className="text-2xl font-bold tracking-tighter text-white">DELL</span>
             <span className="text-2xl font-bold tracking-tighter text-white">FORTINET</span>
             <span className="text-2xl font-bold tracking-tighter text-white">MICROSOFT</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Industries = () => {
  const cards = [
    { 
      title: "Tessa Tech", 
      icon: <Server className="w-6 h-6"/>,
      desc: "Advanced ICT infrastructure and cloud solutions.",
      accent: "group-hover:text-[#2B3990]"
    },
    { 
      title: "Tessa Sec", 
      icon: <Shield className="w-6 h-6"/>,
      desc: "Cybersecurity operations and threat intelligence.",
      accent: "group-hover:text-[#27AAE1]" 
    },
    { 
      title: "Tessa Energy", 
      icon: <Zap className="w-6 h-6"/>,
      desc: "Sustainable renewable energy infrastructure.",
      accent: "group-hover:text-[#F15A29]" 
    },
    { 
      title: "Solutions", 
      icon: <Globe className="w-6 h-6"/>,
      desc: "Strategic global consultancy and alliances.",
      accent: "group-hover:text-gray-400" 
    },
  ];

  return (
    <section id="companies" className="py-32 relative z-10 bg-[#020202]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="mb-20 border-b border-white/10 pb-10 flex flex-col md:flex-row justify-between items-end">
             <div>
                <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                Divisions of Excellence
                </h2>
                <p className="text-gray-400 font-light max-w-xl">
                Specialized units delivering world-class solutions across critical sectors.
                </p>
             </div>
             <button className="hidden md:block text-sm text-gray-400 hover:text-white border-b border-gray-600 hover:border-white transition-colors pb-1">
                 View All Companies
             </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {cards.map((card, idx) => (
             <Reveal key={idx} delay={idx * 100}>
                <div 
                  className="group relative h-[380px] p-8 flex flex-col justify-between
                  bg-[#121212] border border-white/5 
                  hover:bg-[#1a1a1a] transition-all duration-500 cursor-pointer hover:-translate-y-2"
                >
                   {/* Gradient Hover Effect */}
                   <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                   <div className="relative z-10">
                       <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500`}>
                           {card.icon}
                       </div>
                       <h3 className={`text-2xl font-medium text-white mb-3 ${card.accent} transition-colors`}>{card.title}</h3>
                       <p className="text-gray-500 text-sm leading-relaxed font-light border-l border-white/10 pl-4 group-hover:text-gray-300 transition-colors">
                           {card.desc}
                       </p>
                   </div>

                   <div className="relative z-10 flex justify-end">
                       <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-white/40 transition-all duration-300">
                           <ArrowUpRight className="w-4 h-4" />
                       </div>
                   </div>
                </div>
             </Reveal>
           ))}
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
    return (
        <section className="py-20 relative z-10 bg-[#020202]">
             <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="relative bg-[#0a0a0a] border border-white/5 text-white p-12 md:p-24 overflow-hidden rounded-3xl">
                    {/* Inner Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2B3990] opacity-20 blur-[150px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F15A29] opacity-10 blur-[150px] rounded-full"></div>
                    
                    {/* Texture */}
                    <div className="absolute inset-0 opacity-[0.2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end relative z-10">
                        <Reveal>
                            <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter mb-12">
                                Global <br/><span className="text-gray-600">Impact.</span>
                            </h2>
                            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
                                <div>
                                    <span className="block text-4xl md:text-5xl font-bold mb-2">18+</span>
                                    <span className="text-xs uppercase tracking-widest text-gray-500">Years Active</span>
                                </div>
                                <div>
                                    <span className="block text-4xl md:text-5xl font-bold mb-2">100+</span>
                                    <span className="text-xs uppercase tracking-widest text-gray-500">Global Experts</span>
                                </div>
                            </div>
                        </Reveal>
                        
                        <Reveal delay={200} className="lg:pl-20">
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
                                "We don't simply follow market trends. We engineer the infrastructure that defines the future of the region."
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="h-[1px] w-12 bg-white/30"></div>
                                <span className="text-sm font-bold uppercase tracking-widest text-[#F15A29]">Our Philosophy</span>
                            </div>
                        </Reveal>
                    </div>
                </div>
             </div>
        </section>
    );
};

const Leadership = () => {
    const leaders = [
        { name: "Ajri Shej", role: "Chairman", initials: "AS" },
        { name: "Dushko Temkov", role: "GM, Tech", initials: "DT" },
        { name: "Filip Simeonov", role: "GM, Sec", initials: "FS" },
        { name: "Bujar Ibrahimi", role: "GM, Sec (KS)", initials: "BI" },
        { name: "Ilir Shehu", role: "GM, Infosoft", initials: "IS" },
    ];

    return (
        <section id="leadership" className="py-32 relative z-10 bg-[#020202]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                 <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                         <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">Leadership</h2>
                         <button className="hidden md:block text-sm text-gray-400 font-bold uppercase tracking-widest border-b border-gray-700 pb-1 hover:text-[#F15A29] hover:border-[#F15A29] transition-colors">
                             View Organizational Chart
                         </button>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-white/5 border border-white/5">
                    {leaders.map((leader, idx) => (
                        <Reveal key={idx} delay={idx * 50} className="h-full">
                            <div className="group relative h-[300px] bg-[#050505] p-8 flex flex-col justify-between hover:bg-[#0f0f0f] transition-colors duration-300 cursor-default">
                                <div className="flex justify-between items-start">
                                    <span className="text-4xl font-light text-gray-700 group-hover:text-white transition-colors duration-500">0{idx + 1}</span>
                                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#F15A29]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">{leader.name}</h3>
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{leader.role}</p>
                                </div>
                                <div className="absolute inset-0 border-b-2 border-[#F15A29] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section className="py-32 relative z-10 bg-[#020202]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <Reveal>
                    <div className="bg-[#0f0f0f]/40 p-12 md:p-32 text-center border border-white/10 relative overflow-hidden rounded-3xl backdrop-blur-md">
                        {/* Grainy Texture */}
                        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                        
                        <h2 className="text-6xl md:text-9xl font-semibold text-white mb-8 tracking-tighter relative z-10">
                            LET'S TALK.
                        </h2>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative z-10 mt-12">
                            <button className="px-10 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-[#F15A29] hover:text-white transform transition-all duration-300 rounded-full">
                                Start a Project
                            </button>
                            <a href="mailto:info@tessa.group" className="text-sm font-bold uppercase tracking-widest text-white border-b border-white pb-1 hover:text-[#27AAE1] hover:border-[#27AAE1] transition-colors">
                                info@tessa.group
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-[#020202] text-white py-20 relative z-20 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-white/10 pb-20">
                    <div className="md:col-span-1">
                        <img 
                           src="tessa-group.png" 
                           alt="Tessa Group" 
                           className="h-10 w-auto object-contain mb-8 brightness-0 invert opacity-80" 
                        />
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A global leader in technology, security, and energy solutions operating across the Balkans and Europe.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Sitemap</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-400">
                            {['About', 'Leadership', 'Careers', 'News'].map(item => (
                                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-400">
                            {['Privacy', 'Terms', 'Cookies'].map(item => (
                                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Social</h4>
                        <div className="flex gap-4">
                            {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-400 hover:text-[#F15A29] transition-colors"><Icon className="w-5 h-5" /></a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
                    <p>© 2026 Tessa Group.</p>
                    <p>Skopje • Prishtina • Tirana</p>
                </div>
            </div>
        </footer>
    );
};

// --- Main App Component ---

function Glassmorphic() {
  return (
    <div className="font-sans antialiased bg-[#020202] text-white selection:bg-[#F15A29] selection:text-white min-h-screen relative overflow-x-hidden">
      <NoiseFilter />
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
        }

        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 40s linear infinite;
        }

        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient {
            background-size: 200% auto;
            animation: gradient 8s ease infinite;
        }
      `}} />
      
      <Navbar />
      <Hero />
      <Marquee />
      <Industries />
      <Impact />
      <Leadership />
      <Contact />
      <Footer />
    </div>
  );
}

export default Glassmorphic;