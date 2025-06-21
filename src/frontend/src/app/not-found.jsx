"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Search,
  ArrowLeft,
  MapPin,
  Wrench,
  Users,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MouthouqOriginalIcon } from "@/components/shared/logo";

// ---- Logo Component ----
const MawthouqLogo = ({ size = "default" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const sizes = {
    small: { icon: 32, text: "text-lg", container: "space-x-2" },
    default: { icon: 40, text: "text-2xl", container: "space-x-3" },
    large: { icon: 48, text: "text-3xl", container: "space-x-4" },
  };
  const currentSize = sizes[size];

  return (
    <div
      className={`flex items-center ${currentSize.container} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MouthouqOriginalIcon
        size={currentSize.icon}
        animated
        isHovered={isHovered}
      />
      <span
        className={`${currentSize.text} font-black tracking-tight text-gray-900`}
        style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
      >
        Mawthouq
      </span>
    </div>
  );
};

// ---- Floating Element Component ----
const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <div
    className="animate-bounce"
    style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
  >
    {children}
  </div>
);

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularServices = [
    { name: "House Cleaning", icon: "🏠", href: "/services/cleaning" },
    { name: "Plumbing", icon: "🔧", href: "/services/plumbing" },
    { name: "AC Repair", icon: "❄️", href: "/services/ac-repair" },
    { name: "Electrical Work", icon: "⚡", href: "/services/electrical" },
  ];

  const quickLinks = [
    { name: "Find Professionals", icon: Users, href: "/professionals" },
    { name: "Post a Request", icon: Wrench, href: "/post-request" },
    { name: "Contact Support", icon: Phone, href: "/contact" },
    { name: "Service Areas", icon: MapPin, href: "/areas" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Floating background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2, 0.5].map((d, i) => (
          <FloatingElement key={i} delay={d} duration={4 + i}>
            <div
              className={`absolute ${
                i % 2 === 0 ? "top-20 left-10" : "bottom-20 right-10"
              } w-24 h-24 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full`}
            />
          </FloatingElement>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <Link href="/" className="inline-block">
            <MawthouqLogo />
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12 relative inline-block">
              <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-black text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text">
                404
              </h1>
              <div className="absolute inset-0 text-gray-200 -z-10 transform translate-x-2 translate-y-2 text-8xl font-black">
                404
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-gray-600">
                The page you’re looking for doesn’t exist. Let us help you find what you need.
              </p>
            </div>

            <Card className="mb-12 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Search for Services</h3>
                <form
                  onSubmit={handleSearch}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="What service do you need?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-3 rounded-xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    Search
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Services</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {popularServices.map((s) => (
                  <Link key={s.name} href={s.href}>
                    <Card className="group cursor-pointer bg-white/70 backdrop-blur-sm hover:shadow-lg border-0 transition-all">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{s.icon}</div>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                          {s.name}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {quickLinks.map((q) => {
                const Icon = q.icon;
                return (
                  <Link key={q.name} href={q.href}>
                    <Card className="group bg-white/70 hover:shadow-lg border-0 transition-transform hover:-translate-y-1">
                      <CardContent className="p-6 text-center">
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="font-medium text-gray-700 group-hover:text-orange-600">
                          {q.name}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl text-lg shadow-lg hover:-translate-y-1"
              >
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Button>
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl text-lg hover:bg-orange-50"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-sm text-gray-500">
          Need help? Contact{" "}
          <a
            href="mailto:support@mawthouq.ma"
            className="text-orange-600 font-medium hover:text-orange-700"
          >
            support@mawthouq.ma
          </a>
        </footer>
      </div>
    </div>
  );
}
