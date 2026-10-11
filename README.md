<div align="center">

# বাজার দর — BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

Browse daily prices for essential products in Bangladesh, compare prices across
markets, and see how prices have changed.

</div>

## Features

- Browse products and categories with Bengali names and prices.
- See the products with the largest price increases and decreases.
- Search and filter the home-page product list by name and category.
- Sort products by today's price.
- Open a product page for today's price summary and market-by-market prices.
- Create an account or sign in with email and password or Google.
- View a profile and update the account name.
- Responsive layout, loading placeholders, Bengali number formatting, and toast notifications.

Product and category data is fetched from the Programming Hero BazarDor API:
`https://openapi.programming-hero.com/api/bazardor`.

## Tech stack

- [Next.js 16](https://nextjs.org) App Router and React 19
- TypeScript
- Tailwind CSS 4 and daisyUI
- [Better Auth](https://www.better-auth.com/) with MongoDB
- Google OAuth
- `react-hot-toast` notifications
- Hind Siliguri via `next/font`

## Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Price highlights and searchable, filterable product list | Public |
| `/category/[...slug]` | Products in a category | Public |
| `/product/[...slug]` | Product price details by market | Sign-in required |
| `/signin` | Sign in with email/password or Google | Public |
| `/signup` | Create an account or sign up with Google | Public |
| `/profile` | View account details | Sign-in required |
| `/profile/update` | Update the profile name | Sign-in required |

Visitors who open a protected page while signed out are sent to `/signin` and
shown a notification. After signing in, they are sent to the home page.

## Getting started

### Requirements

- Node.js compatible with the installed Next.js version
- npm
- A MongoDB database
- Google OAuth credentials to enable Google sign-in

### Install dependencies

```bash
npm install
```

### Configure environment

Create a `.env.local` file in the project root:

```dotenv
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Set `BETTER_AUTH_SECRET` to a long, random value and keep all credentials out of
source control. Google OAuth credentials are required for Google sign-in. Add
this authorized redirect URI to your Google OAuth client:

```text
http://localhost:3000/api/auth/callback/google
```

For deployment, set `BETTER_AUTH_URL` to the deployed site's origin and register
`<BETTER_AUTH_URL>/api/auth/callback/google` as an authorized Google redirect URI.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Data API

The app currently calls these upstream endpoints directly:

| Endpoint | Usage |
| --- | --- |
| `https://openapi.programming-hero.com/api/bazardor/categories` | Load categories |
| `https://openapi.programming-hero.com/api/bazardor/products` | Load products and market prices |

The app filters and sorts the fetched product data in its own pages and
components. There is no local sample-data fallback configured.

## Project structure

```text
src/
├── app/
│   ├── (auth)/signin/        # Sign-in page
│   ├── (auth)/signup/        # Sign-up page
│   ├── api/auth/             # Better Auth API handler
│   ├── category/             # Category pages
│   ├── product/              # Product detail pages
│   └── profile/              # Profile and profile update pages
├── components/               # Shared UI and authentication components
├── lib/
│   ├── api.ts                # BazarDor API requests and price rankings
│   ├── auth.ts               # Better Auth and MongoDB configuration
│   ├── auth-client.ts        # Browser auth client
│   ├── bangla.ts             # Bengali formatting helpers
│   └── types.ts              # API data types
└── proxy.ts                  # Protects product and profile routes
```
