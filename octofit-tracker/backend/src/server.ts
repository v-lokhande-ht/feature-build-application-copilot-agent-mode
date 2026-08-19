import cors from 'cors';
import express from 'express';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
import { createResourceRouter } from './routes/resources.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl });
});

app.use('/api/users', createResourceRouter('users', User));
app.use('/api/teams', createResourceRouter('teams', Team));
app.use('/api/activities', createResourceRouter('activities', Activity));
app.use('/api/leaderboard', createResourceRouter('leaderboard', LeaderboardEntry));
app.use('/api/workouts', createResourceRouter('workouts', Workout));

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});