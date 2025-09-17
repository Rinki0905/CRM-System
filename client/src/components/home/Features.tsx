import React, { type JSX } from 'react';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface FeaturesProps {
  title: string;
  subtitle: string;
  features: Feature[];
}

const Features: React.FC<FeaturesProps> = ({ title, subtitle, features }) => {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-600">{subtitle}</p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center items-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mx-auto">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;