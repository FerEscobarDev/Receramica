import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-earth border-t border-border-subtle">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Images/logoHorizontalBlanco.png"
                alt="Receramica"
                width={160}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-text-secondary font-body text-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-terracotta font-body text-xs font-medium tracking-widest uppercase mb-4">
              {t("navigation")}
            </h3>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.slice(0, 3).map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-text-secondary font-body text-sm hover:text-cream transition-colors"
                >
                  {tNav(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-terracotta font-body text-xs font-medium tracking-widest uppercase mb-4">
              {t("contact")}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-text-secondary font-body text-sm hover:text-cream transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
              <span className="text-text-secondary font-body text-sm">
                {CONTACT_INFO.location}
              </span>
            </div>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="text-terracotta font-body text-xs font-medium tracking-widest uppercase mb-4">
              {t("followUs")}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary font-body text-sm hover:text-cream transition-colors inline-flex items-center gap-2"
              >
                <InstagramIcon className="w-4 h-4" />
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary font-body text-sm hover:text-cream transition-colors inline-flex items-center gap-2"
              >
                <FacebookIcon className="w-4 h-4" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-bg-warm my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-text-muted font-body text-xs">
          <p>
            {t("copyright").replace("2024", String(currentYear))}
          </p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}

// Social Icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
