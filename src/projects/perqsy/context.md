## Overview
Perqsy allows HR managers to distribute "Perk Points" to employees which can be redeemed for gift cards.

## Architecture Notes
- **Frontend**: Next.js 14 App Router, TailwindCSS, Zustand.
- **Backend**: Serverless edge functions hitting Supabase.
- **Database**: PostgreSQL (Row Level Security enforced).

### Auth Flow
We are using Supabase Auth. 
1. User logs in via Magic Link.
2. Session token stored in HttpOnly cookie.
3. Middleware checks session before allowing access to `/dashboard`.

### Open Questions
- Do we need to handle physical gift card fulfillment, or only digital?
- *Decision pending from stakeholder meeting next Tuesday.*