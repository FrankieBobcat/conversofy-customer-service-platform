import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ParallaxSectionTitle from "./ParallaxSectionTitle";
import ParallaxLayer from "./ParallaxLayer";
import ScrollParallax from "./ScrollParallax";

const steps = [
  {
    number: 1,
    title: "Discovery Call",
    description: "We learn about your business, your customers, and the specific service needs you're looking to simplify.",
    items: [
      "Understand your business goals",
      "Identify service opportunities"
    ]
  },
  {
    number: 2,
    title: "Custom Development",
    description: "We build and customize your solution using your business data, FAQs, and customer interaction patterns.",
    items: [
      "Solution customization",
      "Integration with your systems"
    ]
  },
  {
    number: 3,
    title: "Launch & Ongoing Support",
    description: "We deploy your customer service solution and provide continuous maintenance and improvements.",
    items: [
      "Monthly performance reports",
      "Continuous improvements"
    ]
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background parallax elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParallaxLayer speed={0.05} className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5">
          <div></div>
        </ParallaxLayer>
        <ParallaxLayer speed={0.08} className="absolute bottom-40 -left-20 w-80 h-80 rounded-full bg-primary/10">
          <div></div>
        </ParallaxLayer>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ParallaxSectionTitle 
          title="How It Works"
          subtitle="Our streamlined process gets your simplified customer service solution up and running with minimal effort from your team."
          textColor="text-blue-500"
          subtitleColor="text-gray-600"
        />
        
        {/* Fixed height container with flex to ensure equal height */}
        <div className="flex flex-col md:flex-row gap-10 mt-16 md:h-[560px]">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex">
              <ScrollParallax 
                key={step.number} 
                speed={0.1} 
                direction="up" 
                startOffset={20 * index}
                className="w-full flex flex-1"
              >
                <Card className="card-hover border-none shadow-md transition-all duration-300 hover:shadow-xl hover:bg-blue-100 hover:scale-105 transform group flex-1 flex flex-col">
                  <CardContent className="p-8 flex flex-col flex-1">
                    <div>
                      <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full mb-6 text-xl font-bold group-hover:bg-blue-700 transition-colors">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-800 transition-colors">{step.title}</h3>
                      <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors">{step.description}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-4 mt-auto group-hover:border-blue-200 transition-colors">
                      <ul className="space-y-2">
                        {step.items.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-6 w-6 text-secondary mr-2 flex-shrink-0 group-hover:text-blue-700 transition-colors" />
                            <span className="text-gray-600 group-hover:text-gray-800 transition-colors">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </ScrollParallax>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
