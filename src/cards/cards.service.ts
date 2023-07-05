import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CardType } from './cards.enum';
import { DrizzleProvider } from './../db/drizzle.provider';
import { bugCard, issueCard, taskCard } from './../db/schema';
import { eq } from 'drizzle-orm';
import { CreateCardDto } from './dtos/create-card.dto';


/**
 * This service is responsible for creating, reading and deleting cards.
 */
@Injectable()
export class CardsService {

    constructor(
        private readonly drizzleProvider: DrizzleProvider,
    ) {}

    /**
     * This method creates a card based on the type of card.
     * 
     * @param card - The card to be created.
     */
    async createCard(card: CreateCardDto) {
        switch (card.type) {
            case CardType.ISSUE:
                return this.createIssueCard(card);
            case CardType.TASK:
                return this.createTaskCard(card);
            case CardType.BUG:
                return this.createBugCard(card);
        };
    }

    /**
     * This method returns all cards of a given type.
     * 
     * @param type - The type of card.
     */
    async getCards(type: CardType) {
        return this.drizzleProvider.db.select().from(this.formatType(type));
    }

    /**
     * This method returns a card of a given type and id.
     * 
     * @param type - The type of card.
     * @param id - The id of the card.
     */
    async getCard(type: CardType, id: number) {
        const schema = this.formatType(type);
        const card = await this.drizzleProvider.db.select().from(schema).where(eq(schema.id, id));
        if (card===undefined){
            throw new NotFoundException(`Card with id ${id} not found`);
        };
        return card[0];
    }

    /**
     * This method deletes a card of a given type and id.
     * 
     * @param type - The type of card.
     * @param id - The id of the card.
     */
    async deleteCard(type: CardType, id: number) {
        const schema = this.formatType(type);
        await this.drizzleProvider.db.delete(schema).where(eq(schema.id, id));
    }

    /**
     * This method validates the data of an issue card.
     * 
     * @param card - The card to be validated.
     * @throws {BadRequestException} - If the card data is not valid.
     */
    private async validateIssueCard(card: CreateCardDto) {
        if (!card.title || !card.description) {
            throw new BadRequestException('Title and description are required');
        }
    }

    /**
     * This method creates an issue card.
     * 
     * @param card - The card to be created.
     */
    async createIssueCard(card: CreateCardDto) {
        this.validateIssueCard(card);
        const newCard = await this.drizzleProvider.db.insert(issueCard).values(
            {
                title: card.title,
                description: card.description,
            }).
            returning();
        return newCard[0];
    }

    /**
     * This method validates the data of a task card.
     *  
     * @param card - The card to be validated.
     * @throws {BadRequestException} - If the card data is not valid.
     */
    private async validateTaskCard(card: CreateCardDto) {
        if (!card.title || !card.category) {
            throw new BadRequestException('Title and category are required');
        }
    }

    /**
     * This method creates a task card.
     * 
     * @param card - The card to be created.
     */
    async createTaskCard(card: CreateCardDto) {
        this.validateTaskCard(card)
        const newCard = await this.drizzleProvider.db.insert(taskCard).values(
            {
                title: card.title,
                category: card.category,
            }).
            returning();
        return newCard[0];
    }

    /**
     * This method validates the data of a bug card.
     * 
     * @param card - The card to be validated.
     * @throws {BadRequestException} - If the card data is not valid.
     */
    private async validateBugCard(card: CreateCardDto) {
        if (!card.description) {
            throw new BadRequestException('Description is required');
        }
    }

    /**
     * This method creates a bug card.
     * 
     * @param card - The card to be created.
     * @todo Generate a random title function.
     */
    async createBugCard(card: CreateCardDto) {
        this.validateBugCard(card);
        card.title = 'Bug'+'-'+'RandomWord'+'-'+ Math.floor(Math.random() * 1000);
        const newCard = await this.drizzleProvider.db.insert(bugCard).values(
            {
                title: card.title,
                description: card.description,
            }).
            returning();
        return newCard[0];
    }

    /**
     * This method returns the Drizzle schema model name based on the type.
     * 
     * @param type - The type of card.
     */
    private formatType(type: CardType) {
        switch (type) {
            case CardType.ISSUE:
                return issueCard;
            case CardType.TASK:
                return taskCard;
            case CardType.BUG:
                return bugCard;
        };
    }
}
