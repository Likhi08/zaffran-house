# Nazeer's Zaffran House MERN Website

Premium restaurant website for Nazeer's Zaffran House, Kadiri, with a React/Vite frontend and Express/MongoDB backend.

## Run As One App

From the project root:

```bash
npm run install:all
cd backend
copy .env.example .env
cd ..
npm run seed
npm run dev
```

This starts both parts together:

```text
Frontend: http://localhost:5173
Backend API: http://localhost:5000
```

For production-style local run from the root:

```bash
npm run start
```

That builds the frontend and serves it from the Express backend.

## Run Backend Separately

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

The API runs at `http://localhost:5000`.

Set your real admin login in `backend/.env` before seeding:

```env
ADMIN_NAME=Admin
ADMIN_USERNAME=zaffranhouse.com
ADMIN_EMAIL=admin@zaffranhouse.com
ADMIN_PASSWORD=replace_with_a_strong_admin_password
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

The website runs at `http://localhost:5173`.

To point the frontend to a deployed backend, create `frontend/.env`:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## Connect MongoDB Atlas

1. Create a MongoDB Atlas account and a new cluster.
2. Create a database user with password authentication.
3. Add your current IP or `0.0.0.0/0` in Network Access for deployment testing.
4. Copy the connection string from Atlas.
5. Put it in `backend/.env` as:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nazeers_zaffran_house
```

6. Set a strong `JWT_SECRET`, then run `npm run seed`.

## Deploy Backend On Render

1. Push the project to GitHub.
2. Create a new Render Web Service.
3. Select the backend folder as the root directory or set build/start commands for `backend`.
4. Build command:

```bash
npm install
```

5. Start command:

```bash
npm start
```

6. Add environment variables from `backend/.env.example`, including `MONGO_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `FRONTEND_URL`.
7. After deploy, run the seed command from Render Shell:

```bash
npm run seed
```

## Deploy Frontend On Vercel

1. Create a new Vercel project from GitHub.
2. Set the root directory to `frontend`.
3. Framework preset: Vite.
4. Build command:

```bash
npm run build
```

5. Output directory:

```text
dist
```

6. Add `VITE_API_URL` with your backend URL plus `/api`, for example `https://api.zaffranhouse.com/api`.

## Add Custom Domain

1. In Vercel, open Project Settings, then Domains.
2. Add your domain: `zaffranhouse.com`.
3. Update DNS at your domain provider using Vercel's shown `A`, `CNAME`, or nameserver records.
4. In Render, add the frontend domain to `FRONTEND_URL`.
5. Wait for DNS and SSL to finish provisioning.

Recommended production URLs:

```text
Website: https://zaffranhouse.com
API: https://api.zaffranhouse.com
```

## Test WhatsApp Ordering

1. Open the frontend.
2. Go to Menu.
3. Add items such as Chicken Dum Biryani and Royal Falooda.
4. Open Cart.
5. Click `Order on WhatsApp`.
6. WhatsApp opens with item names, selected size, quantity and total amount already filled.

## Monthly Hosting Cost Estimate

For a small restaurant website:

```text
Frontend on Vercel: Free to $20/month
Backend on Render: Free to $25/month
MongoDB Atlas: Free shared tier to $9+/month
Domain: usually $1 to $2/month when averaged yearly
Estimated starting cost: $0 to $12/month
More reliable paid setup: around $30 to $55/month
```
