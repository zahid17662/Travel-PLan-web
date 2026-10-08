import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/shared/Logo'

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-50/50 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Logo />
            <p className="text-xs text-neutral-500 leading-relaxed">
              Collaborative travel planning, smart itineraries, and real-time maps for modern
              explorers.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Product</h4>
            <ul className="mt-4 space-y-2 text-xs text-neutral-600">
              <li>
                <Link to="/trips" className="hover:text-neutral-900">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-neutral-900">
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-neutral-900">
                  Hotel Booking
                </Link>
              </li>
              <li>
                <Link to="/styleguide" className="hover:text-neutral-900">
                  Design System
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Explore</h4>
            <ul className="mt-4 space-y-2 text-xs text-neutral-600">
              <li>
                <Link to="/guides" className="hover:text-neutral-900">
                  Kyoto Itinerary
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-neutral-900">
                  Tokyo Food Tour
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-neutral-900">
                  Paris Weekend
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-neutral-900">
                  Rome Essentials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Company</h4>
            <ul className="mt-4 space-y-2 text-xs text-neutral-600">
              <li>
                <a href="#about" className="hover:text-neutral-900">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-neutral-900">
                  Careers
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-neutral-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-neutral-900">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-3">
          <p>© 2026 Travel Plan Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/styleguide" className="hover:text-neutral-600">
              Styleguide
            </Link>
            <Link to="/login" className="hover:text-neutral-600">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
