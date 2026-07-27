# CVMasterAI — Comprehensive Codebase Analysis

> **Generated:** 2026-07-27  
> **Project:** `cvmasterai` — AI-Powered Resume Builder  
> **Framework:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Project Structure](#3-project-structure)
4. [Routing & Page Map](#4-routing--page-map)
5. [Application Pages — Detailed Analysis](#5-application-pages--detailed-analysis)
6. [Custom Components](#6-custom-components)
7. [UI Component Library (shadcn/ui)](#7-ui-component-library-shadcnui)
8. [Hooks & Utilities](#8-hooks--utilities)
9. [Styling & Theming](#9-styling--theming)
10. [Backend, API & Integrations](#10-backend-api--integrations)
11. [Environment Configuration](#11-environment-configuration)
12. [Architecture Diagram](#12-architecture-diagram)
13. [Observations & Issues](#13-observations--issues)
14. [Recommendations](#14-recommendations)

---

## 1. Project Overview

CVMasterAI is an **AI-powered resume builder web application** that allows users to:

- **Create resumes from scratch** with a custom editor
- **Browse and use 19+ pre-designed templates** (Professional, Creative, Academic categories)
- **Upload existing resumes** (`.tex`, `.docx`, `.md`) for AI-powered editing
- **Authenticate** via Email/Password or Google OAuth (Firebase Auth)
- **Manage resumes** from a personal dashboard

The application is currently a **frontend-heavy** Next.js app with Firebase client-side authentication. AI features (OpenAI, HuggingFace) are **installed but not yet implemented**.

---

## 2. Tech Stack & Dependencies

### Core Framework
| Technology | Version | Purpose |
|:---|:---|:---|
| Next.js | 14.2.16 | React meta-framework (App Router) |
| React | ^18 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^3.4.17 | Utility-first CSS |

### Authentication & Backend
| Package | Version | Purpose | Status |
|:---|:---|:---|:---|
| `firebase` | ^11.3.1 | Auth (Email/Password, Google OAuth) | ✅ Active |
| `openai` | ^4.85.3 | AI text generation | ⚠️ Installed, **not used** |
| `@huggingface/inference` | ^3.3.6 | AI inference | ⚠️ Installed, **not used** |

### UI & Design
| Package | Version | Purpose |
|:---|:---|:---|
| `framer-motion` | ^12.4.3 | Page & element animations |
| `lucide-react` | ^0.454.0 | Icon library |
| `swiper` | ^11.2.4 | Testimonial carousel |
| `react-simple-typewriter` | ^5.0.1 | Hero typing animation |
| `react-parallax-tilt` | ^1.7.283 | 3D tilt effects |
| `sonner` | ^1.7.1 | Toast notifications |
| `next-themes` | ^0.4.4 | Dark/light mode |

### UI Primitives (Radix / shadcn)
| Package | Purpose |
|:---|:---|
| `@radix-ui/react-accordion` | Collapsible sections |
| `@radix-ui/react-dialog` | Modal dialogs |
| `@radix-ui/react-dropdown-menu` | Dropdown menus |
| `@radix-ui/react-select` | Select dropdowns |
| `@radix-ui/react-tabs` | Tabbed views |
| `@radix-ui/react-toast` | Toast primitives |
| `@radix-ui/react-tooltip` | Tooltips |
| + 20 more Radix primitives | Full shadcn/ui installation |

### Forms & Validation
| Package | Purpose |
|:---|:---|
| `react-hook-form` | Form state management |
| `@hookform/resolvers` | Validation resolvers |
| `zod` | Schema validation |

### Document Processing
| Package | Purpose |
|:---|:---|
| `docx` (^9.2.0) | Word document generation |
| `mammoth` (^1.9.0) | .docx to HTML conversion |
| `multiparty` (^4.2.3) | File upload parsing |

### Data Visualization
| Package | Purpose |
|:---|:---|
| `recharts` (2.15.0) | Dashboard charts |
| `embla-carousel-react` (8.5.1) | Carousel component |

---

## 3. Project Structure

```
cvmasterai/
├── app/
│   ├── globals.css              # Global styles (Tailwind layers, theme vars)
│   ├── layout.tsx               # Root layout (Header + Footer wrapper)
│   ├── page.tsx                 # Landing / Home page
│   ├── firebaseConfig.ts        # Firebase initialization
│   ├── components/              # App-specific components
│   │   ├── Button.tsx           # Custom button/link component
│   │   ├── FeatureCard.tsx      # Feature display card
│   │   ├── Footer.tsx           # App footer
│   │   ├── Header.tsx           # App header with auth state
│   │   ├── TestimonialCard.tsx  # Testimonial display card
│   │   └── dashboard/
│   │       └── Sidebar.tsx      # Dashboard sidebar nav
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact page
│   ├── create/page.tsx          # Resume creation options
│   ├── dashboard/
│   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   └── page.tsx             # Dashboard main view
│   ├── faq/page.tsx             # FAQ page
│   ├── forgot-password/page.tsx # Password reset
│   ├── privacy/page.tsx         # Privacy policy
│   ├── signin/page.tsx          # Sign in (Email + Google)
│   ├── signup/page.tsx          # Sign up (Email + Google)
│   ├── templates/page.tsx       # Template gallery (19+ templates)
│   ├── terms/page.tsx           # Terms of service
│   └── upload/page.tsx          # Resume upload
├── components/
│   ├── theme-provider.tsx       # next-themes wrapper
│   └── ui/                      # shadcn/ui component library (50+ components)
├── hooks/
│   ├── use-mobile.tsx           # Mobile breakpoint detection
│   └── use-toast.ts             # Toast notification hook
├── lib/
│   └── utils.ts                 # cn() class merge utility
├── styles/
│   └── globals.css              # Design tokens (CSS variables)
├── templates-data/              # 14 resume template .docx files
│   ├── creative1.docx
│   ├── creative2.docx
│   └── ... (creative1–creative14.docx)
├── forgot-password/
│   └── page.tsx                 # ⚠️ Duplicate route (see observations)
├── components.json              # shadcn/ui configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.mjs              # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── package.json                 # Dependencies & scripts
└── .env.local                   # Environment variables
```

---

## 4. Routing & Page Map

### Active Routes (12)

| Route | Page File | Description |
|:---|:---|:---|
| `/` | `app/page.tsx` | Landing / Home page |
| `/about` | `app/about/page.tsx` | About page |
| `/contact` | `app/contact/page.tsx` | Contact form |
| `/create` | `app/create/page.tsx` | Resume creation options |
| `/dashboard` | `app/dashboard/page.tsx` | User dashboard |
| `/faq` | `app/faq/page.tsx` | FAQ accordion |
| `/forgot-password` | `app/forgot-password/page.tsx` | Password reset |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy |
| `/signin` | `app/signin/page.tsx` | Sign in |
| `/signup` | `app/signup/page.tsx` | Sign up |
| `/templates` | `app/templates/page.tsx` | Template gallery |
| `/terms` | `app/terms/page.tsx` | Terms of service |
| `/upload` | `app/upload/page.tsx` | Resume upload |

### ⚠️ Broken / Unimplemented Routes (5)

These routes are **referenced in code** but have **no corresponding page files**:

| Route | Referenced In | Purpose |
|:---|:---|:---|
| `/create/custom` | `app/create/page.tsx` | Custom resume builder |
| `/create/ai` | `app/create/page.tsx` | AI-powered resume builder |
| `/editor/:id` | `app/templates/page.tsx` | Template editor |
| `/edit-resume` | `app/upload/page.tsx` | Standard resume editor |
| `/ai-edit-resume` | `app/upload/page.tsx` | AI-powered resume editor |

---

## 5. Application Pages — Detailed Analysis

### 🏠 Home Page (`/`)
- **File:** `app/page.tsx` (6,405 bytes)
- **Type:** Client Component
- **Features:** Animated hero with typewriter effect, 3-step "How It Works" grid, AI features section, auto-scrolling Swiper testimonial slider, CTA sections
- **Key Dependencies:** `framer-motion`, `react-simple-typewriter`, `swiper`
- **Navigates to:** `/create`, `/upload`

### 📝 Create Resume (`/create`)
- **File:** `app/create/page.tsx`
- **Type:** Client Component
- **Features:** Three creation options — Custom, Template, AI-Powered — each with icon cards
- **Key Dependencies:** `lucide-react`, `framer-motion`, shadcn `Button`, `Card`
- **Navigates to:** `/create/custom` ⚠️, `/templates`, `/create/ai` ⚠️

### 📁 Templates Gallery (`/templates`)
- **File:** `app/templates/page.tsx`
- **Type:** Client Component
- **Features:** 19+ templates, search filter, category dropdown, image preview modal, template selection
- **External:** Fetches preview images from `https://www.my-resume-templates.com`
- **Navigates to:** `/editor/:id` ⚠️

### 📤 Upload Resume (`/upload`)
- **File:** `app/upload/page.tsx`
- **Type:** Client Component
- **Features:** File upload (`.tex`, `.docx`, `.md`), format validation, simulated processing
- **Key Dependencies:** `lucide-react`, `framer-motion`, shadcn UI components
- **Navigates to:** `/edit-resume` ⚠️, `/ai-edit-resume` ⚠️

### 📊 Dashboard (`/dashboard`)
- **Layout:** `app/dashboard/layout.tsx` — Sidebar + content wrapper
- **Page:** `app/dashboard/page.tsx` — Dashboard heading (minimal content)
- **Key Dependencies:** Custom `Sidebar` component

### 🔐 Authentication Pages

| Route | File | Features |
|:---|:---|:---|
| `/signin` | `app/signin/page.tsx` | Email/Password + Google OAuth, auto-redirect if already logged in |
| `/signup` | `app/signup/page.tsx` | Registration, password strength meter, Google OAuth, post-signup signout |
| `/forgot-password` | `app/forgot-password/page.tsx` | Firebase `sendPasswordResetEmail` |

### 📄 Static / Legal Pages

| Route | File | Features |
|:---|:---|:---|
| `/about` | `app/about/page.tsx` | Mission statement, Framer Motion animations |
| `/contact` | `app/contact/page.tsx` | Contact form (non-functional), mailto link |
| `/faq` | `app/faq/page.tsx` | Custom accordion FAQ |
| `/privacy` | `app/privacy/page.tsx` | Collapsible privacy policy sections |
| `/terms` | `app/terms/page.tsx` | Collapsible terms of service sections |

---

## 6. Custom Components

### App Components (`app/components/`)

| Component | File | Purpose |
|:---|:---|:---|
| `Button` | `app/components/Button.tsx` | Custom button with variants (primary/secondary/custom), sizes, renders as `<Link>` or `<button>` |
| `FeatureCard` | `app/components/FeatureCard.tsx` | Feature display card mapping icon keys to Lucide icons |
| `Header` | `app/components/Header.tsx` | Sticky navbar with Firebase auth state, user dropdown, mobile menu (Framer Motion) |
| `Footer` | `app/components/Footer.tsx` | Footer with nav links, copyright, smooth "Back to Top" scroll |
| `TestimonialCard` | `app/components/TestimonialCard.tsx` | Italicized quote card with author name |
| `Sidebar` | `app/components/dashboard/Sidebar.tsx` | Dashboard sidebar with collapse/expand, route highlighting, Firebase signout |

---

## 7. UI Component Library (shadcn/ui)

**Configuration:** `components.json` — style: `default`, RSC: `true`, icons: `lucide`

The project has a **complete shadcn/ui installation** with **50+ Radix-based components** in `components/ui/`:

| Category | Components |
|:---|:---|
| **Layout** | `Card`, `Separator`, `AspectRatio`, `ResizablePanel`, `ScrollArea`, `Sidebar` |
| **Navigation** | `NavigationMenu`, `Menubar`, `Breadcrumb`, `Tabs`, `Pagination` |
| **Feedback** | `Alert`, `AlertDialog`, `Toast`, `Toaster`, `Sonner`, `Progress`, `Skeleton` |
| **Forms** | `Button`, `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Select`, `Switch`, `Slider`, `Label`, `Form`, `InputOTP`, `Calendar` |
| **Overlays** | `Dialog`, `Drawer`, `Sheet`, `Popover`, `HoverCard`, `Tooltip`, `ContextMenu`, `DropdownMenu`, `Command` |
| **Data Display** | `Avatar`, `Badge`, `Table`, `Carousel`, `Chart`, `Accordion`, `Collapsible`, `Toggle`, `ToggleGroup` |

---

## 8. Hooks & Utilities

### Custom Hooks

| Hook | File | Purpose |
|:---|:---|:---|
| `useIsMobile` | `hooks/use-mobile.tsx` | Detects viewport < 768px using `window.matchMedia` |
| `useToast` / `toast` | `hooks/use-toast.ts` | Toast notification state manager with reducer pattern |

### Utilities

| Function | File | Purpose |
|:---|:---|:---|
| `cn()` | `lib/utils.ts` | Merges Tailwind classes via `clsx` + `tailwind-merge` |

---

## 9. Styling & Theming

### Design System
- **Approach:** CSS custom properties (HSL-based) + Tailwind CSS utility classes
- **Theming:** Light/dark mode via `next-themes` with class-based dark mode switching
- **Configuration:** `tailwind.config.ts`

### CSS Files
| File | Purpose |
|:---|:---|
| `app/globals.css` | Tailwind layers, theme RGB vars, keyframe animations (`soft-glow`) |
| `styles/globals.css` | Design tokens — full HSL color palette for light & dark modes, sidebar vars, chart colors |

### Design Tokens (CSS Variables)
```
--background, --foreground, --card, --card-foreground,
--popover, --popover-foreground, --primary, --primary-foreground,
--secondary, --secondary-foreground, --muted, --muted-foreground,
--accent, --accent-foreground, --destructive, --destructive-foreground,
--border, --input, --ring, --radius,
--chart-1 through --chart-5,
--sidebar-background, --sidebar-foreground, --sidebar-primary, etc.
```

---

## 10. Backend, API & Integrations

### Firebase Authentication ✅ Active
- **Config:** `app/firebaseConfig.ts`
- **Project:** `resume-builder-30362`

| Feature | Where Used |
|:---|:---|
| Email/Password Sign-In | `app/signin/page.tsx` |
| Email/Password Registration | `app/signup/page.tsx` |
| Google OAuth (Popup) | `app/signin/page.tsx`, `app/signup/page.tsx` |
| Password Reset Email | `app/forgot-password/page.tsx` |
| Auth State Listener | `app/signin/page.tsx`, `app/components/Header.tsx` |
| Sign Out | `app/signup/page.tsx`, `Header.tsx`, `Sidebar.tsx` |

### API Routes & Server Actions
| Item | Status |
|:---|:---|
| `app/api/` directory | ❌ Does not exist |
| `route.ts` / `route.js` files | ❌ None found |
| `'use server'` directives | ❌ None found |
| `middleware.ts` | ❌ Does not exist |

### AI Integrations
| Package | Status | Notes |
|:---|:---|:---|
| `openai` (^4.85.3) | ⚠️ **Installed but unused** | No imports or API calls in any source file |
| `@huggingface/inference` (^3.3.6) | ⚠️ **Installed but unused** | No imports or API calls in any source file |

### Firestore / Database
| Item | Status |
|:---|:---|
| `firebase/firestore` | ❌ **Never imported** — no data persistence |

### Document Processing
| Package | Status | Notes |
|:---|:---|:---|
| `docx` (^9.2.0) | ⚠️ Installed but unused | For Word doc generation |
| `mammoth` (^1.9.0) | ⚠️ Installed but unused | For .docx → HTML conversion |

---

## 11. Environment Configuration

**File:** `.env.local`

| Variable | Purpose |
|:---|:---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase client API key |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app identifier |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID (`resume-builder-30362`) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |

**Note:** No backend API keys (OpenAI, HuggingFace) are configured. All variables are `NEXT_PUBLIC_*` (client-exposed).

---

## 12. Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │           Next.js 14 App Router (React 18)          │ │
│  │                                                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐   │ │
│  │  │  Pages   │  │Components│  │  shadcn/ui     │   │ │
│  │  │  (12)    │  │  (6)     │  │  (50+ Radix)   │   │ │
│  │  └────┬─────┘  └──────────┘  └────────────────┘   │ │
│  │       │                                             │ │
│  │  ┌────▼──────────────────────────────────────┐     │ │
│  │  │       Firebase Auth SDK (Client)          │     │ │
│  │  │  • Email/Password  • Google OAuth         │     │ │
│  │  │  • Password Reset  • Auth State Listener  │     │ │
│  │  └────┬──────────────────────────────────────┘     │ │
│  └───────│─────────────────────────────────────────────┘ │
└──────────│───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────┐
│  Firebase Auth       │
│  (Google Cloud)      │
│  Project:            │
│  resume-builder-30362│
└──────────────────────┘

┌──────────────────────────────────────────────┐
│           🚧 NOT YET IMPLEMENTED              │
│                                               │
│  • API Routes / Server Actions                │
│  • Firestore Database                         │
│  • OpenAI Integration                         │
│  • HuggingFace Integration                    │
│  • Resume Editor (/editor, /edit-resume)      │
│  • AI Resume Builder (/create/ai)             │
│  • Custom Resume Builder (/create/custom)     │
└──────────────────────────────────────────────┘
```

---

## 13. Observations & Issues

### 🔴 Critical Issues

| # | Issue | Details |
|:---|:---|:---|
| 1 | **Broken routes** | 5 routes referenced in code have no page files: `/create/custom`, `/create/ai`, `/editor/:id`, `/edit-resume`, `/ai-edit-resume` |
| 2 | **No backend / API layer** | No API routes, server actions, or middleware exist — the app cannot persist data or process AI requests |
| 3 | **No database** | Firestore is not used — user data, resumes, and preferences are not persisted anywhere |
| 4 | **AI packages unused** | `openai` and `@huggingface/inference` are installed but zero code references them |

### 🟡 Warnings

| # | Issue | Details |
|:---|:---|:---|
| 5 | **Duplicate `forgot-password` route** | Both `app/forgot-password/page.tsx` and `forgot-password/page.tsx` exist at root level |
| 6 | **Duplicate `globals.css`** | Two global CSS files exist: `app/globals.css` and `styles/globals.css` — potential conflicts |
| 7 | **Duplicate hooks** | `use-mobile.tsx` and `use-toast.ts` exist in both `hooks/` and `components/ui/` |
| 8 | **No auth route protection** | Dashboard and protected routes have no middleware or guards — any user can navigate directly |
| 9 | **Contact form is non-functional** | Form has no submission handler — data goes nowhere |
| 10 | **Upload processing is simulated** | Uses `setTimeout` to fake processing — no real file handling |
| 11 | **External template images** | Template previews load from `https://www.my-resume-templates.com` — fragile external dependency |
| 12 | **ESLint & TypeScript errors suppressed** | `next.config.mjs` sets `ignoreDuringBuilds: true` for both ESLint and TypeScript |
| 13 | **Firebase config exposed** | All Firebase keys are `NEXT_PUBLIC_*` — while expected for client SDKs, ensure Firebase Security Rules are properly configured |

### 🟢 Positives

| # | Aspect | Details |
|:---|:---|:---|
| 1 | **Rich UI component library** | 50+ shadcn/ui components installed and ready to use |
| 2 | **Polished animations** | Consistent use of Framer Motion throughout all pages |
| 3 | **Strong auth foundation** | Firebase Email + Google OAuth fully functional |
| 4 | **Good dependency selection** | Modern, well-maintained packages (Radix, Zod, React Hook Form) |
| 5 | **Dark mode ready** | Full HSL token system for light/dark themes |
| 6 | **Template library** | 14 .docx templates + 19 template definitions ready |

---

## 14. Recommendations

### Immediate Priorities (P0)

| # | Recommendation | Rationale |
|:---|:---|:---|
| 1 | **Build the resume editor** — Create `/editor/[id]/page.tsx` | This is the core product feature; without it, users hit dead-end routes |
| 2 | **Implement API routes** — Add `app/api/` routes for AI processing | OpenAI & HuggingFace are installed but need server-side API routes to work |
| 3 | **Add Firestore** — Persist user profiles, saved resumes, and template selections | Currently no user data survives a page refresh |
| 4 | **Add route protection** — Implement `middleware.ts` | Guard `/dashboard`, `/create`, `/upload`, `/editor` from unauthenticated access |

### Short-term (P1)

| # | Recommendation | Rationale |
|:---|:---|:---|
| 5 | **Wire up document processing** — Use `mammoth` for .docx parsing and `docx` for generation | Packages are installed but not connected |
| 6 | **Make contact form functional** — Add API route or Firebase Functions | Currently form data goes nowhere |
| 7 | **Clean up duplicates** — Remove duplicate `forgot-password/`, consolidate `globals.css`, deduplicate hooks | Reduces confusion and potential bugs |
| 8 | **Add proper error boundaries** — Implement `error.tsx` files | Currently no error handling for page crashes |

### Medium-term (P2)

| # | Recommendation | Rationale |
|:---|:---|:---|
| 9 | **Self-host template images** — Move to Firebase Storage or `public/` | External dependency on `my-resume-templates.com` is fragile |
| 10 | **Add SEO metadata** — Individual page metadata | Only root layout has basic metadata |
| 11 | **Re-enable linting** — Fix ESLint/TypeScript errors | `ignoreDuringBuilds` masks real issues |
| 12 | **Add loading states** — Implement `loading.tsx` files | Improve UX during route transitions |
| 13 | **Add tests** — Set up testing framework | No tests exist currently |

---

> **Summary:** CVMasterAI has a solid frontend foundation with rich UI components, animations, and working authentication. The critical gap is the **absence of any backend logic** — no API routes, no database, and no AI integration despite having the packages installed. The core product feature (the resume editor) has not been built yet. The next step should be building the editor and wiring up the AI + document processing pipeline.
