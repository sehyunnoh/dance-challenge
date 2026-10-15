import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const challenges = defineCollection({
  loader: file('src/data/challenges.json'),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    youtubeId: z.string(),
    tutorialYoutubeId: z.string().optional(),
    year: z.number().int(),
    era: z.enum(['trending', 'past']),
    origin: z.enum(['kpop', 'tiktok', 'western', 'other']),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    group: z.enum(['solo', 'duo', 'group']),
    seconds: z.number().int().optional(),
    kidFriendly: z.string().optional(),
    notes: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { challenges };
