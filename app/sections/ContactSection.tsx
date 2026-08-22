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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        console.error("Form submission failed:", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
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
                    <div className="group relative w-full">
                      <input
                        id={id}
                        name={key}
                        type={type}
                        required
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 bg-[#111116] border border-white/7 text-surgical-white placeholder:text-surgical-white/40 text-sm font-mono focus:outline-none transition-colors"
                      />
                      {/* Drawing Border SVG on Focus */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                          fill="none"
                          stroke="#aaff00"
                          strokeWidth="1.5"
                          pathLength="100"
                          className="[stroke-dasharray:100] [stroke-dashoffset:100] group-focus-within:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" className="block font-mono text-[10px] text-foreground/60 uppercase tracking-widest mb-2">
                    MESSAGE
                  </label>
                  <div className="group relative w-full">
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project or just say hi..."
                      className="w-full px-4 py-3 bg-[#111116] border border-white/7 text-surgical-white placeholder:text-surgical-white/40 text-sm font-mono focus:outline-none transition-colors resize-none block"
                    />
                    {/* Drawing Border SVG on Focus */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="none"
                        stroke="#aaff00"
                        strokeWidth="1.5"
                        pathLength="100"
                        className="[stroke-dasharray:100] [stroke-dashoffset:100] group-focus-within:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                    </svg>
                  </div>
                </div>
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="group relative flex items-center gap-2 px-7 py-3.5 bg-volt text-obsidian font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-300 disabled:opacity-60 overflow-hidden cursor-pointer"
                >
                  {/* Drawing Border SVG Overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="none"
                      stroke="#0a0a0f"
                      strokeWidth="2"
                      pathLength="100"
                      className="[stroke-dasharray:100] [stroke-dashoffset:100] group-hover:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </svg>
                  {loading ? (
                    <>
                      <motion.span
                        className="w-3 h-3 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      {/* Arrow Dispatch Send Icon Container */}
                      <div className="relative w-3.5 h-3.5 overflow-hidden flex items-center justify-center">
                        <Send
                          size={13}
                          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3.5 group-hover:-translate-y-3.5"
                        />
                        <Send
                          size={13}
                          className="absolute transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-3.5 translate-y-3.5 group-hover:translate-x-0 group-hover:translate-y-0"
                        />
                      </div>

                      {/* Split Flap Roll */}
                      <div className="relative flex flex-col items-center justify-center h-4 overflow-hidden">
                        <span className="text-obsidian transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                          Send Message
                        </span>
                        <span className="absolute text-obsidian font-extrabold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0">
                          Send Message
                        </span>
                      </div>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
