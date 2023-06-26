import { createZodDto } from 'nestjs-zod'
import { CreateCardSchema } from '../schemas/card.schema'

export class CreateCardDto extends createZodDto(CreateCardSchema) {}