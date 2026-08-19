import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }],
    suggestedFor: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);