import { Injectable, Headers, BadRequestException } from '@nestjs/common';
import {PrismaService} from '../prisma.service';

@Injectable()
export class CardsService {

    constructor(
        private prisma: PrismaService
    ){}

    async getCardById(id: number) {
        
        try {
            const card = await this.prisma.card.findUnique({
                where: {
                    id
                }
            })
            if(card?.title == undefined) {
                return false
            }

            return card
        }
        catch(e) {
            console.log(e.message)
        }
    }

    async create(
        title: string,
        description: string,
        status: string,
        deadline: string,
        projectId: number,
    ) {
        try {
            return await this.prisma.card.create({
                data: {
                    title,
                    description,
                    status,
                    deadline,
                    projectId,
                }
            })
        }

        catch(e) {
            console.log(e.message)
        } 
    }

    async update(
        id: number,
        title: string,
        description: string,
        status: string,
        deadline: string,
    ) {
        try {
            const card = await this.getCardById(id)
            if(!card) {
                return new BadRequestException('card not found')
            }

            return await this.prisma.card.update({
                where: { id },
                data: { title,
                        description,
                        status,
                        deadline
                 }
            })
        }
        catch(e) {
            console.log(e.message)
        }
    }

    async delete(id: number) {
        try {
            const card = await this.getCardById(id)
            if(!card) {
                return new BadRequestException('card not found')
            }

            return await this.prisma.card.delete({
                where: { id }
            })
        }
        catch(e) {
            console.log(e.message)
        }
    }

    async changeStatus(
        id: number,
        status: string,
    ) {
        try {
            const card = await this.getCardById(id)
            if(!card) {
                return new BadRequestException('card not found')
            }

            return await this.prisma.card.update({
                where: { id },
                data: { status }
            })
        }
        catch(e) {
            console.log(e.message)
        }
    }
}
