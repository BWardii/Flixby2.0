import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import AuthButton from './AuthButton';
import { supabase } from '../lib/supabase';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Navbar detected auth state change:', event);
      setIsAuthenticated(!!session);
      
      // Close mobile menu on auth state change
      if (isOpen) {
        setIsOpen(false);
      }
    });

    // Add click outside listener to close the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUseCasesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
    setUseCasesDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  // Industry-specific use cases
  const useCasesLinks = [
    { path: '/use-cases/restaurants', label: 'Restaurants' },
    { path: '/use-cases/hotels-resorts', label: 'Hotels & Resorts' },
    { path: '/use-cases/beauty-wellness', label: 'Beauty & Wellness' },
    { path: '/use-cases/healthcare', label: 'Healthcare' },
  ];

  // Rearranged navigation links with About after Pricing
  const publicLinks = [
    { path: '/', label: 'Home' },
    { 
      path: '/use-cases', 
      label: 'Use Cases', 
      hasDropdown: true,
      dropdownLinks: useCasesLinks
    },
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const privateLinks = isAuthenticated 
    ? [...publicLinks, { path: '/my-assistant', label: 'My AI Assistant' }]
    : publicLinks;

  const navLinks = privateLinks;

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUseCasesDropdownOpen(!useCasesDropdownOpen);
  };

  return (
    <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/flixby-logo.png" 
                alt="Flixby Logo" 
                className="h-7 sm:h-8 w-auto"
              />
              <span className="bg-purple-500/20 text-purple-300 px-1.5 sm:px-2 py-0.5 rounded-md text-xs font-medium">
                Beta
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
            <div className="flex items-baseline space-x-2 lg:space-x-4">
              {navLinks.map((link) => (
                <div key={link.path} ref={link.hasDropdown ? dropdownRef : null}>
                  {link.hasDropdown ? (
                    <div className="relative">
                      <div
                        className={`flex items-center px-2.5 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                          isActive(link.path)
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer'
                        }`}
                        onClick={toggleDropdown}
                        onMouseEnter={() => setUseCasesDropdownOpen(true)}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </div>
                      
                      {useCasesDropdownOpen && (
                        <div 
                          className="absolute left-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-lg rounded-md shadow-lg py-1 z-10 border border-gray-700"
                          onMouseLeave={() => setUseCasesDropdownOpen(false)}
                        >
                          {link.dropdownLinks?.map((dropdownLink) => (
                            <div
                              key={dropdownLink.path}
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                              onClick={() => {
                                navigate(dropdownLink.path);
                                setUseCasesDropdownOpen(false);
                              }}
                            >
                              {dropdownLink.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`px-2.5 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                        isActive(link.path)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer'
                      }`}
                      onClick={() => {
                        navigate(link.path);
                      }}
                    >
                      {link.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <AuthButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <React.Fragment key={link.path}>
                {link.hasDropdown ? (
                  <>
                    <div
                      className={`flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium ${
                        isActive(link.path)
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer'
                      }`}
                      onClick={toggleDropdown}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    
                    {useCasesDropdownOpen && (
                      <div className="pl-4 space-y-1 mt-1">
                        {link.dropdownLinks?.map((dropdownLink) => (
                          <div
                            key={dropdownLink.path}
                            className="block px-3 py-2 rounded-md text-sm text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
                            onClick={() => {
                              navigate(dropdownLink.path);
                              setIsOpen(false);
                            }}
                          >
                            {dropdownLink.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                      isActive(link.path)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer'
                    }`}
                    onClick={() => {
                      navigate(link.path);
                      setIsOpen(false);
                    }}
                  >
                    {link.label}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;