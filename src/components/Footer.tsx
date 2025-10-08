import Link from 'next/link';
import { Facebook, Instagram, Phone, Mail, MapPin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-wine-red">GO Velo</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Votre destination pour les meilleurs vélos et accessoires en Tunisie. 
              Qualité, passion et service depuis 2019.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-wine-red p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-wine-red p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-wine-red p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-wine-red transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bicyclettes" className="text-gray-400 hover:text-wine-red transition-colors">
                  Bicyclettes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pièces" className="text-gray-400 hover:text-wine-red transition-colors">
                  Pièces de Rechange
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessoires" className="text-gray-400 hover:text-wine-red transition-colors">
                  Accessoires
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-wine-red transition-colors">
                  À Propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-wine-red flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Ariana Soghra<br />
                  Tunis, Tunisie
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-wine-red flex-shrink-0" />
                <a href="tel:+21612345678" className="text-gray-400 hover:text-wine-red transition-colors">
                  +216 12 345 678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-wine-red flex-shrink-0" />
                <a href="mailto:contact@govelo.tn" className="text-gray-400 hover:text-wine-red transition-colors">
                  contact@govelo.tn
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-lg font-bold mb-4">Notre Localisation</h4>
            <div className="rounded-lg overflow-hidden shadow-lg h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25551.89285488316!2d10.160000!3d36.874167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34d8e1e1d1d1%3A0x1d1d1d1d1d1d1d1d!2sAriana%20Soghra%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GO Velo Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} GO Velo. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-wine-red transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-wine-red transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}