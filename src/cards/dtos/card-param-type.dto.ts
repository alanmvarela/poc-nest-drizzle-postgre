import { createZodDto } from 'nestjs-zod'
import { CardParamTypeSchema } from '../schemas/card.schema'

export class CardParamTypeDto extends createZodDto(CardParamTypeSchema) {}