# MERN Expense Tracker

Small, focused MERN-stack expense tracker with authentication, transaction tracking, and a simple dashboard.

## Quick Start

1. Backend

```bash
cd backend
npm install
cp .env.example .env   # set MONGO_CONN and JWT_SECRET
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` for the client and `http://localhost:8080` for the API.

## Screenshots & Sample Data

The UI screenshots live in `frontend/public/screenshots/`.

- Home dashboard: [frontend/public/screenshots/homedark.png](frontend/public/screenshots/homedark.png)
- Home dashboard, light theme: [frontend/public/screenshots/homelight.png](frontend/public/screenshots/homelight.png)
- Login: [frontend/public/screenshots/login.png](frontend/public/screenshots/login.png)
- Register: [frontend/public/screenshots/register.png](frontend/public/screenshots/register.png)

Sample data can be added under `backend/sample-data/` if needed.

![Home dashboard dark](frontend/public/screenshots/homedark.png)
![Home dashboard light](frontend/public/screenshots/homelight.png)
![Login screen](frontend/public/screenshots/login.png)
![Register screen](frontend/public/screenshots/register.png)

If you want, I can add a `backend/sample-data/transactions.json` example file.

## Contributing

1. Fork
2. Create branch
3. Make changes
4. Open PR

## License

MIT — see `LICENSE`.

---

Author: Subham Nayak
