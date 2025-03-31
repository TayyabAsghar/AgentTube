# ChatPDF - AI-Powered Document Assistant

## Overview

**AgentTube** is an AI-powered content creation assistant made with Next.JS that analyzes YouTube videos and enhances content generation using advanced AI models like Claude and Gemini. By providing a video link, users can generate transcripts, receive AI-suggested video titles, create improved or alternative scripts, and generate AI-powered thumbnails using OpenAI image generation model.

## Features

- 📄 **Analyze Youtube Videos** - Paste Youtube videos or shorts lik to start the analysis.
- 🤖 **AI Chat with Videos** - Get intelligent responses from your youtube videos.
- 📝 **AI Agent TAsks** - You AI agent to perform certain tasks like generating videos transcripts, titles, improved or alternative scripts, and thumbnails using OpenAI image generation model.
- 📊 **Subscription Plans** - Free, starter, creator & enterprise with different limits.
- ✨ **Subscription Plans Features** - Take granular control on each features with tokens for each plan managed through Schematic.
- 🔒 **Authentication & Security** - Powered by Clerk.
- 💳 **Stripe Payments** - Upgrade to Pro features for more features.

## Tech Stack

### **Frontend**

- **Next.js & React** - UI framework
- **Tailwind CSS & Shadcn** - Styling
- **Lucide React Icons** - UI enhancements

### **Backend & Services**

- **Convex** - User and youtube analyzed data storage
- **Google APIs** - Get youtube data of a video to analyze
- **Clerk** - Authentication & User Management
- **Stripe** - Subscription & Payment Handling
- **Schematic** - Divide services in tokens and help stripe to charge users appropriately

### **AI**

- **Vercel AI SDK** - AI toolkit made by Vercel
- **OpenAI** - AI-generated thumbnails
- **Google Gemini AI** - AI-generated responses

## Installation & Setup

### **1. Clone the repository**

```bash
git clone https://github.com/TayyabAsghar/AgentTube.git
cd agenttube
```

### **2. Install dependencies**

```bash
npm i
```

### **3. Set up environment variables**

Create a `.env.local` file and add the following:

```env
# Clerk Config
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
CLERK_SECRET_KEY=<your_clerk_secret_key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_next_public_clerk_publishable_key>

# Stripe Config
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_PUBLISH_KEY=<your_stripe_publish_key>

# Schematic Config
SCHEMATIC_SECRET_KEY=<your__schematic_secret_key>
NEXT_PUBLIC_SCHEMATIC_PUBLISH_KEY=<your_next_public_schematic_public_key>

# Youtube Config
YOUTUBE_API_KEY=<your_youtube_api_key>

# Convex Config
CONVEX_DEPLOYMENT=<your_convex_deployment>
NEXT_PUBLIC_CONVEX_URL=<your_next_public_convex_url>

# Gemini Config
GEMINI_API_KEY=<your_gemini_api_key>

# Open AI Config
OPENAI_API_KEY=<your_openai_api_key>
```

### **4. Run the development server**

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

## Screens

### **1. Landing Page**

Responsive landing page consist of **Hero section** that contains an input box to paste youtube link and start analyzing video along with **Features sections** showcase the features of the application and **Pricing sections** to showcase pricing cards for Free, Starter, Creator and Enterprise plans with both monthly and yearly billing options.

- **Hero Section**

![Landing Page - Hero Section](/public/screenshots/landing-page.png)

- **Features Section**

![Landing Page - Features Section](/public/screenshots/features-section.png)

- **Pricing Section**

![Landing Page - Pricing Section](/public/screenshots/pricing-section.png)

### **2. SignIn Page**

A simple yest customized SignIn page using **Clerk SignIn** components.

![SignIn Page](/public/screenshots/signin-page.png)

### **3. SignUp Page**

A simple yest customized SignUp page using **Clerk SignUp** components.

![SignUp Page](/public/screenshots/signup-page.png)

### **4. Dark Mode**

A theme button to switch between Light and Dark Mode.

![SignUp Page](/public/screenshots/theme-collage.png)

### **5. Dashboard**

A simple Dashboard with an **Input Box** to paste youtube link for analyzing, a **Collapsible Sider** for navigating between analyzed videos and **User Profile**.

![Dashboard](/public/screenshots/Dashboard.png)

### **6. Analyze Page**

This is the screen use lands on after the youtube video has been analyzed. It is divided into 6 sections.

- **Chat Box Section** – An AI chat agent where user can ask questions related to youtube video or ask agent to performs certain tasks like generate a script or a title for video. It has also quick button for performing such tasks.

- **Video Token Count Section** – A token counts showing user that how many tokens he has left for the month and a status bar showing wether the video analysis happened by spending a token or by caches for user database.

- **Video details Section** – This sections showcase youtube video metadata like Thumbnail, Title, User name, Channel name and etc.

- **Thumbnail Generation Section** – A thumbnail generation section contains the list of all the ai generated thumbnails related to this video and the total count of thumbnails tokens spend by the user.

- **Title Generation Section** – Just like Thumbnail Generation Section, this contains the list of all the ai generated titles related to this video and the total count of titles tokens spend by the user in a month.

- **Transcription Section** – A transcription section for video that is used by AI agent tools as context for creating script and the total count of scripts fetched by the application.

![Analyze Page](/public/screenshots/analyze-page.png)

### **7. Manage Plan Page**

A simple screen that used **Schematic Elements** to showcase your current plan along with features access, total tokens and next billing cycle.

![Manage Plan Page](/public/screenshots/manage-plan-page.png)

### **8. Plan Selector Modal**

Clicking **Change plan** will open a multi step schematic element modal to allow user to Upgrade or Downgrade the plan and a checkout step for adding payment method or discount codes.

- Plan Selection Step

![Plan Selector Step](/public/screenshots/plan-selector.png)

- Checkout Step

![Checkout Step](/public/screenshots/checkout.png)

- Save Payment Method

![Save Payment](/public/screenshots/payment-method.png)

## License

This project is licensed under the **MIT License**.

---
