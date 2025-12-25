import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-background border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-heading text-xl lg:text-2xl text-primary tracking-wide">
            Sky Airlens
          </Link>
          
          <nav className="flex items-center gap-8 lg:gap-12">
            <Link 
              to="/" 
              className={`font-paragraph text-sm lg:text-base transition-colors ${
                isActive('/') ? 'text-primary' : 'text-softgraytext hover:text-primary'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link 
              to="/flights" 
              className={`font-paragraph text-sm lg:text-base transition-colors ${
                isActive('/flights') ? 'text-primary' : 'text-softgraytext hover:text-primary'
              }`}
            >
              Uçuşlar
            </Link>
            <Link 
              to="/contact" 
              className={`font-paragraph text-sm lg:text-base transition-colors ${
                isActive('/contact') ? 'text-primary' : 'text-softgraytext hover:text-primary'
              }`}
            >
              İletişim
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
