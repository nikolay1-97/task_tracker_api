import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { strict } from 'assert';
import supertest from 'supertest';



@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    async validateUser(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email)
        if(!user || password != user.password) {
            return false
        }
        return user
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password)

        if(!user) {
            return false
        }
        
        const payload = { id: user.id, email: user.email, role: user.role }

        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('EXPIRE_JWT')

        })
    }
}
