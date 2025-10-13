
import React, { useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

const CustomForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.indexOf('@') > -1) {
      onValidated({ EMAIL: email });
    } else {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    if (status === "success") {
      toast({
        title: "Subscribed!",
        description: "Thanks for subscribing to the newsletter!",
      });
      setEmail('');
    }
    if (status === "error") {
      toast({
        title: "Subscription Error",
        description: typeof message === 'string' && message.includes("already subscribed") ? "You are already subscribed!" : "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  }, [status, message, toast]);


  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto">
      <div className="relative flex-grow">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="pl-10 h-12 text-base"
          aria-label="Email for newsletter"
        />
      </div>
      <Button 
        type="submit" 
        disabled={status === "sending"}
        className="h-12 text-base group shadow-lg hover:shadow-primary/30 transition-shadow duration-300 transform hover:scale-105"
      >
        {status === "sending" ? "Subscribing..." : "Subscribe"}
        {status !== "sending" && <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>}
      </Button>
    </form>
  );
};


const Newsletter = () => {
  // Temporarily hidden
  return null;
  const mailchimpUrl = import.meta.env.VITE_MAILCHIMP_URL;

  if (!mailchimpUrl) {
    return (
      <SectionWrapper id="newsletter" bgColor="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10">
        <div className="text-center py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600">Stay Updated!</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join the newsletter to get updates on new projects and articles.
          </p>
          <p className="text-sm text-destructive-foreground bg-destructive/80 p-3 rounded-md max-w-md mx-auto">
            Newsletter functionality is currently unavailable. Please configure Mailchimp URL in your environment variables (VITE_MAILCHIMP_URL).
          </p>
        </div>
      </SectionWrapper>
    );
  }
  
  return (
    <SectionWrapper id="newsletter" bgColor="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 dark:from-primary/20 dark:via-purple-600/20 dark:to-pink-600/20">
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600">Stay Updated!</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Join my newsletter to get the latest updates on new projects, articles, and tech insights directly to your inbox.
        </p>
        
        <MailchimpSubscribe
          url={mailchimpUrl}
          render={({ subscribe, status, message }) => (
            <form
              className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-4"
              onSubmit={e => {
                e.preventDefault();
                const email = e.target.elements.email.value;
                if (email && email.includes('@')) {
                  subscribe({ EMAIL: email });
                }
              }}
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="px-4 py-2 rounded border border-border focus:border-primary outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
              {status === 'sending' && <span className="text-xs text-muted-foreground ml-2">Sending...</span>}
              {status === 'error' && <span className="text-xs text-red-500 ml-2" dangerouslySetInnerHTML={{ __html: message }} />}
              {status === 'success' && <span className="text-xs text-green-500 ml-2">Subscribed!</span>}
            </form>
          )}
        />
        <p className="text-xs text-muted-foreground mt-4">
          No spam, ever. Unsubscribe at any time.
        </p>
      </motion.div>
    </SectionWrapper>
  );
};

export default Newsletter;
