import { Injectable, Headers, BadRequestException } from '@nestjs/common';
import {PrismaService} from '../prisma.service';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService
    ){}

    findAll() {
        const us = this.prisma.users.findMany()
        return us
    }

    async getUserByEmail(email: string) {
        
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    email
                }
            })
            if(user?.name == undefined) {
                return false
            }

            return user
        }
        catch(e) {
            console.log(e.message)
        }
    }

    async getUserById(id: number) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    id
                }
            })
        
            if(user?.name == undefined) {
                return false
            }
    
            return user
        }
        catch(e) {
            console.log(e.message)
        }
    }

    async create(name: string, email: string, password: string, role: string) {
        try {
            const user = await this.getUserByEmail(email)
            if(user) {
                return new BadRequestException('user already exists')
            }
            return await this.prisma.users.create({
                data: {
                    name,
                    email,
                    password,
                    role
                }
            })
        }

        catch(e) {
            console.log(e.message)
        } 
    }

    async update(id: number, role: string) {
        try {
            const user = await this.getUserById(id)
            if(!user) {
                return new BadRequestException('user not found')
            }

            return await this.prisma.users.update({
                where: { id },
                data: { role }
            })
        }
        catch(e) {
            console.log(e.message)
        }
    }

    async delete(id: number) {
        try {
            const user = await this.getUserById(id)
            if(!user) {
                return new BadRequestException('user not found')
            }

            return await this.prisma.users.delete({
                where: { id }
            })
        }
        catch(e) {
            console.log(e.message)
        }
    }
}

