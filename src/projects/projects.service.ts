import { Injectable, Headers, BadRequestException } from '@nestjs/common';
import {PrismaService} from '../prisma.service';


@Injectable()
export class ProjectsService {

    constructor(
        private prisma: PrismaService
    ){}

    async getProjectById(id: number) {
        
        try {
            const project = await this.prisma.project.findUnique({
                where: {
                    id
                }
            })
            if(project?.title == undefined) {
                return false
            }

            return project
        }
        catch(e) {
            console.log(e.message)
        }
    }

    async create(
        title: string,
        description: string,
        deadline: string,
        userId: number,
    ) {
        try {
            return await this.prisma.project.create({
                data: {
                    title,
                    description,
                    deadline,
                    userId
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
        deadline: string,
    ) {
        try {
            const project = await this.getProjectById(id)
            if(!project) {
                return new BadRequestException('project not found')
            }

            return await this.prisma.project.update({
                where: { id },
                data: { 
                    title,
                    description,
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
            const project = await this.getProjectById(id)
            if(!project) {
                return new BadRequestException('project not found')
            }

            return await this.prisma.project.delete({
                where: { id }
            })
        }
        catch(e) {
            console.log(e.message)
        }
    }
}
