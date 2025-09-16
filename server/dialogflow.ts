import { SessionsClient } from '@google-cloud/dialogflow';
import { Request, Response } from 'express';

export interface DialogflowConfig {
  projectId: string;
  keyFilename?: string;
  sessionId: string;
  languageCode: string;
}

export class DialogflowService {
  private sessionsClient: SessionsClient;
  private projectId: string;
  private sessionPath: string;

  constructor(config: DialogflowConfig) {
    this.projectId = config.projectId;
    
    // Initialize the Dialogflow client
    this.sessionsClient = new SessionsClient({
      keyFilename: config.keyFilename, // Path to service account key file
    });

    // Create the session path
    this.sessionPath = this.sessionsClient.projectAgentSessionPath(
      this.projectId,
      config.sessionId
    );
  }

  async detectIntent(query: string, languageCode: string = 'en'): Promise<any> {
    try {
      // The text query request
      const request = {
        session: this.sessionPath,
        queryInput: {
          text: {
            text: query,
            languageCode: languageCode,
          },
        },
      };

      // Send request to Dialogflow
      const [response] = await this.sessionsClient.detectIntent(request);
      
      return {
        query: response.queryResult?.queryText,
        intent: response.queryResult?.intent?.displayName,
        fulfillmentText: response.queryResult?.fulfillmentText,
        confidence: response.queryResult?.intentDetectionConfidence,
        parameters: response.queryResult?.parameters,
        allRequiredParamsPresent: response.queryResult?.allRequiredParamsPresent,
      };
    } catch (error) {
      console.error('Error in Dialogflow detectIntent:', error);
      throw new Error('Failed to process the query with Dialogflow');
    }
  }

  async handleWebhook(req: Request, res: Response) {
    try {
      const { queryResult } = req.body;
      
      // Extract intent and parameters from the request
      const intentName = queryResult.intent.displayName;
      const parameters = queryResult.parameters;
      const queryText = queryResult.queryText;

      let fulfillmentText = '';

      // Handle different intents
      switch (intentName) {
        case 'Default Welcome Intent':
          fulfillmentText = `Hi! I'm Conversofy's AI assistant. I'm here to help you with any questions about our customer service solutions. How can I assist you today?`;
          break;
          
        case 'GetStarted':
          fulfillmentText = `Great! To get started with Conversofy, I'd recommend scheduling a consultation where we can discuss your specific customer service needs. Would you like me to help you with that?`;
          break;
          
        case 'PricingInquiry':
          fulfillmentText = `Our solutions are customized based on your business needs and size. We offer flexible packages for small businesses, medium enterprises, and large corporations. Would you like to schedule a consultation to discuss pricing options that fit your requirements?`;
          break;
          
        case 'FeatureInquiry':
          fulfillmentText = `Conversofy offers automated customer support, multi-channel integration, custom knowledge base setup, and seamless handoff to human agents when needed. What specific features are you most interested in learning about?`;
          break;
          
        case 'SupportContact':
          fulfillmentText = `You can reach our support team at hello@conversofy.com or call us at +1 (234) 567-890. We're available Monday through Friday, 8am to 5pm. Is there something specific I can help you with right now?`;
          break;
          
        case 'BusinessSizeInquiry':
          if (parameters.businessSize) {
            const size = parameters.businessSize;
            fulfillmentText = `Perfect! We have specialized solutions for ${size}. Our platform scales to meet your needs whether you're handling dozens or thousands of customer inquiries. Would you like to learn more about our ${size} package?`;
          } else {
            fulfillmentText = `We work with businesses of all sizes - from small businesses to large enterprises. What size would best describe your business?`;
          }
          break;
          
        case 'IntegrationInquiry':
          fulfillmentText = `Conversofy integrates with popular platforms like CRM systems, email, chat, and phone support. We also offer API integrations for custom solutions. What systems are you currently using for customer service?`;
          break;
          
        default:
          fulfillmentText = `I understand you're asking about "${queryText}". While I don't have specific information about that, I'd be happy to connect you with our team who can provide detailed answers. You can reach us at hello@conversofy.com or would you like to schedule a consultation?`;
      }

      res.json({
        fulfillmentText: fulfillmentText,
        source: 'conversofy-webhook'
      });

    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({
        fulfillmentText: 'Sorry, I encountered an error. Please try again or contact our support team at hello@conversofy.com.',
        source: 'conversofy-webhook-error'
      });
    }
  }
}

// Create a default service instance
export const createDialogflowService = (config: DialogflowConfig): DialogflowService => {
  return new DialogflowService(config);
};