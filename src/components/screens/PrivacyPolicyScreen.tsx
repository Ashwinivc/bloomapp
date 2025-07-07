import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function PrivacyPolicyScreen() {
  const { setCurrentScreen } = useApp();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentScreen('login')}
            className="mr-4 p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">🔒 Privacy Policy</h1>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Your Privacy Matters</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              At Daily Bloom, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This privacy policy explains how we collect, use, and safeguard your data when you use our wellness application.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-purple-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Information We Collect</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-700 mb-2">Personal Information</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Your name (as provided during registration)</li>
                  <li>• Theme preferences and app settings</li>
                  <li>• Usage patterns and feature interactions</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-700 mb-2">Wellness Data</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Mood entries and emotional check-ins</li>
                  <li>• Habit tracking and completion status</li>
                  <li>• Journal entries and personal reflections</li>
                  <li>• AI coach conversation history</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">How We Use Your Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-medium text-blue-700 mb-2">Personalization</h4>
                <p className="text-sm text-blue-600">
                  We use your data to personalize your wellness journey, calculate your Bloom Score, 
                  and provide relevant insights and recommendations.
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-medium text-green-700 mb-2">Improvement</h4>
                <p className="text-sm text-green-600">
                  Anonymous usage data helps us improve app features, fix bugs, 
                  and develop new wellness tools that better serve our users.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Data Security</h3>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-gray-700 mb-3">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• End-to-end encryption for sensitive data</li>
                <li>• Secure data storage with regular backups</li>
                <li>• Limited access controls for our team members</li>
                <li>• Regular security audits and updates</li>
                <li>• No sharing of personal data with third parties</li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-orange-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Data Retention & Your Rights</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-xl p-4">
                <h4 className="font-medium text-orange-700 mb-2">Your Rights</h4>
                <ul className="text-sm text-orange-600 space-y-1">
                  <li>• Access your personal data at any time</li>
                  <li>• Request correction of inaccurate information</li>
                  <li>• Delete your account and associated data</li>
                  <li>• Export your data in a portable format</li>
                  <li>• Opt out of data collection features</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-700 mb-2">Data Retention</h4>
                <p className="text-sm text-gray-600">
                  We retain your data only as long as necessary to provide our services. 
                  You can delete your account at any time, which will permanently remove all associated data within 30 days.
                </p>
              </div>
            </div>
          </section>

          {/* Local Storage Notice */}
          <section>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h4 className="font-medium text-yellow-800 mb-2">📱 Local Storage Notice</h4>
              <p className="text-sm text-yellow-700">
                Currently, Daily Bloom stores your data locally on your device. This means your information 
                stays private and secure on your device, but it also means your data won't sync across devices. 
                We're working on secure cloud sync options for future updates.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Questions About Your Privacy?</h3>
              <p className="text-gray-600 mb-4">
                We're here to help! If you have any questions about this privacy policy or how we handle your data, 
                please don't hesitate to reach out.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Email:</strong> privacy@dailybloom.app</p>
                <p><strong>Support:</strong> help@dailybloom.app</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By using Daily Bloom, you agree to this privacy policy. We may update this policy from time to time, 
              and we'll notify you of any significant changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}