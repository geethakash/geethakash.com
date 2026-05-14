"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="py-24 section-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs text-volt uppercase tracking-[0.2em]">
            Get In Touch
          </span>
          <h2 className="text-4xl text-surgical-white font-medium tracking-tight mt-2">
            Send a message
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <p className="text-sm text-foreground leading-relaxed max-w-md">
              I&apos;m always open to discussing new opportunities, interesting
              projects, or just a friendly chat about tech. Based in Sri Lanka,
              working globally.
            </p>

            <div className="space-y-4">
              {[
                { label: "GITHUB", value: "github.com/Geethakash", href: "https://github.com/Geethakash" },
                { label: "LINKEDIN", value: "linkedin.com/in/geethakash", href: "https://linkedin.com/in/geethakash" },
                { label: "EMAIL", value: "hello@geethakash.com", href: "mailto:hello@geethakash.com" },
              ].map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 border-b border-white/7 py-4 hover:border-[#aaff00]/20 transition-colors"
                >
                  <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest w-20 flex-shrink-0">
                    {label}
                  </span>
                  <span className="font-mono text-sm text-foreground group-hover:text-volt transition-colors">
                    {value}
                  </span>
                  <span className="ml-auto text-volt opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs">→</span>
                </a>
              ))}
            </div>

            {/* Availability */}
            {/* <div className="flex items-center gap-3">
              <motion.div
                className="size-2 rounded-full bg-volt"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-xs text-foreground/60 uppercase tracking-widest">
                Available for full-time &amp; freelance
              </span>
            </div> */}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start gap-4 py-12"
              >
                <CheckCircle size={32} className="text-volt" />
                <h3 className="text-surgical-white font-medium text-xl">Message sent.</h3>
                <p className="text-sm text-foreground">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: "contact-name", label: "NAME", type: "text", key: "name", placeholder: "John Doe" },
                  { id: "contact-email", label: "EMAIL", type: "email", key: "email", placeholder: "john@example.com" },
                ].map(({ id, label, type, key, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block font-mono text-[10px] text-foreground/60 uppercase tracking-widest mb-2">
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      required
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 bg-[#111116] border border-white/7 text-surgical-white placeholder:text-surgical-white/40 text-sm font-mono focus:outline-none focus:border-[#aaff00]/30 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" className="block font-mono text-[10px] text-foreground/60 uppercase tracking-widest mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or just say hi..."
                    className="w-full px-4 py-3 bg-[#111116] border border-white/7 text-surgical-white placeholder:text-surgical-white/40 text-sm font-mono focus:outline-none focus:border-[#aaff00]/30 transition-colors resize-none"
                  />
                </div>
                <motion.button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-7 py-3 bg-volt text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#c8ff4d] transition-colors disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? (
                    <>
                      <motion.span
                        className="w-3 h-3 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
