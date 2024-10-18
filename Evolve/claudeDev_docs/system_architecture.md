# System Architecture

## Overview
Evolve AI is a web application built with Next.js, focusing on personal growth and development. It incorporates AI-driven journaling and voice interaction features.

## High-Level Architecture

```
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|  Next.js Frontend|<--->|  Next.js API     |<--->|  MongoDB Database|
|                  |     |  (Backend)       |     |                  |
+------------------+     +------------------+     +------------------+
         ^                        ^                        ^
         |                        |                        |
         v                        v                        v
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|  NextAuth.js     |     |  Stripe Payment  |     |  Hume AI         |
|  (Authentication)|     |  Integration     |     |  Integration     |
|                  |     |                  |     |                  |
+------------------+     +------------------+     +------------------+
```

## Components

### Frontend (Next.js with TypeScript)
- Utilizes Next.js for server-side rendering and routing
- Implements responsive design with TailwindCSS
- Key pages/components:
  - Homepage
  - Dashboard
  - Journaling Session
  - Voice Session
  - Blog

### Backend (Next.js API Routes)
- Handles API requests and business logic
- Integrates with external services (Stripe, Hume AI)
- Manages database operations

### Database (MongoDB)
- Stores user data, journal entries, and application state
- Utilizes Mongoose for object modeling

### Authentication (NextAuth.js)
- Manages user authentication and session handling
- Supports various authentication providers

### Payment Processing (Stripe)
- Handles subscription management and payment processing

### AI Integration (Hume AI)
- Provides AI-driven insights for journaling and voice sessions
- Incorporates selected journal entry context into voice sessions
- Uses VoiceProvider component for managing AI interactions

## Data Flow
1. User interacts with the Next.js frontend
2. Frontend makes API calls to Next.js API routes
3. API routes interact with MongoDB for data persistence
4. Journal entries are fetched and displayed for selection before voice sessions
5. Selected journal entry context is passed to the Hume AI VoiceProvider
6. External services (Stripe, Hume AI) are called as needed
7. AI responses are generated based on the provided journal context
8. Results are returned to the frontend for display

## Security Considerations
- HTTPS for all communications
- JWT for secure authentication
- Input validation and sanitization
- Proper error handling and logging
- Regular security audits and updates
- Ensure journal entry data is securely handled when passed to AI services

## Scalability
- Utilize serverless functions for API routes
- Implement caching strategies
- Consider using a CDN for static assets
- Database indexing and query optimization
- Optimize journal entry fetching and context processing for performance

## New Feature: Journal Context in Voice Sessions
- The `useJournalEntries` hook fetches journal entries from the database
- Users can select a specific journal entry before starting a voice session
- The selected journal entry's content is passed as context to the Hume AI VoiceProvider
- This context allows the AI to provide more personalized and relevant responses during the voice session

This document will be updated as the architecture evolves and new components are added.
