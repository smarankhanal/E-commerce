import React from "react";
import Logo from "../Logo";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import AnchorTag from "../AnchorTag";

export default function Footer() {
  return (
    <footer className="bg-(--footer-bg) text-(--footer-text) mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between flex-wrap gap-10">
          {/* Company */}
          <div className="max-w-sm">
            <Logo />

            <p className="mt-4 text-sm text-gray-400">
              ShopSphere is your trusted online shopping destination for
              electronics, fashion, groceries, and much more with secure payment
              and fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h2 className="font-bold text-lg mb-4">Quick Links</h2>

            <AnchorTag text="Home" />
            <AnchorTag text="Products" />
            <AnchorTag text="Categories" />
            <AnchorTag text="Offers" />
          </div>

          {/* Customer Service */}
          <div className="flex flex-col">
            <h2 className="font-bold text-lg mb-4">Customer Service</h2>

            <AnchorTag text="Contact Us" />
            <AnchorTag text="FAQs" />
            <AnchorTag text="Shipping" />
            <AnchorTag text="Returns" />
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-bold text-lg mb-4">Contact</h2>

            <p>Email: support@shopsphere.com</p>
            <p>Phone: +977-9800000000</p>
            <p>Bharatpur, Chitwan, Nepal</p>

            <div className="flex gap-4 mt-4 text-2xl">
              <FaFacebook className="cursor-pointer hover:text-blue-500" />
              <FaInstagram className="cursor-pointer hover:text-pink-500" />
              <FaTwitter className="cursor-pointer hover:text-sky-400" />
              <FaLinkedin className="cursor-pointer hover:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ShopSphere. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
