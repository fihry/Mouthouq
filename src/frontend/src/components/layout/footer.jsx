"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import {MouthouqOriginalLogo} from "@/components/shared/logo"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: "Home Cleaning", href: "/services?category=cleaning" },
    { name: "Plumbing", href: "/services?category=plumbing" },
    { name: "Electrical", href: "/services?category=electrical" },
    { name: "AC Repair", href: "/services?category=ac-repair" },
    { name: "Painting", href: "/services?category=painting" },
  ]

  const professionalLinks = [
    { name: "Join as Professional", href: "/auth?type=professional" },
    { name: "Professional Dashboard", href: "/dashboard" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Professional Resources", href: "/resources" },
  ]

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Safety", href: "/safety" },
    { name: "Trust & Safety", href: "/trust-safety" },
  ]

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", label: "Facebook" },
    { name: "Instagram", icon: Instagram, href: "#", label: "Instagram" },
    { name: "Twitter", icon: Twitter, href: "#", label: "Twitter" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <MouthouqOriginalLogo size="default"  animated={true} />
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting you with trusted professionals across Morocco. Quality service, verified providers, and
              AI-powered matching for all your household needs.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">+212 5XX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">support@mouthouq.ma</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">Casablanca, Morocco</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Professionals</h3>
            <ul className="space-y-3">
              {professionalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <span>© {currentYear} mouthouq. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
