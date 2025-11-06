import React, { useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ArchitectureDiagram from '@/components/diagrams/ArchitectureDiagram';
import ArchitecturePlayground from '@/components/diagrams/ArchitecturePlayground';
import { awsArchitecture, cicdPipeline, kubernetesArchitecture } from '@/data/architectureDiagrams';
import { motion } from 'framer-motion';
import { Cloud, GitBranch, Container, Sparkles } from 'lucide-react';

const Architecture = () => {
  const [activeTab, setActiveTab] = useState('aws');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Hide on tablets and phones
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render on mobile devices
  if (isMobile) {
    return null;
  }

  const tabs = [
    { id: 'aws', label: 'AWS Architecture', icon: Cloud, data: awsArchitecture, type: 'diagram' },
    { id: 'cicd', label: 'CI/CD Pipeline', icon: GitBranch, data: cicdPipeline, type: 'diagram' },
    { id: 'k8s', label: 'Kubernetes', icon: Container, data: kubernetesArchitecture, type: 'diagram' },
    { id: 'playground', label: 'Build Your Own', icon: Sparkles, type: 'playground' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <SectionWrapper id="architecture" className="py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            DevOps Architecture
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive cloud infrastructure diagrams showcasing my technical expertise in AWS, CI/CD, and Kubernetes
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-8 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-card border border-border hover:border-primary/50 hover:scale-105'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Diagram/Playground Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          variants={itemVariants}
        >
          {tabs.find((t) => t.id === activeTab).type === 'playground' ? (
            <div className="max-w-7xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Interactive Architecture Playground
              </h3>
              <ArchitecturePlayground />
            </div>
          ) : (
            <ArchitectureDiagram
              nodes={tabs.find((t) => t.id === activeTab).data.nodes}
              edges={tabs.find((t) => t.id === activeTab).data.edges}
              title={tabs.find((t) => t.id === activeTab).label}
              className="max-w-5xl mx-auto"
            />
          )}
        </motion.div>

        {/* Instructions */}
        {activeTab !== 'playground' && (
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p className="flex items-center justify-center gap-2 flex-wrap">
              <span>💡 Tip:</span>
              <span>Hover over components for details</span>
              <span>•</span>
              <span>Drag to pan</span>
              <span>•</span>
              <span>Scroll to zoom</span>
            </p>
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  );
};

export default Architecture;
