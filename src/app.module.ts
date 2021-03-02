import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql"
import { join } from 'path';
import { PostResolver } from './post/post.resolver';
import { PrismaService } from './prisma.service';
import { UserResolver } from './user/user.resolver';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
// import { JwtStrategy } from './jwt-strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: "topSecret",
      signOptions: {
        expiresIn: 3600
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    GraphQLModule.forRoot({
      cors: {
        origin: '*',
        credentials: true,
      },
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      context: ({ req }) => ({ req })
    })
  ],
  controllers: [],
  providers: [PrismaService, UserResolver, PostResolver, UserService, PostService],
  exports: []
})
export class AppModule { }

