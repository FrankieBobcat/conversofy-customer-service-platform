import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Bot, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { ChatWidget } from "./ChatWidget";

const TryVirtualAgent = () => {
  const [showChat, setShowChat] = useState(false);

  const handleTryAgent = () => {
    setShowChat(true);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[length:40px_40px]"></div>
      <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <Bot className="h-8 w-8 text-blue-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-yellow-900" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Try Our Virtual Agent
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the power of AI-driven customer service firsthand. Chat with our virtual agent 
            to see how it can resolve queries, provide instant support, and enhance your customer experience.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Instant Responses</h3>
                <p className="text-gray-400 text-sm">Get immediate answers to common questions</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Bot className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Smart Understanding</h3>
                <p className="text-gray-400 text-sm">Natural language processing that understands context</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Always Available</h3>
                <p className="text-gray-400 text-sm">24/7 support without any wait times</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={handleTryAgent}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              data-testid="button-try-virtual-agent"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Chatting Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-sm text-gray-400">
              No signup required • Try it for free • See how it works
            </p>
          </div>
        </div>
      </div>
      
      {/* Show ChatWidget when user clicks try */}
      {showChat && <ChatWidget position="bottom-right" defaultOpen />}
    </section>
  );
};

export default TryVirtualAgent;