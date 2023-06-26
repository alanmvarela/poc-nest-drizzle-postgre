import { z } from 'nestjs-zod/z'
import { CardCategory, CardType } from '../cards.enum';

export const CreateCardSchema = z.object({
    type: z
        .nativeEnum(CardType),
    title: z.optional(z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(50, "Title must be at most 25 characters long")),
    description: z.optional(z
        .string()
        .min(3, "Description must be at least 3 characters long")
        .max(50, "Description must be at most 50 characters long")),
    category: z.optional(z
        .nativeEnum(CardCategory)),
});

export const CardParamSchema = z.object({
    id: z.number().positive(),
    type: z.nativeEnum(CardType)
});

export const CardParamTypeSchema = z.object({
    type: z.nativeEnum(CardType)
});

