import { CardType } from '../cards.enum';
import { CardParamSchema } from '../schemas/card.schema'


export class CardParamDto {
    id : number;
    type: CardType;

    constructor(data: CardParamDto) {
        const validatedData = CardParamSchema.parse(data);
        this.id = validatedData.id;
        this.type = validatedData.type;
    }
}
