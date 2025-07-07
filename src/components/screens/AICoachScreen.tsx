import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Send, Bot, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const coachResponses = [
  "I'm here to support you on your wellness journey. What's on your mind today?",
  "Remember, every small step counts. You're doing better than you think!",
  "It's okay to have challenging days. What matters is that you're here, trying to grow.",
  "Self-care isn't selfish - it's necessary. How can you be kind to yourself today?",
  "Progress isn't always linear. Celebrate the small victories along the way.",
  "Your feelings are valid. Take a deep breath and be gentle with yourself.",
  "What's one thing you're grateful for today? Gratitude can shift our perspective.",
  "Remember: you have the strength to overcome challenges. I believe in you!",
];

const quickPrompts = [
  "I'm feeling stressed today",
  "How can I build better habits?",
  "I need motivation",
  "Help me with self-care",
  "I'm feeling overwhelmed",
  "Tips for better sleep",
];

export function AICoachScreen() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { state, setCurrentScreen, addChatMessage } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatMessages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious')) {
      return "I understand you're feeling stressed. Try taking 5 deep breaths: inhale for 4 counts, hold for 4, exhale for 6. Remember, this feeling is temporary. What's one small thing you can do right now to care for yourself?";
    }
    
    if (lowerMessage.includes('habit') || lowerMessage.includes('routine')) {
      return "Building habits is like planting seeds - they need time and consistency to grow. Start small: pick one tiny habit you can do for just 2 minutes daily. What habit would you like to focus on first?";
    }
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('motivated')) {
      return "Motivation comes and goes, but systems and small daily actions create lasting change. You've already taken a step by being here. What's one thing you accomplished today, no matter how small?";
    }
    
    if (lowerMessage.includes('overwhelm') || lowerMessage.includes('too much')) {
      return "When everything feels overwhelming, let's break it down. What's the most important thing you need to focus on right now? Sometimes we just need to take things one breath, one moment at a time.";
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
      return "Good sleep is the foundation of wellness. Try creating a calming bedtime routine: dim lights 1 hour before bed, avoid screens, and practice gentle breathing. Your body and mind will thank you.";
    }
    
    return coachResponses[Math.floor(Math.random() * coachResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: message.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    addChatMessage(userMessage);
    setMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      
      addChatMessage(aiMessage);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('home')}
            className="mr-4 p-2 rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <MessageCircle className="w-8 h-8 text-teal-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">🤖 Chat with your AI Coach</h1>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            {state.chatMessages.length === 0 && (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-teal-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Welcome to your AI Wellness Coach!
                </h3>
                <p className="text-gray-600 mb-6">
                  I'm here to support you with stress, motivation, habits, and mindfulness. 
                  How can I help you today?
                </p>
                
                {/* Quick Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl hover:from-teal-100 hover:to-cyan-100 transition-all duration-200 text-sm text-teal-700 border border-teal-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {state.chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-4 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-xs lg:max-w-md ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 ${msg.isUser ? 'ml-3' : 'mr-3'}`}>
                    {msg.isUser ? (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      msg.isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
                className="px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}