import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ProjectsService } from "src/projects/projects.service";

@Injectable()
export class ProjectGuards extends AuthGuard('jwt'){
    constructor(
        private jwtService: JwtService,
        private projectService: ProjectsService
    ) {
        super()
    }
    async canActivate(context: ExecutionContext) {
        
        const cont = context.switchToHttp()
        const req = cont.getRequest()
        const token = req.cookies["token"]
        const userData = this.jwtService.decode(token);
        const reqProject_id = Number(req.path.slice(-1))
        const project = await this.projectService.getProjectById(reqProject_id)
        if(project) {
            if(userData.id != project.userId) {
                return false
            }
        }
        return true
    }
}