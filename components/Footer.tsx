import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"
import type { FC } from "react"

export const Footer: FC = () => {
  return (
    <footer className="w-full bg-[#043866] text-[#F8FAFC]">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="space-y-3">
            <h3 className="text-2xl font-extrabold text-hoverColor">NepoJob</h3>
            <p className="text-sm opacity-90">Connecting talented professionals with their dream careers.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white opacity-80 hover:opacity-100 hover:text-[#F77300] transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white opacity-80 hover:opacity-100 hover:text-[#F77300] transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white opacity-80 hover:opacity-100 hover:text-[#F77300] transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white opacity-80 hover:opacity-100 hover:text-[#F77300] transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links - Public Access */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-white opacity-80 hover:text-[#F77300] transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white opacity-80 hover:text-[#F77300] transition-colors">
                  Career Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white opacity-80 hover:text-[#F77300] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white opacity-80 hover:text-[#F77300] transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white opacity-80 hover:text-[#F77300] transition-colors">
                  For Employers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white opacity-80 hover:text-[#F77300] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">For any queries</h3>
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="h-4 w-4 text-white opacity-80" />
              <span>contact@nepojob.com</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="h-4 w-4 text-white opacity-80" />
              <span>+977 9867523451</span>
            </div>
            <div className="pt-2">
              <p className="text-sm opacity-90 mb-2">Get job alerts and career tips:</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  type="email"
                  placeholder="Email"
                  className="h-9 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button size="sm" className="bg-[#F77300] hover:bg-[#F77300]/80 text-white border-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 mt-6 border-t border-white/20 text-sm">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0 text-xs opacity-80">
            <Link href="#" className="hover:text-[#F77300]">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#F77300]">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[#F77300]">
              Cookie Policy
            </Link>
            <Link href="#" className="hover:text-[#F77300]">
              Accessibility
            </Link>
          </div>
          <p className="text-xs opacity-80">© {new Date().getFullYear()} NepoJob. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
