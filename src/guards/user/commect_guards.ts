import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CommentsService } from "src/comments/comments.service";

@Injectable()
export class CommentGuards extends AuthGuard('jwt'){
    constructor(
        private jwtService: JwtService,
        private commentService: CommentsService
    ) {
        super()
    }
    async canActivate(context: ExecutionContext) {
        
        const cont = context.switchToHttp()
        const req = cont.getRequest()
        const token = req.cookies["token"]
        const userData = this.jwtService.decode(token);
        const reqComment_id = Number(req.path.slice(-1))
        const comment = await this.commentService.getCommentById(reqComment_id)
        if(comment) {
            if(userData.id != comment.userId) {
                return false
            }
        }
        return true
    }
}