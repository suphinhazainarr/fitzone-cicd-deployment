import { Dumbbell, Link, Globe, Mail, User } from "lucide-react"

const footerLinks = {
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press & Media", href: "#" },
    { name: "Contact", href: "#contact" }
  ],
  services: [
    { name: "Personal Training", href: "#" },
    { name: "Group Classes", href: "#" },
    { name: "Nutrition Coaching", href: "#" },
    { name: "Online Programs", href: "#" }
  ],
  quickLinks: [
    { name: "Membership Plans", href: "#pricing" },
    { name: "Class Schedule", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Terms & Conditions", href: "#" }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-surface pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 group mb-6">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="font-heading text-3xl tracking-wider text-white uppercase group-hover:text-primary transition-colors">
                FitZone
              </span>
            </a>
            <p className="text-text-secondary max-w-sm mb-8 leading-relaxed">
              Transform your body and mind with our world-class facilities, expert trainers, and supportive community.
            </p>
            <div className="flex gap-4">
              {[Link, Globe, Mail, User].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-text-secondary hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-text-secondary hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-text-secondary hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © 2026 FitZone. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-text-secondary">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
