import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { DialogflowService, createDialogflowService } from "./dialogflow";
import { createGitHubRepository, uploadFilesToRepository } from "./github";
import fs from 'fs';
import path from 'path';
import express from 'express';

// Theme interface to match theme.json format
interface Theme {
  primary: string;
  variant: 'professional' | 'tint' | 'vibrant';
  appearance: 'light' | 'dark' | 'system';
  radius: number;
}

// Chat interfaces
interface ChatRequest {
  message: string;
  sessionId: string;
}

// Initialize Dialogflow service with environment variables
let dialogflowService: DialogflowService | null = null;

// Rule-based chatbot responses for when Dialogflow is not available
function getRuleBasedResponse(message: string): any {
  const lowerMessage = message.toLowerCase();
  
  // Define response patterns
  const responses = [
    {
      keywords: ['hello', 'hi', 'hey', 'start', 'help'],
      response: "Hello! I'm Conversofy's AI assistant. I'm here to help you with questions about our customer service solutions. How can I assist you today?"
    },
    {
      keywords: ['price', 'pricing', 'cost', 'how much', 'plan'],
      response: "Our solutions are customized based on your business needs and size. We offer flexible packages for small businesses, medium enterprises, and large corporations. Would you like to schedule a consultation to discuss pricing options that fit your requirements?"
    },
    {
      keywords: ['feature', 'what do', 'capability', 'function'],
      response: "Conversofy offers automated customer support, multi-channel integration, custom knowledge base setup, and seamless handoff to human agents when needed. What specific features are you most interested in learning about?"
    },
    {
      keywords: ['contact', 'support', 'help', 'talk to someone'],
      response: "You can reach our support team at hello@conversofy.com or call us at +1 (724) 221-9876. We're available Monday through Friday, 8am to 5pm. Is there something specific I can help you with right now?"
    },
    {
      keywords: ['get started', 'begin', 'start', 'sign up'],
      response: "Great! To get started with Conversofy, I'd recommend scheduling a consultation where we can discuss your specific customer service needs. Would you like me to help you with that?"
    },
    {
      keywords: ['small business', 'startup', 'smb'],
      response: "Perfect! We have specialized solutions for small businesses. Our platform handles common customer inquiries, appointment scheduling, and product information requests so you can focus on running your business. Would you like to learn more about our small business package?"
    },
    {
      keywords: ['enterprise', 'large business', 'corporation'],
      response: "Excellent! Our enterprise solutions handle high volumes while maintaining quality. We offer advanced analytics, reporting, and multi-language support. Would you like to learn more about our enterprise package?"
    },
    {
      keywords: ['integration', 'connect', 'api'],
      response: "Conversofy integrates with popular platforms like CRM systems, email, chat, and phone support. We also offer API integrations for custom solutions. What systems are you currently using for customer service?"
    }
  ];

  // Find matching response
  for (const pattern of responses) {
    if (pattern.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        response: pattern.response,
        intent: 'rule-based',
        confidence: 0.8,
        source: 'rule-based'
      };
    }
  }

  // Default response
  return {
    response: "I understand you're asking about something specific. While I don't have detailed information about that particular topic, I'd be happy to connect you with our team who can provide comprehensive answers. You can reach us at hello@conversofy.com or would you like to schedule a consultation?",
    intent: 'default',
    confidence: 0.5,
    source: 'rule-based'
  };
}

// Initialize Dialogflow if credentials are provided
if (process.env.GOOGLE_CLOUD_PROJECT_ID) {
  try {
    dialogflowService = createDialogflowService({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      sessionId: 'default-session',
      languageCode: 'en',
    });
    console.log("Dialogflow service initialized successfully");
  } catch (error) {
    console.warn("Dialogflow initialization failed:", error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve attached assets
  app.use('/attached_assets', express.static(path.resolve('./attached_assets')));
  
  // Chat API endpoint
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, sessionId }: ChatRequest = req.body;
      
      if (!message || !message.trim()) {
        return res.status(400).json({ error: "Message is required" });
      }

      // If Dialogflow is configured, use it
      if (dialogflowService) {
        try {
          // Create a session-specific service instance
          const sessionService = createDialogflowService({
            projectId: process.env.GOOGLE_CLOUD_PROJECT_ID!,
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            sessionId: sessionId || `session-${Date.now()}`,
            languageCode: 'en',
          });

          const result = await sessionService.detectIntent(message);
          
          res.json({
            response: result.fulfillmentText,
            intent: result.intent,
            confidence: result.confidence,
            source: 'dialogflow'
          });
        } catch (dialogflowError) {
          console.error("Dialogflow error:", dialogflowError);
          // Fallback to rule-based responses
          res.json(getRuleBasedResponse(message));
        }
      } else {
        // Use rule-based responses when Dialogflow is not configured
        res.json(getRuleBasedResponse(message));
      }
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ 
        error: "Sorry, I'm having trouble processing your request. Please try again or contact our support team.",
        source: 'error'
      });
    }
  });

  // Dialogflow webhook endpoint
  app.post("/api/dialogflow-webhook", async (req: Request, res: Response) => {
    if (dialogflowService) {
      await dialogflowService.handleWebhook(req, res);
    } else {
      res.status(503).json({
        fulfillmentText: "Chatbot service is currently unavailable. Please contact our support team at hello@conversofy.com.",
        source: 'webhook-unavailable'
      });
    }
  });

  // API endpoint to get current theme
  app.get("/api/theme", (_req, res) => {
    try {
      const themePath = path.resolve('./theme.json');
      const themeData = JSON.parse(fs.readFileSync(themePath, 'utf8'));
      res.json(themeData);
    } catch (error) {
      console.error('Error reading theme file:', error);
      res.status(500).json({ error: 'Failed to read theme data' });
    }
  });

  // API endpoint to update theme
  app.post("/api/theme", (req: Request, res: Response) => {
    try {
      const themePath = path.resolve('./theme.json');
      const themeData: Theme = req.body;
      
      // Validate theme data
      if (!themeData.primary || !themeData.variant || !themeData.appearance) {
        return res.status(400).json({ error: 'Invalid theme data' });
      }
      
      // Write updated theme to file
      fs.writeFileSync(themePath, JSON.stringify(themeData, null, 2));
      
      res.json({ success: true, message: 'Theme updated successfully' });
    } catch (error) {
      console.error('Error updating theme:', error);
      res.status(500).json({ error: 'Failed to update theme' });
    }
  });

  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { fullName, email, company, phone, message } = req.body;
      
      // Validate required fields
      if (!fullName || !email || !company || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields' 
        });
      }
      
      // Here you would typically store the contact info or send an email
      // For now, we'll just log it and return success
      console.log('Contact form submission:', { fullName, email, company, phone, message });
      
      res.status(200).json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while processing your request' 
      });
    }
  });

  // GitHub repository creation endpoint
  app.post('/api/create-github-repo', async (req, res) => {
    try {
      const { name, description, isPrivate = false } = req.body;
      
      if (!name || !description) {
        return res.status(400).json({ 
          success: false, 
          message: 'Repository name and description are required' 
        });
      }

      const result = await createGitHubRepository(name, description, isPrivate);
      
      if (result.success) {
        res.json({
          success: true,
          message: 'Repository created successfully',
          repository: result.repository,
          url: result.url
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      console.error('Error creating GitHub repository:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while creating the repository' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
