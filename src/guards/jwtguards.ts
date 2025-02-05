import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtAuthGuards extends AuthGuard('jwt'){
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        super()
    }
    async canActivate(context: ExecutionContext) {
        const cont = context.switchToHttp()
        const req = cont.getRequest()
        const token = req.cookies["token"]
        req.authorization = token

    //    try {
    //        const payload = await this.jwtService.verifyAsync(token, {
    //            secret: await this.configService.get('JWT_SECRET'),
    //          });
    //    }
    //    catch {
    //        throw new UnauthorizedException()
        
    //    }
        return true
    }
}