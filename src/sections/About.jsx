
import React from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { motion } from 'framer-motion';
import { fadeIn } from '@/animations/fadeIn';
import { siteConfig } from '@/config/siteConfig';
import PremiumRect3DAvatar from '@/components/ui/PremiumRect3DAvatar';
import { Cloud, Server, Shield, Zap, Github, Linkedin, Mail, Phone, MapPin, Cog } from 'lucide-react';
import { projects } from '@/data/projects';


const About = () => {
  const highlights = [
    { icon: <Zap className="w-5 h-5" />, text: 'CI/CD Pipeline Expert', color: 'text-yellow-500' },
    { icon: <Cloud className="w-5 h-5" />, text: 'Cloud Infrastructure', color: 'text-blue-500' },
    { icon: <Shield className="w-5 h-5" />, text: 'Secure & Scalable', color: 'text-green-500' },
    { icon: <Cog className="w-5 h-5" />, text: 'Automation Expert', color: 'text-purple-500' },
  ];

  // Count Cloud & DevOps projects dynamically
  const devopsProjectsCount = projects.filter(project => project.category === "Cloud & DevOps").length;

  return (
    <SectionWrapper id="about" className="">
      <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
        <motion.div
          className="md:col-span-3 space-y-8"
          variants={fadeIn('right', 'tween', 0.2, 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600">
                About Me
              </h2>
            </motion.div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative pl-4 sm:pl-6 border-l-4 border-primary/30"
              >
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Hello! I'm <span className="font-bold text-foreground">{siteConfig.author}</span>, a{' '}
                  <span className="font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Cloud & DevOps Engineer
                  </span>{' '}
                  with expertise in <span className="font-semibold text-foreground">CI/CD pipelines, cloud infrastructure, and automation</span>. 
                  Proficient in <span className="font-semibold text-foreground">Docker, Kubernetes, Jenkins, and GitHub Actions</span>, with hands-on experience in <span className="font-semibold text-foreground">AWS cloud services</span>.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 p-4 sm:p-6 rounded-2xl border border-primary/10"
              >
                <p className="text-muted-foreground leading-relaxed">
                  Skilled in designing and managing{' '}
                  <span className="font-semibold text-foreground">Infrastructure as Code (Terraform)</span> to build{' '}
                  <span className="font-semibold text-foreground">scalable, secure, and high-performing</span> systems.
                  Experienced with <span className="font-semibold text-foreground">AWS services</span> including EC2, S3, RDS (Aurora MySQL), 
                  DynamoDB, Lambda, API Gateway, CloudFront, Elastic Beanstalk, and Route 53. 
                  Focused on delivering efficient, reliable, and automated software deployment solutions with 
                  <span className="font-semibold text-foreground">HTTPS, health checks, scaling, and cost optimization</span>.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-muted/30 border border-muted hover:border-primary/30 transition-all duration-300 hover:scale-105"
              >
                <div className={`${item.color}`}>{item.icon}</div>
                <span className="text-xs sm:text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="md:col-span-2 relative sticky top-24"
          variants={fadeIn('left', 'tween', 0.4, 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col items-center">
            {/* Main Card Container */}
            <div className="w-full bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 shadow-lg overflow-hidden">
              {/* Avatar Section */}
              <div className="relative p-8 pb-4">
                <div className="relative mx-auto w-fit">
                  <PremiumRect3DAvatar
                    src="/amanpushp.jpg"
                    alt="Portrait of Aman Pushp, Cloud & DevOps Engineer based in Bangalore"
                    className="max-w-full w-full h-auto md:max-w-[280px] md:h-auto mx-auto rounded-2xl shadow-xl"
                  />
                </div>
              </div>

              {/* Info Section */}
              <div className="px-8 pb-8 space-y-5">
                {/* Title */}
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-bold">{siteConfig.author}</h3>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white rounded-full shadow-lg">
                    <Cloud className="w-4 h-4" />
                    <span className="text-sm font-semibold">Cloud & DevOps Engineer</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground pt-1">
                    <MapPin className="w-3 h-3" />
                    <span>Bangalore, Karnataka</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/aman-pushp-b1a501223/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-muted/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/AMANPUSHP23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-muted/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:amanpushp3001@gmail.com"
                    className="p-2.5 rounded-lg bg-muted/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href="tel:9178913222"
                    className="p-2.5 rounded-lg bg-muted/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                    aria-label="Phone"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Server className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold">1+</p>
                    <p className="text-xs text-muted-foreground mt-1">Years Exp.</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Cloud className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold">{devopsProjectsCount}+</p>
                    <p className="text-xs text-muted-foreground mt-1">DevOps Projects</p>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-3">
                  <a
                    href={siteConfig.resumeUrl}
                    download
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                  
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-background/50 font-medium hover:bg-muted/50 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default About;
