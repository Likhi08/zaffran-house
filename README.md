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
npm run build
npm run start
```

That serves the built frontend from the Express backend.

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
ADMIN_USERNAME=zaffranhouse
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

## Deploy As One App On Render

1. Push the project to GitHub.
2. Create a new Render Web Service from the repository, or use the included `render.yaml`.
3. Keep the root directory as the project root.
4. Build command:

```bash
npm install && npm run build
```

5. Start command:

```bash
npm start
```

6. Add environment variables from `backend/.env.example`, especially `MONGO_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `FRONTEND_URL`.
7. Set `FRONTEND_URL` to your Render URL, for example:

```env
FRONTEND_URL=https://nazeers-zaffran-house.onrender.com
```

8. After deploy, run the admin seed command from Render Shell:

```bash
npm run seed:admin --prefix backend
```

The backend serves the built React frontend, so the website and API live on the same domain:

```text
Website: https://your-render-service.onrender.com
API health: https://your-render-service.onrender.com/api/health
```

## Optional Separate Frontend On Vercel

If you prefer separate hosting, deploy `backend` on Render and `frontend` on Vercel. In Vercel, set `VITE_API_URL` to your backend URL plus `/api`, for example `https://api.zaffranhouse.com/api`.

## Add Custom Domain

1. In Vercel, open Project Settings, then Domains.
2. Add your domain: `zaffranhouse.com`.
3. Update DNS at your domain provider using Vercel's shown `A`, `CNAME`, or nameserver records.
4. In Render, add the final website domain to `FRONTEND_URL`.
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
