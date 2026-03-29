# InfiniteStreaks Backend (Node.js + Express + MongoDB)

Production-ready, scalable backend for the habit tracking app.

## Features
- JWT Authentication (bcrypt)
- Clean Architecture (Models, Controllers, Services, Routes, Middlewares)
- Joi Validation
- Streak Logic with Penalty Mechanics
- MongoDB Aggregation for Statistics
- Security with Helmet, CORS, and Rate Limiting

## Technology Stack
- **Runtime**: Node.js 20+
- **Framework**: Express 4.x
- **Database**: MongoDB with Mongoose
- **Auth**: JWT (jsonwebtoken)
- **Validation**: Joi
- **Logging**: Morgan

## Local Setup

1. **Clone and Install Dependencies**:
   ```bash
   cd infinitestreaks-backend
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in your `MONGODB_URI` and `JWT_SECRET`.

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Run Production Server**:
   ```bash
   npm start
   ```

## Folder Structure
```
src/
├── app.js             # Express app setup
├── config/            # DB and Env config
├── controllers/       # Business logic handlers
├── middleware/        # JWT, validation, and error handling
├── models/            # Mongoose schemas
├── routes/            # API endpoints
├── services/          # Business logic services (streak/punishment)
└── validators/        # Joi schemas
server.js              # Entry point
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user

### Habits
- `GET /api/habits` - Get all active habits
- `POST /api/habits` - Create new habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Soft delete/archive
- `POST /api/habits/:id/complete` - Mark as done (updates streak)
- `POST /api/habits/:id/check-missed` - Manually check for streak breaks

### Stats
- `GET /api/stats` - Fetch weekly/monthly habit analytics

### Reminders
- `GET /api/reminders` - Internal list of todos
- `POST /api/reminders/trigger` - Request push notification list for a specific time slot

## Sample Completion Response
```json
{
  "habit": { "currentStreak": 7, "longestStreak": 12 },
  "message": "Great job! Day 7 on Workout 🔥",
  "streakBroken": false,
  "newStreak": 7
}
```
