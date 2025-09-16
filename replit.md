# Overview

This is a customer service automation platform called Conversofy that provides AI-powered chatbots and customer service solutions for businesses of all sizes. The application features a modern React/Vite frontend with a Node.js/Express backend, focusing on simplifying customer service operations through both rule-based responses and optional Google Dialogflow integration.

The platform serves as both a marketing website showcasing the service and a functional chat widget that can be integrated into client websites. The application targets small businesses, medium enterprises, and large corporations with tailored solutions for each segment.

# Recent Changes

## September 15, 2025
- Updated contact phone number to +1 (724) 221-9876 in About page
- Added "Try Our Virtual Agent" section to home page with interactive chat widget demo
- Completed comprehensive SEO optimization including React Helmet, structured data, Open Graph tags, and sitemap.xml
- Enhanced semantic HTML structure and accessibility attributes across all components

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state, React Context for global client state (themes, cookies, loading states)
- **UI Components**: Radix UI primitives for accessibility-compliant components
- **Build System**: Vite with custom plugins for theme handling and runtime error overlays

## Backend Architecture  
- **Runtime**: Node.js with Express.js framework using ESM modules
- **API Design**: RESTful endpoints with JSON responses
- **Session Management**: Express sessions with PostgreSQL session store
- **Middleware**: Custom logging, JSON parsing, error handling
- **Development**: Hot module replacement via Vite middleware integration

## Chat System Architecture
- **Dual Response System**: Rule-based fallback with optional Dialogflow integration
- **Session Persistence**: User conversations maintained across interactions
- **Widget Integration**: Embeddable chat widget for client websites
- **Real-time Features**: Typing indicators and message threading

## Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Database migrations handled via Drizzle Kit
- **Session Storage**: PostgreSQL session store via connect-pg-simple
- **Development**: In-memory storage fallback for development environments

## Design System
- **Theme System**: Dynamic theme switching with HSL color spaces
- **Component Library**: Custom components built on Radix UI primitives
- **Animation**: CSS animations with performance optimizations
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

# External Dependencies

## Google Cloud Services
- **Dialogflow API**: Advanced natural language processing for chat interactions
- **Service Account Authentication**: JSON key file-based authentication for Dialogflow integration
- **Cloud Resource Manager API**: Project and resource management

## Database Services
- **PostgreSQL**: Primary database via Neon serverless PostgreSQL (@neondatabase/serverless)
- **Session Store**: PostgreSQL-backed session persistence

## UI/UX Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library with design system
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast bundling for production backend builds
- **TSX**: TypeScript execution for development server
- **Vite Plugins**: Theme handling, runtime error overlay, and development tooling

## Business Logic Integration
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date manipulation
- **Utilities**: clsx and class-variance-authority for conditional styling