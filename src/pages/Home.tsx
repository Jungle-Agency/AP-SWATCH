import { ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { products } from "../data/products";

export function Home({ onSelectProduct }: { onSelectProduct: (id: string) => void }) {
  const scrollToCollection = () => {
     const el = document.getElementById("collection");
     if(el) el.scrollIntoView({behavior: "smooth"});
  };

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10 pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/watches/royal-oak-arc-en-ciel.jpg"
            alt="AP x Swatch Royal Oak"
            className="w-full h-full object-cover scale-105"
            style={{ objectPosition: '50% 5%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/60 to-[#050505]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1A1A]/40 to-[#0C0C0C]/80"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl md:text-[80px] font-light leading-[1.05] tracking-tight mb-8 italic text-white"
          >
            L'ingénierie <span className="text-red-600 italic">suisse</span> au <br className="hidden md:block" />
            <span className="not-italic font-sans font-bold tracking-tighter text-neutral-400">poignet.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg font-light text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Bracelets intégrés premium en caoutchouc fluoré conçus exclusivement pour la collaboration <span className="text-white font-medium">Swap Geneva</span>. Une fusion de haute horlogerie et de durabilité industrielle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-8"
          >
            <button onClick={scrollToCollection} className="group flex items-center space-x-4 border border-white/20 rounded-full pl-2 pr-6 py-2 hover:bg-white hover:text-black transition-all duration-500">
              <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-black/20 transition-all duration-500 group-hover:bg-black/5">
                <ChevronRight className="w-4 h-4" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Découvrir la collection</span>
            </button>
            <a
              href="#expertise"
              className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 hover:text-white transition-colors"
            >
              Voir L'Expertise
            </a>
          </motion.div>
        </div>

      </section>

      <section id="expertise" className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="flex items-center space-x-4 mb-8">
              <span className="h-[1px] w-12 bg-white/30"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">01 / Savoir-Faire</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-[1.1] tracking-tight mb-8">
              Maîtrise absolue du <br/>
              <span className="italic text-neutral-400">polymère.</span>
            </h2>

            <p className="text-base text-neutral-400 font-light leading-relaxed mb-6">
              Nous avons redéfini le standard du bracelet de luxe. Finis à la main en <span className="text-red-600">Suisse</span>, nos bracelets intègrent un polymère FKM de grade aérospatial offrant une résistance thermique et chimique inégalée.
            </p>
            <p className="text-base text-neutral-400 font-light leading-relaxed mb-10">
              L'intégration parfaite au boîtier assure une fluidité esthétique totale, prolongeant les lignes de votre garde-temps.
            </p>

            <ul className="space-y-4 border-l border-white/10 pl-6">
              <li className="flex items-start space-x-4 text-sm">
                <span className="text-white/40 font-mono mt-1">01</span>
                <span><strong className="text-white font-medium">Caoutchouc FKM</strong> — Souplesse et résistance aux UV.</span>
              </li>
              <li className="flex items-start space-x-4 text-sm">
                <span className="text-white/40 font-mono mt-1">02</span>
                <span><strong className="text-white font-medium">Insert Rigide</strong> — Maintien structurel au boîtier.</span>
              </li>
              <li className="flex items-start space-x-4 text-sm">
                <span className="text-white/40 font-mono mt-1">03</span>
                <span><strong className="text-white font-medium">Finition Main</strong> — Brossage satiné des boucles.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 grid grid-cols-2 gap-4 mt-12 lg:mt-0"
          >
            <div className="border border-white/10 p-8 flex flex-col justify-between min-h-[200px] bg-[#0A0A0A]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Tolérance</span>
              <div>
                <div className="text-5xl font-serif font-light text-white">±0.005</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-2">millimètres</div>
              </div>
            </div>

            <div className="border border-white/10 p-8 flex flex-col justify-between min-h-[200px] bg-[#0A0A0A]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Étanchéité</span>
              <div>
                <div className="text-5xl font-serif font-light text-white">50<span className="text-2xl text-neutral-500"> bar</span></div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-2">profondeur testée</div>
              </div>
            </div>

            <div className="border border-white/10 p-8 flex flex-col justify-between min-h-[200px] bg-[#0A0A0A]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Polymère</span>
              <div>
                <div className="text-5xl font-serif font-light text-white">FKM</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-2">grade aérospatial</div>
              </div>
            </div>

            <div className="border border-white/10 p-8 flex flex-col justify-between min-h-[200px] bg-[#0A0A0A]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Origine</span>
              <div>
                <div className="text-3xl font-serif font-light text-white">Genève</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-2">Swiss Made — CH-1200</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="collection" className="relative z-10 py-32 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-8">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
               <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-6 block">02 / Collection</span>
               <h2 className="text-4xl md:text-6xl font-serif font-light mb-4 text-white">
                 Séries <span className="italic text-neutral-400">Limitées</span>
               </h2>
             </motion.div>
             
             <motion.p 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-neutral-500 font-light max-w-sm text-sm border-l border-white/10 pl-6"
             >
               Trois teintes magistrales. Chaque pièce est numérotée et subit un contrôle qualité drastique en atelier.
             </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((strap, index) => (
              <motion.div
                key={strap.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div onClick={() => onSelectProduct(strap.id)} className="group relative block cursor-pointer">
                  <div className="aspect-[3/4] bg-[#0A0A0A] border border-white/5 overflow-hidden relative mb-6">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img 
                      src={strap.image} 
                      alt={strap.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  
                  <div className="flex justify-between items-start text-left">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">{strap.name}</h3>
                      <p className="text-sm text-neutral-500 max-w-[200px] leading-relaxed">{strap.shortDesc}</p>
                    </div>
                    <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all text-white">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="lookbook" className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-6 block">03 / Lookbook</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-4 text-white">
              Au <span className="italic text-neutral-400">poignet.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-500 font-light max-w-sm text-sm border-l border-white/10 pl-6"
          >
            Royal Oak Concept équipée. Chaque bracelet Swap Geneva s'intègre dans la lignée des céramiques signature.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { src: "/watches/royal-oak-noir.png", label: "Noir Obsidienne", accent: "Stealth" },
            { src: "/watches/royal-oak-bleu-orange.png", label: "Bleu Atlantique", accent: "Orange" },
            { src: "/watches/royal-oak-rose.png", label: "Rose Céramique", accent: "Rouge" },
            { src: "/watches/royal-oak-bicolore.png", label: "Bicolore Pastel", accent: "Édition" },
            { src: "/watches/royal-oak-bleu-glace.png", label: "Bleu Glacier", accent: "Concept" },
            { src: "/watches/royal-oak-jaune.png", label: "Jaune Sahara", accent: "Capsule" },
            { src: "/watches/royal-oak-arc-en-ciel.jpg", label: "Arc-en-ciel", accent: "Rainbow" },
          ].map((shot, idx) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden bg-[#0A0A0A] border border-white/5"
            >
              <img
                src={shot.src}
                alt={shot.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 block mb-1">{shot.accent}</span>
                <span className="text-sm font-medium text-white">{shot.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="heritage" className="relative z-10 py-40 border-b border-white/5 bg-[#050505]">
         <div className="max-w-4xl mx-auto px-6 md:px-12 text-center text-white">
            <span className="inline-block mb-10">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30 mx-auto">
                 <path d="M12 2L2 12l10 10 10-10L12 2zM12 8v8M8 12h8" />
              </svg>
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light leading-snug mb-10">
               "L'innovation n'a de sens que si elle respecte l'âme de l'objet qu'elle équipe."
            </h2>
            <div className="h-[1px] w-16 bg-white/20 mx-auto mb-10"></div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500">
               Forgé à Genève, <span className="text-red-600">Suisse</span>.
            </p>
         </div>
      </section>
    </>
  );
}
