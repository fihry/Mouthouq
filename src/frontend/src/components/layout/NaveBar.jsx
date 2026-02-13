"use client"

import { Menu, Search, X } from "lucide-react"
import Link from "next/link"
import { useState,useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MouthouqOriginalLogo } from "@/components/shared/logo"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check for user in localStorage on mount
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          console.error("Failed to parse user from localStorage", e)
        }
      }
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="hover:scale-105 transition-transform duration-200">
            <MouthouqOriginalLogo size="default" animated={true} />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search services or professionals..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/services" className="text-sm font-medium transition-colors hover:text-red-600 text-gray-700">
              Services
            </Link>
            <Link
              href="/auth?type=professional"
              className="text-sm font-medium transition-colors hover:text-red-600 text-gray-700"
            >
              Become a Professional
            </Link>
            <Link
              href="/post-request"
              className="text-sm font-semibold transition-all hover:text-red-600 text-gray-700 hover:scale-105"
            >
              Post a Request
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-orange-100 hover:ring-orange-300 transition-all">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt={user.firstName} />
                        <AvatarFallback className="bg-orange-500 text-white">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={user.userType === "professional" ? "/dashboard/professional" : "/dashboard/customer"}>
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-red-600 font-semibold transition-colors">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2.5 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold shadow-lg shadow-orange-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 animate-in slide-in-from-top-5 duration-300">
          <div className="px-4 py-6 space-y-4">
            {user && (
              <div className="flex items-center space-x-4 px-3 py-4 bg-orange-50/50 rounded-2xl mb-4">
                <Avatar className="h-12 w-12 ring-2 ring-orange-200">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt={user.firstName} />
                  <AvatarFallback className="bg-orange-500 text-white">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-gray-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            )}

            <Link
              href="/services"
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/auth?type=professional"
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Become a Professional
            </Link>
            <Link
              href="/post-request"
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Post a Request
            </Link>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              {user ? (
                <>
                  <Link
                    href={user.userType === "professional" ? "/dashboard/professional" : "/dashboard/customer"}
                    className="block px-4 py-3 rounded-xl text-base font-bold text-orange-600 bg-orange-50 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-xl text-base font-bold text-red-600 hover:bg-red-50 transition-all"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-3 rounded-xl text-base font-bold text-gray-700 hover:bg-gray-50 transition-all text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-orange-100 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
