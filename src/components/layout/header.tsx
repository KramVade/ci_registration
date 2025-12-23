"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";

import logo from "@/images/logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#rules", label: "Rules" },
  { href: "#register", label: "Register" },
];

export function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border/40 bg-background/98 backdrop-blur-md shadow-sm">
      <div className="container flex h-24 md:h-28 items-center px-4 md:px-6">
        <Link href="/" className="mr-4 md:mr-8 flex items-center space-x-2 md:space-x-3 group flex-shrink-0">
          <div className="relative flex-shrink-0">
            <Image 
              src={logo} 
              alt="Christmas Institute Logo" 
              width={56} 
              height={56} 
              className="h-10 w-10 md:h-14 md:w-14 object-contain transition-transform group-hover:scale-105" 
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-base md:text-2xl font-bold leading-tight">
              United Methodist Youth Fellowship
            </span>
            <span className="text-xs md:text-sm text-muted-foreground font-medium">
              Christmas Institute 2025
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center space-x-8 text-base font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-3">
          {user ? (
            <>
              <Button asChild className="hidden md:flex" variant="outline" size="default">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={logout} className="hidden md:flex" variant="default" size="default">
                Logout
              </Button>
            </>
          ) : (
            <Button asChild className="hidden md:flex" variant="default" size="default">
              <Link href="/login">Officer Login</Link>
            </Button>
          )}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col h-full pt-8">
                  <Link
                    href="/"
                    className="mb-10 flex flex-col items-center space-y-2 self-center"
                  >
                    <Image src={logo} alt="Christmas Institute Logo" width={64} height={64} className="h-16 w-16 object-contain" />
                    <div className="text-center">
                      <span className="font-headline text-xl font-bold block">
                        Christmas Institute
                      </span>
                      <span className="text-xs text-muted-foreground">
                        BANYUHAY 2025
                      </span>
                    </div>
                  </Link>
                  <nav className="flex flex-col items-center space-y-6 text-lg font-medium">
                    {navLinks.map((link) => (
                      <SheetTrigger asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </SheetTrigger>
                    ))}
                    {user ? (
                      <>
                        <SheetTrigger asChild>
                          <Link
                            href="/dashboard"
                            className="transition-colors hover:text-primary"
                          >
                            Dashboard
                          </Link>
                        </SheetTrigger>
                        <SheetTrigger asChild>
                          <button
                            onClick={logout}
                            className="transition-colors hover:text-primary"
                          >
                            Logout
                          </button>
                        </SheetTrigger>
                      </>
                    ) : (
                      <SheetTrigger asChild>
                        <Link
                          href="/login"
                          className="transition-colors hover:text-primary"
                        >
                          Officer Login
                        </Link>
                      </SheetTrigger>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
