import { Check } from "lucide-react";
import teamImage from "../assets/team-image.jpg";
import ParallaxSectionTitle from "./ParallaxSectionTitle";
import ParallaxLayer from "./ParallaxLayer";
import ScrollParallax from "./ScrollParallax";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background parallax elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParallaxLayer speed={-0.05} className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/5">
          <div></div>
        </ParallaxLayer>
        <ParallaxLayer speed={0.07} translateX={true} className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-primary/10">
          <div></div>
        </ParallaxLayer>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ParallaxSectionTitle 
          title="About Us"
          textColor="text-blue-500"
        />
        
        <div className="flex flex-col lg:flex-row gap-12 items-center mt-12">
          <ScrollParallax 
            className="lg:w-1/2" 
            speed={0.1} 
            direction="left"
          >
            <div>
              <p className="text-lg text-gray-700 mb-6">
                We founded Conversofy with a simple mission: make customer service accessible to businesses of all sizes without the complexity of traditional enterprise platforms.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our team combines technical expertise with customer service experience to create solutions that truly understand your business and your customers' needs.
              </p>
            </div>
          </ScrollParallax>
          
          <ParallaxLayer 
            className="lg:w-1/2" 
            speed={0.15}
            translateY={true}
          >
            <div className="relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 transform hover:scale-[1.02]">
              <img 
                src={teamImage} 
                alt="Team discussing customer service solutions" 
                className="w-full rounded-lg" 
                width="600" 
                height="400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70"></div>
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
};

export default About;
