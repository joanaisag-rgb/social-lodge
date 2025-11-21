import { Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-4">
            <h3 className="text-3xl mb-6" style={{ fontWeight: 300 }}>
              Social Lodge
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Alojamento local premium na Madeira. 
              Onde o design contemporâneo encontra a hospitalidade autêntica.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 border border-white/20 hover:border-[#FF6B00] hover:bg-[#FF6B00] flex items-center justify-center transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-white/20 hover:border-[#FF6B00] hover:bg-[#FF6B00] flex items-center justify-center transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-white/20 hover:border-[#FF6B00] hover:bg-[#FF6B00] flex items-center justify-center transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Alojamentos */}
          <div className="lg:col-span-3">
            <h4 className="text-sm uppercase tracking-wider mb-6 text-gray-400">
              Alojamentos
            </h4>
            <ul className="space-y-3">
              {[
                'Social Lodge Hollywood',
                'Social Lodge Piornais',
                'Social Lodge Galinho',
                'Social Lodge Funchal',
                'Social Lodge Cabouqueira',
                'Social Lodge Happiness'
              ].map((property) => (
                <li key={property}>
                  <a
                    href="#"
                    className="text-white hover:text-[#FF6B00] transition-colors"
                  >
                    {property}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm uppercase tracking-wider mb-6 text-gray-400">
              Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white hover:text-[#FF6B00] transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-[#FF6B00] transition-colors">
                  Experiências
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-[#FF6B00] transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-[#FF6B00] transition-colors">
                  Reservas
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-sm uppercase tracking-wider mb-6 text-gray-400">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-4">
              Subscreva para ofertas exclusivas
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="O seu email"
                className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF6B00]"
              />
              <button className="bg-[#FF6B00] px-6 hover:bg-white hover:text-black transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Social Lodge. Todos os direitos reservados.
            </p>
            <div className="flex gap-8 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Termos e Condições
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
