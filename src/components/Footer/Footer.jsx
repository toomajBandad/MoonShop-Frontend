import React from 'react';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/careers" className="hover:underline">Careers</a></li>
            <li><a href="/press" className="hover:underline">Press</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/help" className="hover:underline">Help Center</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            <li><a href="/cookies" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <FaLinkedin className="text-blue-700" /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <FaInstagram className="text-pink-500" /> Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <FaTwitter className="text-blue-500" /> Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Toomaj Bandad All rights reserved.
      </div>
    </footer>
  );
}