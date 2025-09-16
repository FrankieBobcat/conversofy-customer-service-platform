import { Building, Building2, Landmark, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useCallback } from "react";
import { BusinessSolutionSkeleton } from "./SkeletonLoader";
import { useLoading, useSectionLoading } from "../context/LoadingContext";

type BusinessIconType = "building" | "building2" | "landmark";

interface BusinessIconProps {
  icon: BusinessIconType;
  className?: string;
}

const BusinessIcon = ({ icon, className = "h-12 w-12 text-primary" }: BusinessIconProps) => {
  if (icon === "building") return <Building className={className} />;
  if (icon === "building2") return <Building2 className={className} />;
  if (icon === "landmark") return <Landmark className={className} />;
  return null;
};

interface BusinessType {
  icon: BusinessIconType;
  title: string;
  description: string;
  features: string[];
}

const businessTypes: BusinessType[] = [
  {
    icon: "building",
    title: "Small Businesses (SMB)",
    description: "Perfect for growing businesses with limited support resources. Our AI agent handles common customer inquiries, appointment scheduling, and product information requests so you can focus on running your business.",
    features: [
      "Handle customer FAQs automatically",
      "Schedule appointments and follow-ups", 
      "Provide product information instantly"
    ]
  },
  {
    icon: "building2",
    title: "Medium Enterprises (SME)",
    description: "Scale your customer service operations without building a large support team. Our solution integrates with your existing systems and provides consistent support across multiple channels.",
    features: [
      "Multi-channel support integration",
      "Custom knowledge base integration",
      "Seamless handoff to human agents when needed"
    ]
  },
  {
    icon: "landmark",
    title: "Large Enterprises",
    description: "Enterprise-grade customer service automation that handles high volumes while maintaining quality. Reduce operational costs and improve customer satisfaction with our advanced AI solution.",
    features: [
      "Handle thousands of simultaneous inquiries",
      "Advanced analytics and reporting",
      "Multi-language and complex workflow support"
    ]
  }
];

// Section ID for loading state
const SECTION_ID = "business-solutions";

const BusinessSolutions = () => {
  const { simulateLoading } = useLoading();
  const isLoading = useSectionLoading(SECTION_ID);
  const [hasTriggeredLoading, setHasTriggeredLoading] = useState(false);

  // This effect is used to demonstrate the skeleton loading when the component mounts
  // In a real application, you'd use this when fetching data, not just for demonstration
  useEffect(() => {
    // Only trigger loading simulation once
    if (!hasTriggeredLoading) {
      simulateLoading(SECTION_ID, 2500); // Show skeleton for 2.5 seconds
      setHasTriggeredLoading(true);
    }
  }, [simulateLoading, hasTriggeredLoading]);

  // Reset loading simulation when clicking a button (for demo purposes)
  const handleReloadDemo = useCallback(() => {
    simulateLoading(SECTION_ID, 2500);
  }, [simulateLoading]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">
            Solutions for <span className="hover:scale-105 inline-block transition-transform duration-300">Every Business Size</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conversofy provides tailored customer service solutions for businesses of all sizes.
          </p>
          
          {/* Demo button - This would be removed in production */}
          <button 
            onClick={handleReloadDemo} 
            className="mt-4 bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm px-3 py-1 rounded-full transition"
          >
            Demo Loading State
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading state
            <>
              <BusinessSolutionSkeleton />
              <BusinessSolutionSkeleton className="animate-delay-100" />
              <BusinessSolutionSkeleton className="animate-delay-200" />
            </>
          ) : (
            // Actual content
            businessTypes.map((business, index) => (
              <Card 
                key={index} 
                className="card-hover border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:bg-blue-100 hover:scale-105 transform group h-full"
              >
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4 group-hover:bg-blue-200 transition-colors">
                      <BusinessIcon icon={business.icon} className="h-12 w-12 text-primary group-hover:text-blue-700 transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4 group-hover:text-blue-800 transition-colors">{business.title}</h3>
                  <p className="text-gray-700 mb-6 group-hover:text-gray-800 transition-colors">{business.description}</p>
                  <ul className="space-y-2 mt-auto">
                    {business.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 group-hover:text-blue-700 transition-colors" />
                        <span className="text-gray-700 group-hover:text-gray-800 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;