import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import CTA from '../components/home/CTA';
import Footer from '../components/layout/Footer';

const CustomerIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const DealIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const AIIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const AnalyticsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const TaskIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const SecureIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.618-5.618A12.02 12.02 0 0012 16.5a12.02 12.02 0 005.618-1.583l-5.618-5.62z" /></svg>;

const features1 = [
  { icon: <CustomerIcon />, title: 'Customer Management', description: 'Organize and track all customer information, communication history, and interactions in one place.' },
  { icon: <DealIcon />, title: 'Deal Pipeline', description: 'Visual deal tracking through customizable stages with real-time progress monitoring.' },
  { icon: <AIIcon />, title: 'AI Assistant', description: 'Get insights and assistance with our AI-powered chatbot for smarter decision making.' },
];

const features2 = [
  { icon: <AnalyticsIcon />, title: 'Analytics & Reports', description: 'Comprehensive dashboards and reports to track performance and identify opportunities.' },
  { icon: <TaskIcon />, title: 'Task Management', description: 'Organize tasks, set reminders, and never miss important follow-ups with customers.' },
  { icon: <SecureIcon />, title: 'Secure & Reliable', description: 'Enterprise-grade security with reliable data backup and 99.9% uptime guarantee.' },
];

const HomePage = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features title="Everything You Need to Succeed" subtitle="Powerful features designed to streamline your sales process" features={features1} />
        <Features title="" subtitle="" features={features2} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;