# Replit.md

## Overview

This is a full-stack web application called "MutualBook" - a professional networking platform designed for high-intent connections between ambitious professionals. The application uses a modern React frontend with Express backend, PostgreSQL database with Drizzle ORM, and shadcn/ui components for the UI.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React with TypeScript, Vite build system, shadcn/ui components
- **Backend**: Express.js with TypeScript, RESTful API architecture
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with custom design tokens and dark theme
- **Build Tools**: Vite for frontend bundling, esbuild for backend bundling

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables and design system
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Structure**: RESTful endpoints with `/api` prefix
- **Development**: Hot reload with tsx, production builds with esbuild

### Database Schema
Currently implements a basic user system:
- **Users table**: Basic user authentication with username/password
- **Schema**: Defined in `shared/schema.ts` using Drizzle schema builder
- **Types**: Auto-generated TypeScript types from schema
- **Validation**: Zod schemas for runtime validation

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle HTTP requests and responses
3. **Storage Layer**: Abstract storage interface allows for different implementations
4. **Database**: PostgreSQL database accessed through Drizzle ORM
5. **Response**: JSON responses sent back to client with proper error handling

The application currently uses an in-memory storage implementation for development, with the structure in place to easily swap to database-backed storage.

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive Radix UI component library
- **State Management**: TanStack Query for server state
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Forms**: React Hook Form, Hookform resolvers
- **Utilities**: clsx, date-fns, embla-carousel for UI functionality

### Backend Dependencies
- **Database**: Drizzle ORM with Neon Database serverless PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Development**: tsx for TypeScript execution, Replit-specific plugins

### Development Tools
- **Build**: Vite, esbuild, PostCSS with Tailwind
- **TypeScript**: Strict configuration with path mapping
- **Linting/Formatting**: ESLint configuration (implied by project structure)

## Deployment Strategy

The application is configured for multiple deployment scenarios:

### Development
- **Frontend**: Vite dev server with HMR and error overlay
- **Backend**: tsx with auto-reload on file changes
- **Database**: Database migrations with `drizzle-kit push`
- **Environment**: NODE_ENV=development with development-specific middleware

### Production
- **Build Process**: 
  1. Frontend built with Vite to `dist/public`
  2. Backend bundled with esbuild to `dist/index.js`
- **Static Files**: Express serves built frontend assets
- **Database**: Production PostgreSQL via DATABASE_URL environment variable
- **Process**: Single Node.js process serving both API and static files

### Replit Integration
- **Development**: Cartographer plugin for enhanced debugging
- **Error Handling**: Runtime error modal for development
- **Banner**: Development banner when accessed outside Replit

The architecture prioritizes developer experience with hot reload, type safety, and clear separation of concerns while maintaining simplicity for deployment and scaling.

## Recent Changes

### UI/UX Improvements (July 28, 2025)
- **Mobile Experience**: Increased hero section headline font size for better mobile readability
- **Navigation**: Removed floating invite button for mobile screens, keeping invite button only in navbar
- **Layout**: Made moving strips (ImpactStrip, ProfessionsScroller, SectorsScroller) full width without side padding across all screens
- **Components**: 
  - Increased HeroHighlights card width and capitalized headline text properly
  - Enhanced BenefitsSection cards with better width and removed "Achievement:" prefix
  - Fixed pricing section hover effects for desktop CTA buttons
- **Content Updates**: Updated testimonials in BenefitsSection to highlight scholarships, team building, and vision alignment success stories
- **Technical**: Fixed DOM nesting warnings by replacing inappropriate p > div structures with proper div containers
- **Repository Sync**: Successfully pushed all UI improvements to GitHub repository (197 objects, 549.16 KiB)