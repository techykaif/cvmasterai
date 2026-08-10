# CVMaster AI

An AI-powered resume and CV builder designed to help job seekers create professional, ATS-friendly resumes quickly and effortlessly.

## Overview

CVMaster AI provides a modern, intuitive interface for users to build and manage their resumes. By combining beautiful, customizable templates with artificial intelligence, it aims to streamline the tedious process of formatting and phrasing professional experience.

## Current Status

**Note: CVMaster AI is actively in development.**
The project currently features a polished frontend, functional authentication, and a dashboard for managing resumes. Core features such as resume persistence (saving), PDF export, and AI generation are currently in development and not yet functional.

### Currently Available
- **User Authentication**: Secure sign-up and login via Email/Password and Google OAuth (Firebase).
- **Dashboard**: View and delete created resumes.
- **Template Gallery**: Browse and preview a selection of professional resume templates.
- **Editor UI**: A fully responsive form-based editor with a real-time live preview.

### In Development (Missing / Partial)
- **Resume Persistence**: Saving edits made in the editor back to the database.
- **Export Capabilities**: Generating and downloading high-fidelity PDFs and DOCX files.
- **AI Intelligence**: AI-powered rewriting, summary generation, and ATS optimization.
- **Security Hardening**: Server-side route protection and strict database security rules.

## Tech Stack

- **Framework**: Next.js (App Router, v14.2.16)
- **Language**: TypeScript (^5.x)
- **Styling**: Tailwind CSS (^3.4.17), Framer Motion, Radix UI (shadcn/ui)
- **Database & Auth**: Firebase (^11.3.1)
- **Icons**: Lucide React
- **Package Manager**: npm

## Architecture

CVMaster AI is currently built as a thick-client application using Next.js client components.
- **Frontend**: Handles state management, UI rendering, and form logic directly in the browser.
- **Backend/Database**: Utilizes the Firebase Client SDK to communicate directly with Firebase Authentication and Firestore.
- **APIs**: There are currently no custom server-side Next.js API routes (`app/api`); all data fetching and mutations occur on the client side.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/techykaif/cvmasterai.git
   cd cvmasterai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (see below).

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory and add the following variable names. Do not commit actual secret values.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Project Structure

- `/app` - Next.js App Router containing pages, layouts, and routing logic.
  - `/app/dashboard` - User dashboard for managing resumes.
  - `/app/editor/[id]` - The core resume editing interface and live preview.
  - `/app/templates` - The template selection gallery.
- `/components` - Reusable UI components (including shadcn/ui components).
- `/lib` - Utility functions.
- `/public` - Static assets like images and template placeholder files.

## Development

Currently available scripts:
- `npm run dev` - Starts the local development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint.

*Note: Automated testing commands (e.g., `npm run test`) are not currently implemented.*

## Roadmap

1. **M0 — Framework & Dependency Modernization**: Audit and update core dependencies.
2. **M1 — Resume Persistence**: Implement robust saving and loading of resumes to Firestore.
3. **M2 — Template-Driven Resume Engine**: Abstract the live preview into a fully modular template engine.
4. **M3 — Production Export**: Implement reliable PDF and DOCX export functionality.
5. **M4 — Backend & Security Hardening**: Introduce Next.js middleware, API routes, and Firestore security rules.
6. **M5 — AI Resume Intelligence**: Integrate secure backend API calls for AI rewriting and summary generation.
7. **M6 — Testing & CI/CD**: Add automated testing (Jest/Playwright) and CI pipelines.

## Security

The application currently relies on client-side Firebase logic.
- **Authentication**: Securely managed by Firebase Auth.
- **Route Protection**: Currently implemented via client-side redirects. Server-side middleware is planned for a future milestone.
- **Database Access**: Currently relies on client-side queries. Proper Firestore Security Rules are required and planned for a future milestone to ensure secure data access.

## License

*(This project currently has no explicit LICENSE file provided in the repository.)*
