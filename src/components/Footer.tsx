import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Events", href: "/events" },
        { label: "Opportunities", href: "/opportunities" },
        { label: "Alumni Directory", href: "/alumni" },
        { label: "Leaderboard", href: "/leaderboard" },
        { label: "Chat", href: "/messages" },
      ]
    },
    {
      title: "Community",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Success Stories", href: "/stories" },
        { label: "Mentorship", href: "/mentorship" },
        { label: "Volunteer", href: "/volunteer" },
        { label: "Donate", href: "/donate" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Guidelines", href: "/guidelines" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">AllyConnect</h3>
              <p className="text-primary-foreground/80 leading-relaxed max-w-md">
                Bridging the gap between alumni and students, fostering meaningful connections, 
                mentorship, and opportunities for growth in our vibrant community.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-primary-foreground/80">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="text-sm">connect@allyconnect.edu</span>
              </div>
              <div className="flex items-center text-primary-foreground/80">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-primary-foreground/80">
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="text-sm">123 University Avenue, Education City, EC 12345</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Stay Connected</h4>
              <p className="text-primary-foreground/80 text-sm mb-3">
                Get the latest updates on events, opportunities, and community news.
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary-foreground/20"
                />
                <Button variant="secondary" size="icon" className="flex-shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={section.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <div className="text-primary-foreground/80 text-sm mb-4 md:mb-0">
            © {currentYear} AllyConnect. All rights reserved. Built with passion for our alumni community.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-primary-foreground/80 text-sm mr-2">Follow us:</span>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Additional Footer Links */}
        <div className="mt-6 pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-primary-foreground/60">
            <a href="/accessibility" className="hover:text-primary-foreground transition-colors">
              Accessibility
            </a>
            <a href="/sitemap" className="hover:text-primary-foreground transition-colors">
              Sitemap
            </a>
            <a href="/careers" className="hover:text-primary-foreground transition-colors">
              Careers
            </a>
            <a href="/press" className="hover:text-primary-foreground transition-colors">
              Press
            </a>
            <a href="/developers" className="hover:text-primary-foreground transition-colors">
              Developers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;