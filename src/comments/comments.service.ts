import { Injectable, Headers, BadRequestException } from '@nestjs/common';
import {PrismaService} from '../prisma.service';


@Injectable()
export class CommentsService {

    constructor(
        private prisma: PrismaService
    ){}

    async getCommentById(id: number) {
        
        try {
            const comment = await this.prisma.comment.findUnique({
                where: {
                    id
                }
            })
            if(comment?.description == undefined) {
                return false
            }

            return comment
        }
        catch(e) {
            console.log(e.message)
        }
    }

    async create(
        description: string,
        userId: number,
        cardId: number,
    ) {
        try {
            return await this.prisma.comment.create({
                data: {
                    description,
                    userId,
                    cardId
                }
            })
        }

        catch(e) {
            console.log(e.message)
        } 
    }

    async delete(id: number) {
        try {
            const comment = await this.getCommentById(id)
            if(!comment) {
                return new BadRequestException('comment not found')
            }

            return await this.prisma.comment.delete({
                where: { id }
            })
        }
        catch(e) {
            console.log(e.message)
        }
    }
}
