import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Anchor, Waves, BookOpen, Compass, MousePointer2, ShoppingBag, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const MOBY_DICK_TEXT = `Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can.`;

const FONTS = ["font-sans", "font-serif", "font-mono"];

interface InteractiveWordProps {
  word: string;
  key?: string | number;
}

function InteractiveWord({ word }: InteractiveWordProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [fontIndex, setFontIndex] = useState(1); // Default to serif

  const handleHover = () => {
    setIsHovered(true);
    setFontIndex(Math.floor(Math.random() * FONTS.length));
  };

  return (
    <motion.span
      className={`inline-block mr-3 mb-2 cursor-pointer transition-all duration-300 ${FONTS[fontIndex]}`}
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.4 : 1,
        rotate: isHovered ? 5 : 0,
        color: isHovered ? "#FF6600" : "#FFFFFF",
        fontWeight: isHovered ? 900 : 400,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }}
    >
      {word}
    </motion.span>
  );
}

const FEATURED_BOOKS = [
  {
    title: "The Three Musketeers",
    author: "Alexandre Dumas",
    price: "$18.99",
    color: "#FF6600",
    theme: "dark"
  },
  {
    title: "Journey to the Center of the Earth",
    author: "Jules Verne",
    price: "$16.50",
    color: "#4169E1",
    theme: "light"
  }
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const springX = useSpring(0, { stiffness: 100, damping: 20 });
  const springY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const whaleX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);
  const whaleY = useTransform(scrollYProgress, [0, 0.5, 1], ["20%", "50%", "80%"]);
  const whaleRotate = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 1]);

  return (
    <div ref={containerRef} className="min-h-[300vh] font-sans selection:bg-[#FF6600] selection:text-white relative body-text">
      {/* Dynamic Background */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,_#001133_0%,_#000511_100%)]"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-widest uppercase font-bold">Penguin</span>
          </div>
          <div className="w-[1px] h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-widest uppercase font-bold">Monotype.</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Floating Whale */}
      <motion.div
        style={{ x: whaleX, y: whaleY, rotate: whaleRotate }}
        className="absolute top-0 left-0 pointer-events-none z-10 opacity-20 mix-blend-screen"
      >
        <img
          src="https://picsum.photos/seed/whale-3d/1200/600"
          alt="The Great White Whale"
          className="w-[50vw] h-auto filter grayscale brightness-200 contrast-125"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="text-center"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "1em" }}
            whileInView={{ opacity: 0.6, letterSpacing: "0.5em" }}
            className="font-mono text-[10px] uppercase mb-6 block"
          >
            A Digital Voyage into the Abyss
          </motion.span>
          <h1 
            className="glitch-text font-serif text-[18vw] md:text-[14vw] font-black leading-[0.8] uppercase tracking-tighter"
            data-text="MOBY DICK"
          >
            MOBY DICK
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ delay: 0.5 }}
            className="font-serif italic text-3xl md:text-5xl mt-6 text-[#FFC1B0]"
          >
            The Great White Whale
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ delay: 0.7 }}
            className="font-mono text-sm md:text-base uppercase tracking-[0.5em] mt-8 text-white/60"
          >
            By Herman Melville
          </motion.p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute bottom-12 flex flex-col items-center gap-3 opacity-30"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll to Submerge</span>
          <Waves className="w-5 h-5 text-[#4169E1]" />
        </motion.div>
      </section>

      {/* Campaign Section: Raised by Pages, Pulled by Screens */}
      <section className="min-h-screen bg-[#FF6600] text-white flex flex-col justify-center items-center px-6 py-32 relative z-30 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <h2 className="font-sans text-6xl md:text-8xl font-black leading-none tracking-tighter mb-12">
            Raised by Pages,<br />Pulled by Screens
          </h2>
          <div className="relative h-96 w-full flex justify-center items-center">
            {/* Abstract Book/Screen Visual */}
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="w-64 h-80 bg-white/10 border-2 border-white/30 rounded-lg relative flex items-center justify-center"
            >
              <div className="absolute inset-4 border border-white/20 rounded flex flex-col gap-2 p-4">
                <div className="h-2 w-full bg-white/20 rounded" />
                <div className="h-2 w-3/4 bg-white/20 rounded" />
                <div className="h-2 w-full bg-white/20 rounded" />
                <div className="h-2 w-1/2 bg-white/20 rounded" />
              </div>
              <motion.div 
                animate={{ y: [-20, 20, -20] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="text-4xl font-serif italic"
              >
                Adventure
              </motion.div>
            </motion.div>
            
            {/* Floating Letters */}
            {['A', 'B', 'V', 'U', 'S', 'R'].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                animate={{ 
                  y: [0, Math.random() * -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  rotate: [0, Math.random() * 360]
                }}
                transition={{ repeat: Infinity, duration: 3 + i }}
                className="absolute font-serif text-4xl font-bold"
                style={{ 
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 10}%`
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <p className="font-mono text-sm uppercase tracking-[0.3em] mt-12 opacity-80">
            A Collaboration between Penguin & Monotype
          </p>
        </motion.div>
      </section>

      {/* Chapter Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-40 relative z-20">
        <div className="max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <div className="flex items-center gap-6 mb-6">
              <span className="font-mono text-xs border border-white/30 px-3 py-1.5 rounded-full">CHAPTER 01</span>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            <h2 className="font-serif text-8xl md:text-[12rem] font-black italic tracking-tighter leading-none text-[#FFC1B0]">Loomings</h2>
          </motion.div>

          <div className="font-serif text-2xl md:text-4xl leading-[2] tracking-wide text-justify md:text-left text-white/90 max-w-4xl mx-auto">
            {MOBY_DICK_TEXT.split(" ").map((word, i) => (
              <InteractiveWord key={i} word={word} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="min-h-screen bg-[#000511] text-white px-6 py-32 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-[0.5em] text-[#FF6600] mb-4 block">The Adventure Continues</span>
              <h2 className="font-serif text-6xl md:text-8xl font-black italic tracking-tighter">Featured Voyages</h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 max-w-xs text-right">
              The adventure continues through Penguin Classics. Discover more timeless journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {FEATURED_BOOKS.map((book, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div 
                    className="w-48 h-72 flex-shrink-0 shadow-2xl transition-transform group-hover:scale-105 duration-500 rounded flex flex-col justify-between p-5 relative overflow-hidden border border-white/10"
                    style={{ backgroundColor: book.color }}
                  >
                    {/* Texture overlay */}
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw0IDRaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')]"></div>
                    
                    {/* Spine line */}
                    <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-black/20" />
                    
                    <div className="relative z-10 text-center mt-2">
                      <span className={`font-mono text-[8px] uppercase tracking-widest ${book.theme === 'light' ? 'text-white' : 'text-black/80'}`}>
                        Penguin Classics
                      </span>
                      <div className={`h-[1px] w-8 mx-auto mt-2 ${book.theme === 'light' ? 'bg-white/50' : 'bg-black/30'}`} />
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <h4 className={`font-serif text-2xl font-black leading-tight ${book.theme === 'light' ? 'text-white' : 'text-black'}`}>
                        {book.title}
                      </h4>
                    </div>
                    
                    <div className="relative z-10 text-center mb-2">
                      <span className={`font-sans text-[10px] uppercase tracking-widest font-bold ${book.theme === 'light' ? 'text-white/90' : 'text-black/90'}`}>
                        {book.author}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between h-full py-4">
                    <div>
                      <h3 className="font-serif text-3xl font-black mb-2 group-hover:text-[#FF6600] transition-colors">{book.title}</h3>
                      <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-6">{book.author}</p>
                      <p className="font-sans text-sm opacity-80 leading-relaxed mb-8">
                        Experience this classic in a whole new light. Redesigned for the digital generation.
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xl font-bold">{book.price}</span>
                      <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-[#FF6600] hover:text-white transition-all">
                        Buy Now <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Background Accent */}
                <div 
                  className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full blur-[100px] opacity-20 pointer-events-none"
                  style={{ backgroundColor: book.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-40 z-20 relative bg-[#000511]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Penguin & Monotype.</span>
          </div>
          <div className="font-mono text-[8px] uppercase tracking-[0.2em]">
            © 1851-2026 / A Penguin & Monotype Collaboration
          </div>
        </div>
        <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-white transition-colors hover:underline underline-offset-4">Twitter</a>
          <a href="#" className="hover:text-white transition-colors hover:underline underline-offset-4">Instagram</a>
          <a href="#" className="hover:text-white transition-colors hover:underline underline-offset-4">Discord</a>
        </div>
      </footer>

      {/* Custom Cursor Circle */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#FF6600] rounded-full pointer-events-none z-[100]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
