'use client';

import { useState } from 'react';
import Link from 'next/link';

const features = [
  {
    category: 'AI Services',
    icon: '🚀',
    items: [
      'AI Software Support',
      'Digital Automation',
      'Workflow Creation',
      'Custom AI Integration',
      'AI Content & Tools'
    ]
  },
  {
    category: 'Productivity Tools',
    icon: '🛠️',
    items: [
      'Todo List with Filters',
      'Color-Coded Notes',
      'Bookmarks Manager',
      'Pomodoro Timer',
      'Expense Tracker',
      'Weather App',
      'Calculator'
    ]
  },
  {
    category: 'Business Features',
    icon: '📊',
    items: [
      'Service Catalog',
      'Pricing Calculator',
      'Case Studies',
      'Blog Section',
      'Contact Form',
      'Customer Dashboard'
    ]
  },
  {
    category: 'Technical',
    icon: '⚙️',
    items: [
      'TypeScript Support',
      'Responsive Design',
      'Local Storage',
      'API Integration',
      'Dark Theme',
      'Real-time Updates'
    ]
  }
];

export default function FeaturesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Platform Features
          </span>
        </h1>
        <p className="text-xl text-slate-300 text-center mb-12">
          Everything you need for AI services and productivity
        </p>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              onClick={() => setExpandedCategory(expandedCategory === feature.category ? null : feature.category)}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-red-500/50 transition-all cursor-pointer group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                {feature.category}
              </h3>
              <div className={`space-y-2 overflow-hidden transition-all ${expandedCategory === feature.category ? 'max-h-96' : 'max-h-0'}`}>
                {feature.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="text-slate-300 text-sm flex items-start">
                    <span className="text-red-400 mr-2 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-sm">{feature.items.length} features</p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-gradient-to-br from-red-600/20 to-red-500/20 border border-red-500/30 text-center">
            <div className="text-4xl font-bold text-red-400 mb-2">14</div>
            <p className="text-slate-300">Pages</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-500/20 border border-blue-500/30 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">8</div>
            <p className="text-slate-300">Tools & Apps</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-green-600/20 to-green-500/20 border border-green-500/30 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">5</div>
            <p className="text-slate-300">AI Services</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-500/20 border border-purple-500/30 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
            <p className="text-slate-300">Responsive</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
            <h3 className="text-2xl font-bold text-red-400 mb-6">🎯 For Businesses</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">✓</span>
                <span>Professional AI services showcase</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">✓</span>
                <span>Lead generation tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">✓</span>
                <span>Service pricing calculator</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">✓</span>
                <span>Case studies & testimonials</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">✓</span>
                <span>Customer dashboard (coming)</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
            <h3 className="text-2xl font-bold text-red-400 mb-6">💡 For Users</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">✓</span>
                <span>Powerful productivity tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">✓</span>
                <span>Offline access with local storage</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">✓</span>
                <span>Data never leaves your device</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">✓</span>
                <span>Beautiful dark theme</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">✓</span>
                <span>Mobile-optimized experience</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Deploy your Why So AI platform today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tools"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
            >
              Explore Tools
            </Link>
            <Link
              href="/"
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
