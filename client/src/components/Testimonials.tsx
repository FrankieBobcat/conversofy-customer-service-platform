import { Building, Building2, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const businessTypes = [
  {
    icon: <Building className="h-12 w-12 text-primary" />,
    title: "Small Businesses (SMB)",
    description: "Perfect for growing businesses with limited support resources. Our AI agent handles common customer inquiries, appointment scheduling, and product information requests so you can focus on running your business.",
    features: [
      "Handle customer FAQs automatically",
      "Schedule appointments and follow-ups", 
      "Provide product information instantly"
    ]
  },
  {
    icon: <Building2 className="h-12 w-12 text-primary" />,
    title: "Medium Enterprises (SME)",
    description: "Scale your customer service operations without building a large support team. Our solution integrates with your existing systems and provides consistent support across multiple channels.",
    features: [
      "Multi-channel support integration",
      "Custom knowledge base integration",
      "Seamless handoff to human agents when needed"
    ]
  },
  {
    icon: <Landmark className="h-12 w-12 text-primary" />,
    title: "Large Enterprises",
    description: "Enterprise-grade customer service automation that handles high volumes while maintaining quality. Reduce operational costs and improve customer satisfaction with our advanced AI solution.",
    features: [
      "Handle thousands of simultaneous inquiries",
      "Advanced analytics and reporting",
      "Multi-language and complex workflow support"
    ]
  }
];

const BusinessSolutions = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Solutions For Every Business Size</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Converso provides tailored AI customer service solutions for businesses of all sizes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessTypes.map((business, index) => (
            <Card key={index} className="card-hover border border-gray-200 shadow-sm">
              <CardContent className="p-8">
                <div className="mb-6 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    {business.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">{business.title}</h3>
                <p className="text-gray-700 mb-6">{business.description}</p>
                <ul className="space-y-2">
                  {business.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;
