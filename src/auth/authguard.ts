
import { CanActivate, Injectable, ExecutionContext,  UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import * as jwt from 'jsonwebtoken'
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GraphqlPassportAuthGuard extends AuthGuard('jwt') {
    //   roles: string[];

    constructor(private prismaService: PrismaService) {
        super();
    }

    canActivate(context: ExecutionContext): boolean {
        try {
            const ctx = GqlExecutionContext.create(context);
            const req = ctx.getContext().req;

            var tkn = req.headers.authorization.split(' ')[1];

            var token = jwt.verify(tkn, 'topSecret');
            if (token === null) {
                throw new UnauthorizedException("Usuario no autorizado1" );
            }
            const user = this.validate(token, tkn);
            if (!user) {
                throw new UnauthorizedException("Usuario no autorizado2");
            }
        } catch (error) {
            throw new UnauthorizedException("Usuario no autorizado3");

        }
        return true;
    }

    async validate(token: any, tkn: any) {
        const user = await this.prismaService.user.findFirst(
            { where: { id: token.userId, token: tkn } }
        )
        if (!user) {
            throw new UnauthorizedException("El usuario no existe o el token es incorrecto")
        }

        return user;
    }
}
