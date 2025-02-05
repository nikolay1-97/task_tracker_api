import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CardsService } from 'src/cards/cards.service';
import { Card } from '@prisma/client';

@Injectable()
export class UsertaskrelationService {
    constructor(
            private prisma: PrismaService,
            private cardService: CardsService
        ){}
    
        async getRow(cardId: number) {
            
            try {
                const row = await this.prisma.userCardRelation.findFirst({
                    where: {
                        cardId
                    }
                })
                if(row?.userId == undefined) {
                    return false
                }
                return row
            }
            catch(e) {
                console.log(e.message)
            }
        }

        async create(
            userId: number,
            cardId: number,
        ) {
            try {
                const card = await this.cardService.getCardById(cardId)
                if(!card) {
                    return new BadRequestException('card not found')
                }
                await this.cardService.changeStatus(cardId, 'in_work')

                return await this.prisma.userCardRelation.create({
                    data: {
                        userId,
                        cardId
                    }
                })
            }
            catch(e) {
                console.log(e.message)
            } 
        }

        async delete(cardId: number) {
                try {
                    const row = await this.getRow(cardId)
                    if(!row) {
                        return new BadRequestException('row not found')
                    }
                    const card = await this.cardService.getCardById(cardId)
                    if(!card) {
                        return new BadRequestException('card not found')
                    }

                    await this.cardService.delete(cardId)

                    const id = row.id
        
                    return await this.prisma.userCardRelation.delete({
                        where: { id }
                    })
                }
                catch(e) {
                    console.log(e.message)
                }
            }

        async getByStatus(userId: number, status: string) {
            const rows = await this.prisma.userCardRelation.findMany({
                where: { userId }
            })
            const result = Array()
            for(let count = 0; count < rows.length; count++) {
                let card = await this.cardService.getCardById(rows[count].cardId)
                if(card) {
                    if(card.status == status) {
                        result[card.id] = card
                    }
                }
            }

            return result
        }
}
