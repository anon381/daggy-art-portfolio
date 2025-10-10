"use client"

import * as React from "react"
import Link from "next/link"
import {
  Menu,
  X,
  Palette,
  Users,
  Star,
  Tag,
  Mail,
} from "lucide-react"

const links = [
  { href: "/#portfolio", label: "Portfolio", icon: Palette },
  { href: "/#testimonials", label: "Testimonials", icon: Users },
  { href: "/#pricing", label: "Pricing", icon: Tag },
  { href: "/#contact", label: "Contact", icon: Mail },
  { href: "/about", label: "About", icon: Star },
]

export default function MobileMenu() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* overlay + panel */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 pointer-events-${open ? "auto" : "none"}`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* Slide-in panel */}
        <aside
          className={`absolute top-0 right-0 h-full w-80 max-w-[85%] bg-background shadow-xl transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <span className="font-semibold">Menu</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4">
            <ul className="flex flex-col gap-3">
              {links.map((l) => {
                const Icon = l.icon
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-md p-3 hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-base font-medium text-foreground">{l.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  )
}
