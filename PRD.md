# CVMaster AI — Product Requirements Document

## 1. Product Overview

CVMaster AI is an AI-powered resume and CV builder designed to streamline the process of creating professional, ATS-friendly resumes. The core problem it solves is the friction and complexity involved in writing, formatting, and tailoring resumes for specific job applications.

CVMaster AI focuses on:
- Professional resume creation
- Customizable templates
- Real resume editing
- ATS-friendly output
- AI-assisted resume improvement
- Reliable persistence
- Professional export

## 2. Product Vision

The vision for CVMaster AI is to evolve from a polished frontend prototype into a fully functional, production-ready resume-building platform. Users should be able to seamlessly manage multiple tailored resumes, utilize beautifully designed templates that automatically adapt to their data, and leverage AI to intelligently optimize their content without fabricating facts.

## 3. Current Product State

| Area | Status | Evidence |
|------|--------|----------|
| Marketing Pages | COMPLETE | `app/page.tsx` features a complete, animated landing page. |
| Navigation | COMPLETE | Functional header and footer routing. |
| Authentication | PARTIAL | `app/signin` and `app/signup` use Firebase auth, but session handling is entirely client-side without middleware route protection. |
| Dashboard | PARTIAL | `app/dashboard/page.tsx` reads and deletes resumes from Firestore, but lacks a logout button. |
| Resume Editor UI | UI ONLY | `app/editor/[id]/page.tsx` has functional UI tabs for Personal, Experience, etc., and updates a live preview. |
| Template Selection | UI ONLY | `app/templates/page.tsx` displays templates, but selecting one does not fully drive a dynamic engine. |
| Save Resume | MISSING | Editor's "Save" button has no click handler; no persistence of edited data to Firestore. |
| Export (PDF/DOCX) | MISSING | Editor's "Download PDF" button has no logic attached despite dependencies existing. |
| AI Features | MISSING | UI marks AI features as "Coming Soon" or "AI Rewrite (Soon)". No backend API routes exist. |

## 4. Existing Functionality

The following functionality is verified and currently working:
- **Authentication**: Users can sign up and log in using Email/Password or Google OAuth (Firebase Auth).
- **Dashboard CRUD (Partial)**: The dashboard retrieves a user's resume list from Firestore and allows deleting them.
- **Editor Interface**: The UI for editing Personal Information, Experience, Education, and Skills exists, complete with a live preview.
- **Template Gallery**: Users can view, filter, and preview a list of available templates.

## 5. Missing / Partial Functionality

### Core blockers
- **Resume Persistence**: Edits made in the resume editor are not saved. The "Save" button does nothing.
- **Template Engine Integration**: The relationship between user data and actual template formatting needs a standardized architecture.

### Security/architecture gaps
- **Client-Side Auth Only**: Protected routes rely on `useEffect` redirects, exposing protected UI briefly and lacking secure server boundaries.
- **No Backend / API**: The app lacks Next.js API routes or server actions. All Firebase calls happen on the client.
- **Firestore Security**: Client-side queries are unsafe without properly configured Firestore Security Rules.
- **No Logout Functionality**: Users have no UI mechanism to sign out from the dashboard.

### AI gaps
- **Complete AI Missing**: AI generation, rewriting, suggestions, and ATS optimization are all currently missing. Only UI badges are present.

### Export gaps
- **PDF/DOCX Missing**: Users cannot download their created resumes.

### Quality/testing gaps
- **No Tests**: The repository lacks unit, integration, and E2E tests.

## 6. Target User

- **Job Seekers**: Individuals actively applying for roles who need high-quality resumes quickly.
- **Professionals**: Career-focused users who maintain updated CVs.
- **Students & New Graduates**: Users needing guidance on formatting and phrasing their early experience.

## 7. Core User Journey

1. **Landing page**: User arrives and learns about the product. *(CURRENT: Works)*
2. **Sign up / sign in**: User authenticates via Google or email. *(CURRENT: Works)*
3. **Dashboard**: User sees their existing resumes or creates a new one. *(CURRENT: Partial, missing logout)*
4. **Create resume**: User chooses to start from scratch or upload an existing PDF. *(CURRENT: UI flow exists)*
5. **Select template**: User picks a visual template. *(CURRENT: Works visually)*
6. **Enter/edit resume information**: User fills out sections. *(CURRENT: UI works)*
7. **See live preview**: User sees real-time updates. *(CURRENT: UI works)*
8. **Save resume**: User saves progress. *(CURRENT: Missing)*
9. **Reopen and continue editing**: User loads saved data. *(CURRENT: Missing)*
10. **Use AI assistance**: User asks AI to refine a bullet point. *(CURRENT: Missing)*
11. **Optimize resume**: User checks ATS compatibility. *(CURRENT: Missing)*
12. **Export PDF/DOCX**: User downloads the final file. *(CURRENT: Missing)*
13. **Apply for jobs**: User uses the generated file externally.

## 8. Functional Requirements

### Authentication
- **Requirement**: Secure user authentication.
- **Expected Behavior**: Users can sign up, log in, log out, and reset passwords. Unauthenticated users cannot access the dashboard or editor.
- **Acceptance Criteria**: Next.js Middleware protects `/dashboard` and `/editor`. A visible logout button exists.

### Dashboard
- **Requirement**: Manage user resumes.
- **Expected Behavior**: Users can view, create, delete, and duplicate resumes.
- **Acceptance Criteria**: Dashboard accurately reflects Firestore data. Empty states and loading states are handled gracefully.

### Resume Editor
- **Requirement**: Form-based content editing.
- **Expected Behavior**: Users can add, edit, and reorder experiences, education, and skills.
- **Acceptance Criteria**: Form data dynamically updates a centralized React state without noticeable lag.

### Persistence
- **Requirement**: Save progress.
- **Expected Behavior**: Resumes are saved to Firestore, either manually or via autosave.
- **Acceptance Criteria**: Reloading the page in the editor restores the latest saved state from the database.

### Export
- **Requirement**: High-fidelity file generation.
- **Expected Behavior**: Users can download a PDF and DOCX version of their resume.
- **Acceptance Criteria**: The downloaded PDF exactly matches the live preview in layout, fonts, and colors.

### AI
- **Requirement**: Intelligent content enhancement.
- **Expected Behavior**: Users can click an AI button to rewrite a specific experience description or generate a professional summary.
- **Acceptance Criteria**: AI requests are routed securely through a backend API to prevent exposing API keys. Output is editable by the user before saving.

## 9. Resume Data Model

Based on existing TypeScript types in `app/editor/[id]/page.tsx`, the required model is:

- **Personal Information**: `name` (string), `title` (string), `email` (string), `phone` (string), `website` (string), `address` (string), `summary` (string).
- **Experience**: Array of objects containing `id` (string), `company` (string), `title` (string), `date` (string), `description` (string).
- **Education**: Array of objects containing `id` (string), `school` (string), `degree` (string), `date` (string).
- **Skills**: Currently a single comma-separated `string`. (Should ideally be refactored to an array of strings).
- **Metadata**: `id` (string), `templateId` (string), `name` (string), `updatedAt` (timestamp/Date).
- **Ownership**: The user ID must be stored on or inherently linked to the resume document in Firestore.

## 10. Template System

The architecture requires strict separation of concerns between data and presentation.
- **Shared Data Model**: All templates must consume the exact same Resume Data Model.
- **Template Switching**: A user can change the `templateId` at any time without losing any data.
- **Rendering**: Templates are pure React components that receive the Resume Data Model as props and return formatted UI.

## 11. AI Product Requirements

- **AI Rewrite**: Enhance grammar, tone, and impact of existing text.
- **AI Summary**: Generate a professional summary based on the provided experience and skills.
- **AI Bullet Enhancement**: Convert passive responsibilities into active, achievement-oriented bullets.
- **AI Safety**: The system prompt MUST instruct the LLM to never fabricate dates, companies, degrees, or skills not explicitly provided or strongly implied by the user. AI output must populate the form inputs, not write directly to the database, allowing user review.

## 12. Export Requirements

- **PDF Export**: Must use server-side rendering (e.g., Puppeteer) or robust client-side canvas generation (`html2pdf.js`) to ensure exact visual fidelity. Fonts and SVGs must be embedded.
- **DOCX Export**: Must generate semantic Word documents with proper headings and styles using a library like `docx`.

## 13. Security Requirements

- **Server-Side Secrets**: Firebase Admin credentials and OpenAI/HuggingFace API keys must never reach the client bundle.
- **Protected Operations**: All AI generation and export (if server-side) must verify user session tokens before processing.
- **Firestore Rules**: Strict rules must enforce that `request.auth.uid == resource.data.userId` for all reads and writes.

## 14. Non-Functional Requirements

- **Responsive Design**: Editor forms must work on mobile, though live preview may require tablet/desktop dimensions.
- **Performance**: Live preview must not lag during fast typing.
- **Type Safety**: End-to-end strict TypeScript compilation without `any` overrides.

## 15. Testing Requirements

- **Unit Tests**: For parsing logic, AI prompt generation, and date formatting.
- **Integration Tests**: For API routes and Firestore data access layers.
- **E2E Tests**: Playwright/Cypress tests covering login, resume creation, editing, and saving.

## 16. Deployment Requirements

- **Target Hosting Architecture**: Vercel (Next.js native). (Note: This is the planned deployment target, not a claim of current production deployment).
- **Environment Variables**: To be managed securely in Vercel settings, mapping to Firebase and AI provider credentials.
- **Current vs Target**: Currently just a build command. Target requires environment variable parity and CI/CD checks before merging.

## 17. Milestone Roadmap

### M0 — Framework & Dependency Modernization
Safely update Next.js, React, and Tailwind dependencies. Audit current `package.json` for unused packages.

### M1 — Resume Persistence
Implement secure Firebase writes. Wire up the "Save" button in the editor. Add a "Logout" button to the dashboard. Ensure state hydrates correctly on page reload.

### M2 — Template-Driven Resume Engine
Abstract the live preview into modular, swappable components. Standardize the data model so switching templates retains all content.

### M3 — Production Export
Implement and wire up the "Download PDF" button to generate high-fidelity files using existing dependencies.

### M4 — Backend & Security Hardening
Implement Next.js middleware for route protection. Define and deploy strict Firestore Security Rules. Migrate sensitive logic to API routes.

### M5 — AI Resume Intelligence
Create backend API routes for OpenAI/HuggingFace. Wire up the "AI Rewrite" and "AI Summary" buttons in the UI to stream results back to the forms.

### M6 — Testing & CI/CD
Set up Jest and Playwright. Create GitHub Actions workflows for linting, typechecking, and testing on PRs.

## 18. Acceptance Criteria

CVMaster AI is production-ready when:
- A user can create an account, create a resume, edit it, and the changes persist across sessions.
- AI features successfully refine text without throwing errors or exposing API keys.
- Users can download a perfectly formatted PDF of their resume.
- No protected data can be accessed while logged out.

## 19. Explicit Non-Goals

- We are NOT rebuilding the existing UI or marketing pages.
- We are NOT redesigning the templates; we are making them functional.
- We are NOT building an ATS system for recruiters, only a builder for job seekers.
