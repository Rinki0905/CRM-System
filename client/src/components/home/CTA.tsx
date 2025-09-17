
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="bg-blue-300">
      <div className="container mx-auto px-6 py-16 text-center text-gray-900">
        <h2 className="text-3xl font-bold">Ready to Transform Your Sales Process?</h2>
        <p className="mt-2 max-w-xl mx-auto">
          Join thousands of businesses that trust CRM Pro to manage their customer relationships.
        </p>
        <Link to="/register">
          <button className="mt-8 bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
            Start Free Trial
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;