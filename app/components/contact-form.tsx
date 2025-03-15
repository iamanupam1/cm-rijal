"use client";
import React, { useState } from "react";
import { User, Mail, MessageSquare, Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setFormStatus({ submitted: false, submitting: true, error: null });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ submitted: true, submitting: false, error: null });
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-0">
      <div className="bg-white rounded-xl shadow-sm p-6 mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact Me</h2>

        {formStatus.submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center text-green-600 mb-4">
              <Send size={24} />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Message Sent!
            </h3>
            <p className="text-green-700 mb-4">
              Thank you for reaching out. We'll get back to you soon.
            </p>
            <button
              onClick={() =>
                setFormStatus({
                  submitted: false,
                  submitting: false,
                  error: null,
                })
              }
              className="bg-white text-green-600 border border-green-300 font-medium py-2 px-4 rounded-md hover:bg-green-50"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={()=>handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Your Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 text-slate-400">
                    <MessageSquare size={18} />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
              disabled={formStatus.submitting}
            >
              {formStatus.submitting ? "Sending..." : "Send Message"}
              <Send size={18} className="ml-2" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
