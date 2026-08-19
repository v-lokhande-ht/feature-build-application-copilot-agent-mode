import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya-rivera',
        email: 'maya.rivera@example.com',
        displayName: 'Maya Rivera',
        age: 29,
        fitnessGoal: 'Train for a spring 10K while building consistency.',
      },
      {
        username: 'leo-kim',
        email: 'leo.kim@example.com',
        displayName: 'Leo Kim',
        age: 34,
        fitnessGoal: 'Improve cycling endurance and recovery habits.',
      },
      {
        username: 'aisha-patel',
        email: 'aisha.patel@example.com',
        displayName: 'Aisha Patel',
        age: 27,
        fitnessGoal: 'Balance strength training with daily mobility work.',
      },
      {
        username: 'sam-taylor',
        email: 'sam.taylor@example.com',
        displayName: 'Sam Taylor',
        age: 41,
        fitnessGoal: 'Build low-impact cardio capacity after work.',
      },
    ]);

    const userByUsername = Object.fromEntries(users.map((user) => [user.username, user]));

    const teams = await Team.insertMany([
      {
        name: 'Velocity Squad',
        mascot: 'Rocket',
        weeklyGoalMinutes: 900,
        members: [userByUsername['maya-rivera']._id, userByUsername['leo-kim']._id],
      },
      {
        name: 'Core Crew',
        mascot: 'Anchor',
        weeklyGoalMinutes: 720,
        members: [userByUsername['aisha-patel']._id, userByUsername['sam-taylor']._id],
      },
    ]);

    const teamByName = Object.fromEntries(teams.map((team) => [team.name, team]));

    await Promise.all([
      User.updateOne({ username: 'maya-rivera' }, { team: teamByName['Velocity Squad']._id }),
      User.updateOne({ username: 'leo-kim' }, { team: teamByName['Velocity Squad']._id }),
      User.updateOne({ username: 'aisha-patel' }, { team: teamByName['Core Crew']._id }),
      User.updateOne({ username: 'sam-taylor' }, { team: teamByName['Core Crew']._id }),
    ]);

    await Activity.insertMany([
      {
        user: userByUsername['maya-rivera']._id,
        team: teamByName['Velocity Squad']._id,
        activityType: 'Running',
        durationMinutes: 46,
        caloriesBurned: 430,
        activityDate: new Date('2026-08-16T12:30:00Z'),
        notes: 'Tempo intervals on the river trail.',
      },
      {
        user: userByUsername['leo-kim']._id,
        team: teamByName['Velocity Squad']._id,
        activityType: 'Cycling',
        durationMinutes: 75,
        caloriesBurned: 690,
        activityDate: new Date('2026-08-17T10:00:00Z'),
        notes: 'Zone 2 ride with two hill repeats.',
      },
      {
        user: userByUsername['aisha-patel']._id,
        team: teamByName['Core Crew']._id,
        activityType: 'Strength Training',
        durationMinutes: 52,
        caloriesBurned: 310,
        activityDate: new Date('2026-08-17T22:15:00Z'),
        notes: 'Lower-body lift with mobility cooldown.',
      },
      {
        user: userByUsername['sam-taylor']._id,
        team: teamByName['Core Crew']._id,
        activityType: 'Rowing',
        durationMinutes: 38,
        caloriesBurned: 350,
        activityDate: new Date('2026-08-18T11:45:00Z'),
        notes: 'Steady indoor row before morning meetings.',
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        user: userByUsername['leo-kim']._id,
        team: teamByName['Velocity Squad']._id,
        rank: 1,
        points: 1840,
        totalMinutes: 315,
      },
      {
        user: userByUsername['maya-rivera']._id,
        team: teamByName['Velocity Squad']._id,
        rank: 2,
        points: 1595,
        totalMinutes: 284,
      },
      {
        user: userByUsername['aisha-patel']._id,
        team: teamByName['Core Crew']._id,
        rank: 3,
        points: 1420,
        totalMinutes: 248,
      },
      {
        user: userByUsername['sam-taylor']._id,
        team: teamByName['Core Crew']._id,
        rank: 4,
        points: 1285,
        totalMinutes: 221,
      },
    ]);

    await Workout.insertMany([
      {
        title: '10K Builder Intervals',
        focus: 'Cardio endurance',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: ['Warm-up jog', 'Six 3-minute tempo intervals', 'Easy cooldown'],
        suggestedFor: 'Runners building race pace confidence.',
      },
      {
        title: 'Desk Reset Mobility',
        focus: 'Mobility',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Hip flexor stretch', 'Thoracic rotations', 'Calf raises', 'Breathing reset'],
        suggestedFor: 'Members adding recovery work between training days.',
      },
      {
        title: 'Power Core Circuit',
        focus: 'Strength',
        difficulty: 'advanced',
        durationMinutes: 35,
        exercises: ['Kettlebell swings', 'Plank rows', 'Goblet squats', 'Farmer carries'],
        suggestedFor: 'Athletes looking for dense full-body strength work.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
