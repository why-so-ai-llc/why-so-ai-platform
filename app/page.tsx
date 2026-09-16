'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    id: 1,
    name: 'AI Software Support',
    description: 'Managed support and optimization for your AI systems',
    icon: '🤖',
    link: '/services/ai-support'
  },
  {
    id: 2,
    name: 'Digital Automation',
    description: 'Streamline workflows and automate business processes',
    icon: '⚙️',
    link: '/services/automation'
  },
  {
    id: 3,
    name: 'Workflow Creation',
    description: 'Custom AI-powered workflows tailored to your needs',
    icon: '🔄',
    link: '/services/workflows'
  },
  {
    id: 4,
    name: 'Custom AI Integration',
    description: 'Embed AI into your existing systems and applications',
    icon: '🔗',
    link: '/services/integration'
  },
  {
    id: 5,
    name: 'AI Content & Tools',
    description: 'Monetized AI content, templates, and SaaS tools',
    icon: '📊',
    link: '/services/content-tools'
  }
];

const shortcuts = [
  { label: 'Services', href: '/services', icon: '⚡' },
  { label: 'Pricing', href: '/pricing', icon: '💰' },
  { label: 'Case Studies', href: '/case-studies', icon: '📈' },
  { label: 'Blog', href: '/blog', icon: '📝' },
  { label: 'Tools', href: '/tools', icon: '🛠️' },
  { label: 'Contact', href: '/contact', icon: '💬' }
];

export default function HomePage() {
  const [luckyService, setLuckyService] = useState(null);
  const [showLucky, setShowLucky] = useState(false);

  const handleImFeelingLucky = () => {
    const randomIndex = Math.floor(Math.random() * services.length);
    setLuckyService(services[randomIndex]);
    setShowLucky(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with Logo */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Why So AI
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            {shortcuts.map((shortcut) => (
              <Link
                key={shortcut.href}
                href={shortcut.href}
                className="text-slate-300 hover:text-red-400 transition-colors text-sm font-medium"
              >
                {shortcut.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Quick Shortcuts */}
      <div className="bg-slate-800/50 border-b border-slate-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap gap-2">
            {shortcuts.map((shortcut) => (
              <Link
                key={shortcut.href}
                href={shortcut.href}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-red-600 rounded-full text-slate-200 hover:text-white transition-all text-sm font-medium"
              >
                <span>{shortcut.icon}</span>
                <span>{shortcut.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
            AI-Powered Automation
          </span>
          <br />
          <span className="text-slate-100">for Modern Business</span>
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Transform your business with custom AI integrations, intelligent automation, and expert support. Why So AI delivers enterprise-grade AI solutions.
        </p>

        {/* I'm Feeling Lucky Button */}
        <button
          onClick={handleImFeelingLucky}
          className="relative inline-flex items-center justify-center px-8 py-4 mb-12 overflow-hidden font-bold text-white rounded-lg group"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg"></div>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-2">
            <span className="text-2xl">🎲</span>
            <span>I'm Feeling Lucky</span>
          </div>
        </button>

        {/* Lucky Service Modal */}
        {showLucky && luckyService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-pulse">
              <div className="text-6xl mb-4">{luckyService.icon}</div>
              <h3 className="text-3xl font-bold text-red-400 mb-2">
                {luckyService.name}
              </h3>
              <p className="text-slate-300 mb-6">
                {luckyService.description}
              </p>
              <div className="flex space-x-3">
                <Link
                  href={luckyService.link}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                >
                  Learn More
                </Link>
                <button
                  onClick={() => setShowLucky(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-4xl font-bold text-center mb-12">Our Services</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-red-500/50 transition-all hover:shadow-2xl hover:shadow-red-500/20"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                {service.name}
              </h4>
              <p className="text-slate-400">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Try Our Tools
          </span>
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/todo"
            className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-red-500/50 transition-all"
          >
            <div className="text-4xl mb-3">✅</div>
            <h4 className="text-xl font-bold text-white mb-2">Todo List</h4>
            <p className="text-slate-400 text-sm">Manage tasks with local storage persistence</p>
          </Link>

          <Link
            href="/notes"
            className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-red-500/50 transition-all"
          >
            <div className="text-4xl mb-3">📝</div>
            <h4 className="text-xl font-bold text-white mb-2">Notes App</h4>
            <p className="text-slate-400 text-sm">Color-coded notes with auto-save</p>
          </Link>

          <Link
            href="/bookmarks"
            className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-red-500/50 transition-all"
          >
            <div className="text-4xl mb-3">🔖</div>
            <h4 className="text-xl font-bold text-white mb-2">Bookmarks</h4>
            <p className="text-slate-400 text-sm">Organize and access your favorite links</p>
          </Link>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/tools"
            className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
          >
            Explore All Tools
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 rounded-2xl p-12">
          <h3 className="text-4xl font-bold mb-4 text-white">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl text-slate-300 mb-8">
            Get started with Why So AI today. Consultation is free.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
          >
            Schedule Consultation
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
          <p>&copy; 2026 Why So AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
