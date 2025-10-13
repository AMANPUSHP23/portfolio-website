
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast({
            title: "Invalid Email",
            description: "Please enter a valid email address.",
            variant: "destructive",
        });
        setIsSubmitting(false);
        return;
    }

    try {
      await emailjs.send(
        'service_xtnaqkn',
        'template_d8a7i4m',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        'A7MAYDiofVwUI6wkM'
      );
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Error Sending Message",
        description: error?.text || error?.message || "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
    })
  };

  const contactInfo = [
    { icon: <Mail className="h-6 w-6 text-primary" />, text: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` },
    { icon: <Phone className="h-6 w-6 text-primary" />, text: "+91-9178913222", href: "tel:+919178913222" },
    { icon: <MapPin className="h-6 w-6 text-primary" />, text: "Bangalore, India" },
  ];

  return (
    <SectionWrapper id="contact">
      <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col gap-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Fill out the form or use the contact details below. I'm looking forward to hearing from you!
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 w-full">
          {/* Contact Info + Socials */}
          <motion.div
            className="flex flex-col gap-8 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 }}}}
          >
            <div className="flex flex-col gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4"
                  variants={formItemVariants}
                  custom={index}
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    {info.icon}
                  </span>
                  {info.href ? (
                    <a href={info.href} className="text-foreground hover:text-primary transition-colors text-base font-medium break-all">{info.text}</a>
                  ) : (
                    <span className="text-foreground text-base font-medium break-all">{info.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="flex flex-row gap-5 justify-center mt-6">
              {siteConfig.socialLinks.github && (
                <a href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.427 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.238-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.349-1.088.635-1.338-2.221-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.652 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.38.202 2.398.1 2.652.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.565 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/></svg>
                </a>
              )}
              {siteConfig.socialLinks.linkedin && (
                <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5a6 6 0 0 1 6-6h8Zm-8 8V9a4 4 0 0 1 8 0v7"/><rect width="4" height="4" x="2" y="2" rx="1"/></svg>
                </a>
              )}
              {siteConfig.socialLinks.twitter && (
                <a href={siteConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 4.01c-.77.35-1.6.59-2.47.7A4.14 4.14 0 0 0 21.4 2.6a8.18 8.18 0 0 1-2.6 1 4.12 4.12 0 0 0-7.06 3.75A11.7 11.7 0 0 1 3.1 3.1a4.11 4.11 0 0 0 1.28 5.49c-.7-.02-1.36-.22-1.93-.53v.05a4.13 4.13 0 0 0 3.3 4.04c-.32.09-.66.13-1.01.13-.24 0-.47-.02-.69-.06a4.13 4.13 0 0 0 3.85 2.87A8.27 8.27 0 0 1 2 19.54c-.35 0-.7-.02-1.04-.06A11.69 11.69 0 0 0 8.29 21.98c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.18 8.18 0 0 0 22 4.01Z"/></svg>
                </a>
              )}
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 md:p-8 bg-card rounded-xl shadow-xl border border-border w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
          >
            <motion.div variants={formItemVariants} custom={0}>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
              <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Aman Pushp" required aria-label="Full Name" autoComplete="name" className="w-full mb-4" />
            </motion.div>
            <motion.div variants={formItemVariants} custom={1}>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
              <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="aman.pushp@example.com" required aria-label="Email Address" autoComplete="email" className="w-full mb-4" />
            </motion.div>
            <motion.div variants={formItemVariants} custom={2}>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
              <Input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" required aria-label="Subject" autoComplete="off" className="w-full mb-4" />
            </motion.div>
            <motion.div variants={formItemVariants} custom={3}>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
              <Textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Your message here..." required aria-label="Message" autoComplete="off" className="w-full mb-4" />
            </motion.div>
            <motion.div variants={formItemVariants} custom={4}>
              <Button type="submit" disabled={isSubmitting} className="w-full mt-2 group shadow-lg hover:shadow-primary/30 transition-shadow duration-300 transform hover:scale-105">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
