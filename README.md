# Marina's Garden: Frontend Client 🌿

**Live Application:** [Play Marina's Garden](https://garden.thomaspercival.dev/)  
**Backend API Repository:** [Link to backend](https://github.com/tpercival01/Marinas-Garden-Backend/)

This is the frontend client for Marina's Digital Garden, an interactive web application that allows users to create and manage a virtual garden while tracking the care of their real-life plants. It is a fully responsive, decoupled Next.js application that communicates with a custom FastAPI backend.

## 🌟 Client Features

- **Interactive 3D Grid System**: A responsive 15-plot garden grid using Tailwind CSS gradients to simulate 3D terracotta planters and dug earth. Plant 2D sprites dynamically scale in size based on their growth stage (Sprout, Teen, Mature).
- **Tamagotchi-Style Mechanics**: The frontend calculates the time elapsed since the `last_watered` timestamp. Plants display dynamic "moods", and the UI actively pulses red when a plant passes its watering deadline.
- **Lore & Tutorial System**: A custom local-storage-based modal system that introduces the dark fantasy/whimsical aesthetic of the app and explains the mechanics on the first visit.
- **Frictionless Authentication**: Custom Supabase Auth implementation that allows users to claim a garden securely via a Username and Passcode.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks (useState, useEffect)
- **Hosting**: Vercel

## 🚀 Local Development Setup

To run the frontend client locally, you must also have the FastAPI backend running.

### 1. Install Dependencies
Navigate to the frontend directory and install the required Node packages:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```text
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```
*Note: If testing against your live Render backend, replace the local API URL with your Render URL.*

### 3. Start the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 🗺️ V2.0 Roadmap (Frontend Focus)
- **Photo Memories**: Build a UI within the Info Modal to allow users to upload photos of their real-world plants directly to a Supabase Storage bucket.
- **The Compost Graveyard**: Build a history tab to view the lifespan and AI facts of past uprooted plants.
- **PWA Push Notifications**: Implement a Service Worker to send lock-screen push notifications to mobile devices when a plant reaches the "Desperately parched" state.
