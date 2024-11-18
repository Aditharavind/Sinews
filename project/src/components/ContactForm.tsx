import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        'service_id', // Replace with your EmailJS service ID
        'template_id', // Replace with your EmailJS template ID
        formRef.current!,
        'public_key' // Replace with your EmailJS public key
      );
      
      toast.success('Message sent successfully!');
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            name="user_name"
            id="name"
            required
            className="mt-1 block w-full rounded-md bg-gray-800/50 border border-gray-700 text-white shadow-sm 
                     focus:border-purple-500 focus:ring-purple-500 transition-all duration-300
                     group-hover:border-purple-400"
            placeholder="Your name"
          />
        </div>

        <div className="group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="user_email"
            id="email"
            required
            className="mt-1 block w-full rounded-md bg-gray-800/50 border border-gray-700 text-white shadow-sm 
                     focus:border-purple-500 focus:ring-purple-500 transition-all duration-300
                     group-hover:border-purple-400"
            placeholder="your@email.com"
          />
        </div>

        <div className="group">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            required
            rows={4}
            className="mt-1 block w-full rounded-md bg-gray-800/50 border border-gray-700 text-white shadow-sm 
                     focus:border-purple-500 focus:ring-purple-500 transition-all duration-300
                     group-hover:border-purple-400"
            placeholder="Your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-white
                     bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                     transform hover:scale-[1.02] transition-all duration-300
                     disabled:opacity-70 disabled:cursor-not-allowed
                     text-base font-medium ${isSubmitting ? 'animate-pulse' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
          <Send className="ml-2 h-4 w-4" />
        </button>
      </form>
    </motion.div>
  );
}