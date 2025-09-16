import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import OptimizedImage from "@/components/OptimizedImage";

type BlogPost = {
  image: string;
  category: string;
  categoryColor: string;
  date: string;
  title: string;
  description: string;
  customImageClass?: string;
};

const blogPosts: BlogPost[] = [
  {
    image: "/attached_assets/pexels-yankrukov-8867432.jpg",
    category: "Customer Service",
    categoryColor: "bg-primary/10 text-primary",
    date: "June 12, 2023",
    title: "5 Ways to Simplify Customer Service Operations",
    description: "Discover how modern solutions are transforming customer service and simplifying operations for businesses of all sizes."
  },
  {
    image: "/attached_assets/pexels-artempodrez-4492134.jpg",
    category: "Case Studies",
    categoryColor: "bg-secondary/10 text-secondary",
    date: "May 27, 2023",
    title: "Success Story: From Complex to Simple Customer Service",
    description: "Learn how businesses are transitioning from complex platforms to streamlined customer service solutions."
  },
  {
    image: "/attached_assets/pexels-pixabay-267392.jpg",
    category: "Small Business",
    categoryColor: "bg-accent/10 text-accent",
    date: "May 14, 2023",
    title: "How Small Businesses Can Compete with Enterprise Support",
    description: "Small business guide to implementing effective customer service solutions that rival large enterprises."
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">Latest Insights</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay up to date with the latest trends in simplified customer service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="card-hover border-none shadow-md overflow-hidden">
              <div className="relative w-full h-48 overflow-hidden">
                <OptimizedImage
                  src={post.image}
                  alt={`Blog post image: ${post.title}`}
                  width={640}
                  height={360}
                  className="absolute inset-0 w-full h-full"
                  objectFit="cover"
                  objectPosition="center"
                  overlay={true}
                  overlayColor="bg-gradient-to-t from-black/20 to-transparent"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <span className={`text-xs px-3 py-1 rounded-full ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <Link href="/blog" className="text-primary font-medium hover:underline">Read More →</Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button className="bg-primary hover:bg-primary/90">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Memoize the Blog component to prevent unnecessary re-renders
export default memo(Blog);
