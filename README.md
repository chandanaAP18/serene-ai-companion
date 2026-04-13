# Serene AI Companion

An AI-powered companion for mental health and wellness support. This application provides users with personalized recommendations, breathing exercises, and 24/7 access to mental health guidance.

## Features

- 🤖 **AI-Powered Chat** - Intelligent conversations tailored to your wellness needs
- 🧘 **Breathing Exercises** - Guided exercises for stress relief and mindfulness
- 😊 **Mood Tracking** - Monitor and understand your emotional patterns
- 📊 **Personalized Recommendations** - Get suggestions based on your mood and history
- 🆘 **Emergency Support** - Quick access to crisis resources when needed
- 🔐 **Secure & Private** - Built with privacy in mind using Supabase

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Functions)
- **Testing**: Vitest

## Getting Started

### Prerequisites
- Node.js 18+
- Bun (recommended) or npm/yarn

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Supabase credentials
3. Install dependencies:
   ```bash
   bun install
   ```
4. Start the development server:
   ```bash
   bun run dev
   ```

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run test` - Run tests
- `bun run test:watch` - Run tests in watch mode
