import React from 'react';
import { Flower2, Heart, Brain, Activity, Users, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function LandingScreen() {
  const { setCurrentScreen } = useApp();

  const features = [
    {
      icon: Heart,
      title: 'Mood Tracking',
      description: 'Monitor your emotional well-being with daily check-ins and insights',
      color: 'from-rose-200 to-pink-300'
    },
    {
      icon: Activity,
      title: 'Habit Building',
      description: 'Create lasting positive changes with gentle, sustainable daily habits',
      color: 'from-emerald-200 to-green-300'
    },
    {
      icon: Brain,
      title: 'Mindful Reflection',
      description: 'Process thoughts and emotions through guided journaling and self-discovery',
      color: 'from-violet-200 to-purple-300'
    },
    {
      icon: Users,
      title: 'AI Wellness Coach',
      description: 'Get personalized support and guidance on your wellness journey',
      color: 'from-sky-200 to-blue-300'
    }
  ];

  const benefits = [
    {
      stat: '78%',
      description: 'of users report improved mood within 2 weeks'
    },
    {
      stat: '85%',
      description: 'successfully build lasting healthy habits'
    },
    {
      stat: '92%',
      description: 'feel more self-aware and mindful'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center mb-8">
              <Flower2 className="w-16 h-16 text-emerald-400 mr-4" />
              <Sparkles className="w-12 h-12 text-amber-300" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
              🌼 Daily <span className="text-emerald-400">Bloom</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your personal wellness companion for nurturing mental health, building mindful habits, 
              and creating a life that truly flourishes
            </p>
            
            <button
              onClick={() => setCurrentScreen('login')}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-300 to-teal-400 text-white text-lg font-semibold rounded-2xl hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Begin Your Wellness Journey
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Why Mental Health Matters Section */}
      <div className="bg-white/90 backdrop-blur-sm py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Why Your Mental Health Matters More Than Ever
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              In our fast-paced world, taking care of your mental and emotional well-being isn't just important—it's essential. 
              Your mental health affects every aspect of your life, from relationships to productivity to physical health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-200 to-pink-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Emotional Resilience</h3>
              <p className="text-gray-600">
                Strong mental health helps you bounce back from challenges, manage stress effectively, 
                and maintain emotional balance during difficult times.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-200 to-green-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Physical Health</h3>
              <p className="text-gray-600">
                Mental wellness directly impacts your physical health, boosting immunity, 
                improving sleep quality, and reducing the risk of chronic diseases.
              </p>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-200 to-purple-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Cognitive Function</h3>
              <p className="text-gray-600">
                Good mental health enhances focus, creativity, decision-making abilities, 
                and overall cognitive performance in all areas of life.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              The Impact of Daily Wellness Practices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-sky-500 mb-2">{benefit.stat}</div>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Everything You Need to Flourish
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Daily Bloom provides comprehensive tools designed by wellness experts to support 
              your mental health journey with science-backed approaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white/90 backdrop-blur-sm py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Privacy is Sacred</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your wellness journey is deeply personal. That's why Daily Bloom stores all your data locally on your device. 
            No cloud storage, no data sharing, no privacy concerns—just you and your path to better mental health.
          </p>
          <button
            onClick={() => setCurrentScreen('privacy-policy')}
            className="text-emerald-500 hover:text-emerald-600 font-medium underline transition-colors duration-200"
          >
            Read our Privacy Policy
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Start Blooming?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have transformed their mental health and well-being with Daily Bloom. 
            Your journey to a happier, healthier you starts with a single step.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => setCurrentScreen('login')}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-300 to-teal-400 text-white text-lg font-semibold rounded-2xl hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Start Your Free Journey Today
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <p className="text-sm text-gray-500">
              Free forever • No account required • Complete privacy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}