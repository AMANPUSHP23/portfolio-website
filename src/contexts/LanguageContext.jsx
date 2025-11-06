import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

/**
 * Translations object
 */
const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      timeline: 'Timeline',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      testimonials: 'Testimonials',
      contact: 'Contact'
    },
    // Hero Section
    hero: {
      greeting: "I'm",
      subtitle: 'Cloud & DevOps Engineer specializing in CI/CD pipelines, automation, and scalable infrastructure.',
      availability: 'Available for new opportunities',
      viewWork: 'View My Work',
      downloadResume: 'Download Resume',
      scrollDown: 'Scroll to about section'
    },
    // About Section
    about: {
      title: 'About Me',
      description: 'Get to know me better',
      yearsExperience: 'Years Experience',
      projectsCompleted: 'Projects Completed',
      technologiesMastered: 'Technologies Mastered',
      certifications: 'Certifications'
    },
    // Skills Section
    skills: {
      title: 'Skills & Technologies',
      description: 'Technologies I work with',
      categories: {
        all: 'All',
        cloud: 'Cloud & DevOps',
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        tools: 'Tools'
      }
    },
    // Projects Section
    projects: {
      title: 'My Projects',
      description: 'A showcase of my Cloud & DevOps infrastructure projects and Full Stack MERN applications.',
      categories: {
        all: 'All',
        cloudDevOps: 'Cloud & DevOps',
        fullStack: 'Full Stack (MERN)'
      },
      viewLive: 'View Live',
      viewCode: 'View Code',
      comingSoon: 'Coming Soon'
    },
    // Experience Section
    experience: {
      title: 'Work Experience',
      description: 'My professional journey',
      present: 'Present',
      viewDetails: 'View Details'
    },
    // Testimonials Section
    testimonials: {
      title: 'Testimonials',
      description: 'What people say about my work'
    },
    // Contact Section
    contact: {
      title: 'Get In Touch',
      description: "Have a project in mind or just want to say hi? Fill out the form or use the contact details below. I'm looking forward to hearing from you!",
      form: {
        name: 'Your Name',
        namePlaceholder: 'John Doe',
        email: 'Your Email',
        emailPlaceholder: 'john@example.com',
        subject: 'Subject',
        subjectPlaceholder: 'Project Inquiry',
        message: 'Your Message',
        messagePlaceholder: 'Tell me about your project...',
        send: 'Send Message',
        sending: 'Sending...'
      },
      success: 'Message Sent!',
      successDescription: "Thanks for reaching out. I'll get back to you soon.",
      error: 'Error Sending Message',
      incompleteForm: 'Incomplete Form',
      incompleteFormDescription: 'Please fill in all fields.',
      invalidEmail: 'Invalid Email',
      invalidEmailDescription: 'Please enter a valid email address.'
    },
    // Newsletter Section
    newsletter: {
      title: 'Stay Updated',
      description: 'Subscribe to my newsletter for the latest updates on Cloud & DevOps',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      subscribing: 'Subscribing...'
    },
    // Footer
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Built with',
      and: 'and',
      tagline: 'Crafting scalable cloud solutions'
    },
    // Timeline Section
    timeline: {
      title: 'My Journey',
      description: 'Education and career milestones'
    },
    // Common
    common: {
      loading: 'Loading...',
      learnMore: 'Learn More',
      readMore: 'Read More',
      viewAll: 'View All',
      backToTop: 'Back to Top',
      close: 'Close',
      open: 'Open',
      menu: 'Menu',
      language: 'Language'
    }
  },
  hi: {
    // Navigation
    nav: {
      home: 'होम',
      about: 'परिचय',
      timeline: 'समयरेखा',
      skills: 'कौशल',
      projects: 'परियोजनाएं',
      experience: 'अनुभव',
      testimonials: 'प्रशंसापत्र',
      contact: 'संपर्क'
    },
    // Hero Section
    hero: {
      greeting: "मैं हूँ",
      subtitle: 'Cloud & DevOps इंजीनियर, CI/CD पाइपलाइन, स्वचालन और स्केलेबल इंफ्रास्ट्रक्चर में विशेषज्ञता।',
      availability: 'नए अवसरों के लिए उपलब्ध',
      viewWork: 'मेरा काम देखें',
      downloadResume: 'रिज्यूमे डाउनलोड करें',
      scrollDown: 'परिचय अनुभाग पर स्क्रॉल करें'
    },
    // About Section
    about: {
      title: 'मेरे बारे में',
      description: 'मुझे बेहतर जानें',
      yearsExperience: 'वर्षों का अनुभव',
      projectsCompleted: 'पूर्ण परियोजनाएं',
      technologiesMastered: 'महारत हासिल तकनीकें',
      certifications: 'प्रमाणपत्र'
    },
    // Skills Section
    skills: {
      title: 'कौशल और प्रौद्योगिकियां',
      description: 'मैं जिन तकनीकों के साथ काम करता हूं',
      categories: {
        all: 'सभी',
        cloud: 'क्लाउड और DevOps',
        frontend: 'फ्रंटएंड',
        backend: 'बैकएंड',
        database: 'डेटाबेस',
        tools: 'उपकरण'
      }
    },
    // Projects Section
    projects: {
      title: 'मेरी परियोजनाएं',
      description: 'मेरी Cloud & DevOps इंफ्रास्ट्रक्चर परियोजनाओं और Full Stack MERN एप्लिकेशन का प्रदर्शन।',
      categories: {
        all: 'सभी',
        cloudDevOps: 'क्लाउड और DevOps',
        fullStack: 'Full Stack (MERN)'
      },
      viewLive: 'लाइव देखें',
      viewCode: 'कोड देखें',
      comingSoon: 'जल्द आ रहा है'
    },
    // Experience Section
    experience: {
      title: 'कार्य अनुभव',
      description: 'मेरी पेशेवर यात्रा',
      present: 'वर्तमान',
      viewDetails: 'विवरण देखें'
    },
    // Testimonials Section
    testimonials: {
      title: 'प्रशंसापत्र',
      description: 'लोग मेरे काम के बारे में क्या कहते हैं'
    },
    // Contact Section
    contact: {
      title: 'संपर्क करें',
      description: 'क्या आपके मन में कोई परियोजना है या बस नमस्ते कहना चाहते हैं? फॉर्म भरें या नीचे संपर्क विवरण का उपयोग करें। मैं आपसे सुनने के लिए उत्सुक हूं!',
      form: {
        name: 'आपका नाम',
        namePlaceholder: 'राज कुमार',
        email: 'आपका ईमेल',
        emailPlaceholder: 'raj@example.com',
        subject: 'विषय',
        subjectPlaceholder: 'परियोजना पूछताछ',
        message: 'आपका संदेश',
        messagePlaceholder: 'मुझे अपनी परियोजना के बारे में बताएं...',
        send: 'संदेश भेजें',
        sending: 'भेजा जा रहा है...'
      },
      success: 'संदेश भेजा गया!',
      successDescription: 'संपर्क करने के लिए धन्यवाद। मैं जल्द ही आपसे संपर्क करूंगा।',
      error: 'संदेश भेजने में त्रुटि',
      incompleteForm: 'अधूरा फॉर्म',
      incompleteFormDescription: 'कृपया सभी फ़ील्ड भरें।',
      invalidEmail: 'अमान्य ईमेल',
      invalidEmailDescription: 'कृपया एक मान्य ईमेल पता दर्ज करें।'
    },
    // Newsletter Section
    newsletter: {
      title: 'अपडेट रहें',
      description: 'Cloud & DevOps पर नवीनतम अपडेट के लिए मेरे न्यूज़लेटर की सदस्यता लें',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      subscribe: 'सदस्यता लें',
      subscribing: 'सदस्यता ली जा रही है...'
    },
    // Footer
    footer: {
      rights: 'सर्वाधिकार सुरक्षित।',
      builtWith: 'के साथ बनाया गया',
      and: 'और',
      tagline: 'स्केलेबल क्लाउड समाधान तैयार करना'
    },
    // Timeline Section
    timeline: {
      title: 'मेरी यात्रा',
      description: 'शिक्षा और करियर मील के पत्थर'
    },
    // Common
    common: {
      loading: 'लोड हो रहा है...',
      learnMore: 'और जानें',
      readMore: 'और पढ़ें',
      viewAll: 'सभी देखें',
      backToTop: 'शीर्ष पर वापस',
      close: 'बंद करें',
      open: 'खोलें',
      menu: 'मेनू',
      language: 'भाषा'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to 'en'
    return localStorage.getItem('preferred-language') || 'en';
  });

  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem('preferred-language', language);
    // Set HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    // Fallback to English if translation not found
    if (!value) {
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
        if (!value) break;
      }
    }
    
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
