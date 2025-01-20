// components/Footer.tsx
import Link from 'next/link';

// import TwitterIcon from '@/icons/twitter.svg';
// import InstagramIcon from '@/icons/instagram.svg';
// import LinkedinIcon from '@/icons/linkedin.svg';
// import WhatsappIcon from '@/icons/whatsapp.svg';
// import EnvelopeIcon from '@/icons/envelope.svg';

const Footer = () => {
  //const date = '2024'
  return (
    <footer className="bg-bg-footer text-text">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Pere Barceló</h3>
            <p className="text-gray-light text-xs leading-relaxed">
              Psicólogo deportivo especializado en mejorar el rendimiento y la salud mental de deportistas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-gray-light hover:text-white transition-colors duration-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/conociendo-a-pere-barcelo" className="text-gray-light hover:text-white transition-colors duration-200">
                  Conociendo a Pere Barceló
                </Link>
              </li>
              <li>
                <Link href="/mi-modo-de-trabajo" className="text-gray-light hover:text-white transition-colors duration-200">
                  Mi Modo de Trabajo
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-light hover:text-white transition-colors duration-200">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center space-x-3">
                {/* <EnvelopeIcon className="text-text-light" /> */}
                <a href="mailto:pere@perebarcelpsicologo.com" className="text-gray-light hover:text-white transition-colors duration-200">
                  pere@perebarcelpsicologo.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                {/* <WhatsappIcon className="text-text-light" /> */}
                <a href="tel:+34600000000" className="text-gray-300 hover:text-white transition-colors duration-200">
                  +34 600 000 000
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sígueme</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/pere-barcel%C3%B3-lambea-6b5255192/" 
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center
                        hover:bg-primary transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <LinkedinIcon className="text-white" /> */}
              </a>
              <a 
                href="https://www.instagram.com/perebarcelopsico/" 
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center
                        hover:bg-primary transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <InstagramIcon className="text-white" /> */}
              </a>
              <a 
                href="https://x.com/PBarceloPsico" 
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center
                        hover:bg-primary transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <TwitterIcon className="text-white" /> */}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-2 border-t border-bg text-xs">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300">
              © {new Date().getFullYear()} Pere Barceló Psicólogo. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacidad" className="text-gray-light hover:text-white transition-colors duration-200">
                Política de Privacidad
              </Link>
              <Link href="/cookies" className="text-gray-light hover:text-white transition-colors duration-200">
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;