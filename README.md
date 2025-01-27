# Bountix

A modern, full-stack board for managing project tickets (bugs, tasks, TODOs).

**Demo: [https://bountix.vercel.app/](https://bountix.vercel.app/)**

## Features

- Marketing landing page (`/`)
- Dashboard pages with CRUD operations on tickets/comments/users
- Email/password authentication with Oslo and Argon2
- Modern form handling powered by React 19 features like Server Actions and useActionState  
- Local middleware to protect Server Actions or validate Zod schemas
- Typed URL state management with nuqs for persistent, shareable board filters
- Infinite scrolling (via TanStack Query) to optimize large dataset rendering

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Supabase](https://supabase.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Oslo](https://oslojs.dev/) + [Argon2](https://www.npmjs.com/package/argon2)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Validation**: [Zod](https://zod.dev/)
- **URL State**: [nuqs](https://nuqs.47ng.com/)
- **Client-Side Data State**: [Tanstack Query](https://tanstack.com/query/latest)

## Getting Started

```bash
git clone https://github.com/mkhmbtv/bountix
cd bountix
pnpm install
```

## Running Locally

Create a .env file using .env.example:

```bash
pnpm dlx prisma db push
```

Then, seed the database with a default users, tickets and comments:

```bash
pnpm run prisma-seed
```

This will create the following users: 

- Email: `admin@admin.com`
- Password: `secret`

- Email: `test@test.com`
- Password: `secret`

You can, of course, create new users as well through `/sign-up`.

Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

