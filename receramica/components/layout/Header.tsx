"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { IconButton, MenuIcon, CloseIcon } from "@/components/ui/IconButton";
import { NAV_LINKS } from "@/lib/constants";

interface HeaderProps {
  transparent?: boolean;
}

export function Header({ transparent = false }: HeaderProps) {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al hacer resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Bloquear scroll cuando menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300",
          isScrolled || !transparent
            ? "bg-bg-earth/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Receramica - Home"
            >
              <Image
                src="/Images/logoHorizontalBlanco.png"
                alt="Receramica"
                width={180}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-12">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "font-body text-sm tracking-wide transition-colors duration-200",
                    link.key === "contact"
                      ? "text-terracotta hover:text-terracotta-dark"
                      : "text-text-secondary hover:text-cream"
                  )}
                >
                  {t(link.key)}
                </button>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="minimal" className="hidden md:block" />

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <IconButton
                  icon={isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                  label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          "transition-opacity duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-bg-earth/95 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <nav
          className={cn(
            "absolute inset-x-0 top-20 p-6",
            "flex flex-col gap-6",
            "transition-transform duration-300",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          )}
        >
          {NAV_LINKS.map((link, index) => (
            <button
              key={link.key}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "font-display text-3xl tracking-wide text-left",
                "transition-all duration-300",
                link.key === "contact" ? "text-terracotta" : "text-cream",
                "hover:translate-x-2"
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {t(link.key)}
            </button>
          ))}

          <div className="pt-6 mt-6 border-t border-border-subtle">
            <LanguageSwitcher variant="toggle" />
          </div>
        </nav>
      </div>
    </>
  );
}
