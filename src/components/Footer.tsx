export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-[#060606] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
        <p>© {year} Swap Geneva — Genève, Suisse.</p>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-white transition-colors">CGV</a>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="inline-flex items-center gap-1 flex-wrap">
            Fait par
            <a
              href="https://jungle-agency.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              <img src="/media/jungle-logo.webp" alt="" className="h-4 w-auto" />
              Jungle Agency
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
