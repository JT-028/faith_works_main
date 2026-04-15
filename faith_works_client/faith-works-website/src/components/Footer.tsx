import { Link } from "react-router-dom"

const footerLinks = {
  programs: [
    { to: "/programs", label: "Accelerator" },
    { to: "/programs", label: "AI Workshop" },
    { to: "/community", label: "Community" },
    { to: "/blog", label: "Blog" },
  ],
  about: [
    { to: "/about", label: "About Faith" },
    { to: "/media", label: "Media" },
    { to: "/media", label: "Press Kit" },
    { to: "/media", label: "Speaking" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-brand-pink-light">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-16 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block text-xl font-bold tracking-tight text-brand-dark">
              faith<span className="text-brand-pink">works</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-muted">
              Helping Filipino entrepreneurs build brands with strategy and conviction.
              Where faith meets strategy.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-brand-dark">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-brand-muted transition-colors hover:text-brand-pink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-brand-dark">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-brand-muted transition-colors hover:text-brand-pink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-pink/20 pt-8 md:flex-row">
          <p className="text-xs text-brand-muted">
            &copy; {new Date().getFullYear()} Faith Works. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-muted transition-colors hover:text-brand-pink"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-muted transition-colors hover:text-brand-pink"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-muted transition-colors hover:text-brand-pink"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
