import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ParallaxBackground from "@/components/ParallaxBackground";
import ParallaxSectionTitle from "@/components/ParallaxSectionTitle";
import ParallaxLayer from "@/components/ParallaxLayer";
import { useEffect, useState, memo } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { SEO, createFAQSchema } from "@/components/SEO";

type BlogPost = {
  image: string;
  category: string;
  categoryColor: string;
  date: string;
  title: string;
  description: string;
  customImageClass?: string;
  tags?: string[];
  readTime?: string;
};

// Extended blog posts for the dedicated page
const blogPosts: BlogPost[] = [
  {
    image: "/attached_assets/pexels-yankrukov-8867432.jpg",
    category: "Customer Service",
    categoryColor: "bg-primary/10 text-primary",
    date: "June 12, 2023",
    title: "5 Ways to Simplify Customer Service Operations",
    description: "Discover how modern solutions are transforming customer service and simplifying operations for businesses of all sizes.",
    tags: ["Customer Support", "Business Operations", "Efficiency"],
    readTime: "6 min read"
  },
  {
    image: "/attached_assets/pexels-artempodrez-4492134.jpg",
    category: "Case Studies",
    categoryColor: "bg-secondary/10 text-secondary",
    date: "May 27, 2023",
    title: "Success Story: From Complex to Simple Customer Service",
    description: "Learn how businesses are transitioning from complex platforms to streamlined customer service solutions.",
    tags: ["Case Study", "Business Transformation", "Success Story"],
    readTime: "8 min read"
  },
  {
    image: "/attached_assets/pexels-pixabay-267392.jpg",
    category: "Small Business",
    categoryColor: "bg-accent/10 text-accent",
    date: "May 14, 2023",
    title: "How Small Businesses Can Compete with Enterprise Support",
    description: "Small business guide to implementing effective customer service solutions that rival large enterprises.",
    tags: ["Small Business", "Competitive Advantage", "Customer Support"],
    readTime: "5 min read"
  },
  {
    image: "/attached_assets/pexels-anton-8100-46924.jpg",
    category: "Technology",
    categoryColor: "bg-blue-500/10 text-blue-500",
    date: "April 28, 2023",
    title: "The Impact of AI on Modern Customer Service",
    description: "How artificial intelligence is reshaping customer service experiences while keeping the human touch.",
    tags: ["AI", "Technology", "Future Trends"],
    readTime: "7 min read"
  },
  {
    image: "/attached_assets/pexels-fauxels-3182781.jpg",
    category: "Industry Trends",
    categoryColor: "bg-purple-500/10 text-purple-500",
    date: "April 10, 2023",
    title: "Customer Service Trends to Watch in 2023",
    description: "The most important customer service trends and innovations that will shape business strategies this year.",
    tags: ["Trends", "Innovation", "Strategy"],
    readTime: "9 min read"
  },
  {
    image: "/attached_assets/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg",
    category: "Best Practices",
    categoryColor: "bg-green-500/10 text-green-500",
    date: "March 22, 2023",
    title: "Building Customer Loyalty Without Complex Systems",
    description: "Practical approaches to building lasting customer relationships using straightforward service strategies.",
    tags: ["Customer Loyalty", "Strategy", "Simplified Approach"],
    readTime: "6 min read"
  }
];

// Blog categories for filtering
const categories = [
  { name: "All", count: blogPosts.length },
  { name: "Customer Service", count: blogPosts.filter(post => post.category === "Customer Service").length },
  { name: "Case Studies", count: blogPosts.filter(post => post.category === "Case Studies").length },
  { name: "Small Business", count: blogPosts.filter(post => post.category === "Small Business").length },
  { name: "Technology", count: blogPosts.filter(post => post.category === "Technology").length },
  { name: "Industry Trends", count: blogPosts.filter(post => post.category === "Industry Trends").length },
  { name: "Best Practices", count: blogPosts.filter(post => post.category === "Best Practices").length }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showParallaxBg, setShowParallaxBg] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll to top when page is loaded and render parallax effects
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Show parallax background with slight delay
    setTimeout(() => {
      setShowParallaxBg(true);
    }, 500);
  }, []);

  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = activeCategory === "All" || post.category === activeCategory;
    const searchMatch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      false;
    
    return categoryMatch && (searchQuery === "" || searchMatch);
  });

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <SEO
        title="Customer Service Blog"
        description="Insights, strategies, and success stories for simplifying customer service operations. Learn how AI and automation can transform your business."
        keywords="customer service blog, business insights, AI automation, customer support strategies, customer service trends"
        type="website"
      />
      <Header />
      {showParallaxBg && <ParallaxBackground count={15} />}
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-black text-white overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32">
          {/* Background floating elements similar to Hero component */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating gradient circles with parallax */}
            <ParallaxLayer 
              speed={-0.15} 
              translateY={true} 
              scale={true}
              className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-sky-500/10 blur-3xl"
            >
              <div></div>
            </ParallaxLayer>
            
            <ParallaxLayer 
              speed={0.1} 
              translateY={true}
              className="absolute bottom-[20%] right-[5%] w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"
            >
              <div></div>
            </ParallaxLayer>
            
            <ParallaxLayer 
              speed={0.05} 
              translateY={true}
              className="absolute top-[40%] right-[20%] w-48 h-48 rounded-full bg-pink-500/10 blur-3xl"
            >
              <div></div>
            </ParallaxLayer>
            
            {/* Dot pattern overlay */}
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, rgba(56, 189, 248, 0.1) 2px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Conversofy <span className="highlight-text hover:scale-105 inline-block transition-transform duration-300 text-sky-500">Blog</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Insights, strategies, and success stories for simplifying customer service
              </p>
              
              {/* Search bar */}
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 pl-12 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Category filter */}
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
                    activeCategory === category.name
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name} <span className="opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog posts grid */}
        <section className="py-12 bg-[#fafafa] dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Card key={index} className="card-hover border-none shadow-md overflow-hidden dark:bg-gray-900 hover:shadow-xl transition-shadow duration-300">
                    <div className="relative w-full h-48 overflow-hidden">
                      <OptimizedImage 
                        src={post.image} 
                        alt={post.title} 
                        width={640}
                        height={360}
                        priority={false}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                        overlay={true}
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-3 py-1 rounded-full ${post.categoryColor}`}>
                          {post.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 dark:text-white">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags?.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{post.readTime}</span>
                        <a href="#" className="text-primary font-medium hover:underline">Read More →</a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4 dark:text-white">No articles found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We couldn't find any articles matching your search criteria.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
            
            {/* Pagination - simplified version */}
            {filteredPosts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex">
                  <button className="h-10 px-5 text-gray-600 dark:text-gray-300 transition-colors duration-150 bg-white dark:bg-gray-800 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Previous
                  </button>
                  <button className="h-10 px-5 text-white transition-colors duration-150 bg-primary border border-primary rounded-r-lg hover:bg-primary/90">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-blue-500">Stay Updated</h2>
              <p className="text-xl text-gray-300 mb-8">
                Subscribe to our newsletter to receive the latest insights and tips on customer service simplification.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-grow group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
                    transition-all duration-300 hover:bg-gray-700/50 group-hover:shadow-lg
                    animate-pulse-subtle"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg blur-sm transition-opacity duration-700"></div>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg
                  whitespace-nowrap transform transition-all duration-300 hover:scale-105 hover:shadow-lg 
                  relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 
                  transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                  <span className="relative flex items-center gap-2">
                    Subscribe 
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                      className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                    >
                      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </form>
              <p className="text-sm text-gray-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}