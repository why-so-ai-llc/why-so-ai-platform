'use client';

import { useState, useEffect } from 'react';

interface PasswordData {
  password: string;
  strength: 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong';
  score: number;
  feedback: string[];
  createdAt: string;
}

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [passwords, setPasswords] = useState<PasswordData[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load passwords from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('generatedPasswords');
    if (stored) {
      try {
        setPasswords(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load passwords:', e);
      }
    }
    setMounted(true);
  }, []);

  // Save passwords to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('generatedPasswords', JSON.stringify(passwords));
    }
  }, [passwords, mounted]);

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (chars === '') {
      alert('Please select at least one character type');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
    const strength = analyzePassword(newPassword);
    
    const passwordData: PasswordData = {
      password: newPassword,
      ...strength,
      createdAt: new Date().toLocaleString()
    };

    setPasswords([passwordData, ...passwords]);
  };

  const analyzePassword = (pwd: string) => {
    let score = 0;
    const feedback: string[] = [];

    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 10;
    if (pwd.length >= 16) score += 10;

    if (/[a-z]/.test(pwd)) score += 15;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;

    if (!/(.)\1{2,}/.test(pwd)) score += 10;

    if (score >= 80) return { strength: 'Very Strong', score, feedback: ['Excellent password!'] };
    if (score >= 60) return { strength: 'Strong', score, feedback: ['Good password'] };
    if (score >= 40) return { strength: 'Good', score, feedback: ['Decent password'] };
    if (score >= 20) return { strength: 'Fair', score, feedback: ['Consider adding more character types'] };
    return { strength: 'Weak', score, feedback: ['Too weak, increase length and complexity'] };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deletePassword = (index: number) => {
    setPasswords(passwords.filter((_, i) => i !== index));
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Very Strong':
        return 'bg-green-500';
      case 'Strong':
        return 'bg-blue-500';
      case 'Good':
        return 'bg-yellow-500';
      case 'Fair':
        return 'bg-orange-500';
      default:
        return 'bg-red-500';
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Password Generator
          </span>
        </h1>
        <p className="text-xl text-slate-300 text-center mb-12">
          Generate strong, secure passwords with instant analysis
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generator */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 mb-8">
              {/* Password Display */}
              {password && (
                <div className="mb-6 p-4 rounded-lg bg-slate-700 border border-slate-600 flex justify-between items-center group">
                  <p className="text-white font-mono text-lg break-all">{password}</p>
                  <button
                    onClick={() => copyToClipboard(password)}
                    className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>
              )}

              {/* Length Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white font-semibold">Password Length</label>
                  <span className="text-red-400 font-bold text-lg">{length}</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-700">
                {Object.entries(options).map(([key, value]) => (
                  <label key={key} className="flex items-center cursor-pointer text-slate-300 hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                      className="accent-red-500 mr-3"
                    />
                    <span className="capitalize">{key === 'uppercase' ? 'Uppercase (A-Z)' : key === 'lowercase' ? 'Lowercase (a-z)' : key === 'numbers' ? 'Numbers (0-9)' : 'Symbols (!@#$...)'}</span>
                  </label>
                ))}
              </div>

              {/* Generate Button */}
              <button
                onClick={generatePassword}
                className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transition-colors"
              >
                Generate Password
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 sticky top-20">
              <h3 className="text-xl font-bold text-white mb-4">Strength Analysis</h3>
              {passwords[0] && (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">Strength</span>
                      <span className={`px-3 py-1 rounded-full text-white font-bold text-sm ${getStrengthColor(passwords[0].strength)}`}>
                        {passwords[0].strength}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${getStrengthColor(passwords[0].strength)}`}
                        style={{ width: `${passwords[0].score}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Score: {passwords[0].score}/100</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-300 font-semibold text-sm">Feedback:</p>
                    {passwords[0].feedback.map((fb, idx) => (
                      <p key={idx} className="text-xs text-slate-400">✓ {fb}</p>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* History */}
        {passwords.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Generated Passwords</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {passwords.slice(0, 10).map((pwd, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 group">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white font-mono break-all flex-1">{pwd.password}</p>
                    <button
                      onClick={() => copyToClipboard(pwd.password)}
                      className="ml-2 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                    >
                      📋
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className={`px-2 py-1 rounded text-white font-bold ${getStrengthColor(pwd.strength)}`}>
                      {pwd.strength}
                    </span>
                    <span className="text-slate-500">{pwd.createdAt}</span>
                    <button
                      onClick={() => deletePassword(idx)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
