import { PlusCircle, CheckCircle, Users } from "lucide-react";

const features = [
  {
    icon: <PlusCircle className="h-8 w-8 text-blue-500" />,
    background: "bg-blue-100",
    title: "Responsive Customer Service",
    description: "Never miss a customer inquiry with our simple, responsive solution."
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
    background: "bg-blue-100",
    title: "Streamlined Solution",
    description: "Focus on your business while our simple platform handles customer service without the complexity."
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    background: "bg-blue-100",
    title: "Custom Solutions",
    description: "Tailor-made solutions designed specifically for your unique business requirements."
  }
];

const FeatureHighlights = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "hsl(199 89% 48%)" }}>
            <span className="highlight-text hover:scale-105 inline-block transition-transform duration-300">Why Choose Conversofy</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our focused approach to customer service delivers better results with less complexity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg h-full">
              <div className={`rounded-full p-3 mb-4 ${feature.background}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
