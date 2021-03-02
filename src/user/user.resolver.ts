import { Args, Context, Mutation, Query, ResolveField, Resolver, Root } from "@nestjs/graphql";
import { User, SignUpUserInput, SignInUserInput, UpdateUserInput, DeleteUserInput } from './user';
import { PrismaService } from "../prisma.service"
import { Inject, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Post } from "src/post/post";
import { JwtService } from "@nestjs/jwt";
import { GraphqlPassportAuthGuard } from "../auth/authguard";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
    //Instance of the prisma service
    constructor(@Inject(PrismaService) private prismaService: PrismaService, private jwtService: JwtService, private userService: UserService) { }

    //Queries resolver
    //users()
    @Query(returns => [User], { name: "users", description: "It returns all registered users" })
    @UsePipes(ValidationPipe)
    @UseGuards(GraphqlPassportAuthGuard)
    async getAllUsers(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    //user(id)
    @Query(returns => User, { name: "user", description: "get one user by id" })
    @UsePipes(ValidationPipe)
    async getUserById(
        @Args("id") id: number,
        @Context() ctx
    ): Promise<User> {
        return this.userService.getUserById(id);

    }

    @Query(returns => User, { description: "get one user by email and password" })
    @UsePipes(ValidationPipe)
    async signInUser(
        //argument from the query must be SignInUser type
        @Args("data") data: SignInUserInput, @Context() ctx, err) {
        return this.userService.signInUser(data);
    }

    //Mutation resolver
    @Mutation(returns => User, { description: "Create a new user" })
    @UsePipes(ValidationPipe)
    async signUpUser(
        //argument from the query must be SignUpUser type
        @Args("data") data: SignUpUserInput,
        @Context() ctx): Promise<User> {

        return this.userService.signUpUser(data);
    }

    //Mutation resolver
    @Mutation(returns => User, { description: "Update user" })
    @UsePipes(ValidationPipe)
    async updateUser(
        @Args("data") data: UpdateUserInput,
        @Context() ctx): Promise<User> {

        return this.userService.updateUser(data);
    }

    @Mutation(returns => User, { description: "Delete post" })
    @UsePipes(ValidationPipe)
    async deleteUser(
        @Args("data") data: DeleteUserInput,
        @Context() ctx): Promise<User> {

        return this.userService.deleteUser(data);
    }
    
}
