import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

const CallToAction = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Form submission logic would go here
    // For now, reset the form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden text-white">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 opacity-95"></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-grid-white bg-[length:20px_20px]"></div>
        
        {/* Subtle blur circles */}
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            <span className="highlight-text-white hover:scale-105 inline-block transition-transform duration-300">Ready to simplify your customer service?</span>
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Let's discuss how we can build a custom solution that transforms your customer service operations.
          </p>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-blue-500 mb-6">Get in touch</h3>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700 mb-1">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700 mb-1">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gray-700 mb-1">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="message" className="text-gray-700 mb-1">How can we help?</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full"
                    placeholder="Tell us about your customer service needs"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Request a Consultation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
