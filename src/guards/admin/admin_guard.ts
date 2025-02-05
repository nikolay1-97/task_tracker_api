import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminGuards extends AuthGuard('jwt'){
    constructor(private jwtService: JwtService) {
        super()
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const cont = context.switchToHttp()
        const req = cont.getRequest()
        const token = req.cookies["token"]
        const userData = this.jwtService.decode(token);
        if(userData.role != 'admin') {
            return false
        }

        return true
    }
}