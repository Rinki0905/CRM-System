import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-blue-300  pt-32 pb-20">
      <div className="container mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold 
        text-gray-900 leading-tight">
          Supercharge Your Customer Relationships
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Manage customers, track deals, and boost sales with our AI-powered CRM system. Everything you need to grow your business in one place.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/register">
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Get Started Free
            </button>
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;