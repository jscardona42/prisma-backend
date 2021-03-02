// import { Args, Context, Mutation, Query, ResolveField, Resolver, Root } from "@nestjs/graphql";
// import { User, SignUpUserInput, SignInUserInput, UpdateUserInput, DeleteUserInput } from './user';
// import { PrismaService } from "../prisma.service"
// import { Inject, NotFoundException, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
// import { Post } from "src/post/post";
// import * as bcrypt from "bcryptjs";
// import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server-express'
// import { JwtService } from "@nestjs/jwt";
// import { GraphqlPassportAuthGuard } from "../auth/authguard";
// import * as jwt from 'jsonwebtoken'
// import { UserService } from "./user.service";

// @Resolver(of => User)
// export class UserResolver {
//     //Instance of the prisma service
//     constructor(@Inject(PrismaService) private prismaService: PrismaService, private jwtService: JwtService, private userService: UserService) { }

//     @Query(returns => [User], { name: "users1", description: "It returns all registered users" })
//     @UsePipes(ValidationPipe)
//     @UseGuards(GraphqlPassportAuthGuard)
//     async listarProductos(): Promise<User[]> {
//         return this.userService.listarProductos();
//     }

//     //Field resolver
//     @ResolveField()
//     @UsePipes(ValidationPipe)
//     async posts(@Root() user: User, @Context() ctx): Promise<Post[]> {
//         return this.prismaService.user.findUnique({
//             where: {
//                 id: user.id
//             }
//         }).Post()
//     }

//     //Queries resolver
//     //users()
//     @Query(returns => [User], { name: "users", description: "It returns all registered users" })
//     @UsePipes(ValidationPipe)
//     @UseGuards(GraphqlPassportAuthGuard)
//     async getAllUsers(): Promise<User[]> {
//         return this.prismaService.user.findMany();
//     }

//     //user(id)
//     @Query(returns => User, { name: "user", description: "get one user by id" })
//     @UsePipes(ValidationPipe)
//     async getUserById(
//         @Args("id") id: number,
//         @Context() ctx
//     ): Promise<User> {

//         const user = await this.prismaService.user.findUnique(
//             { where: { id: id } }
//         )

//         if (!user) {
//             throw new NotFoundException(`User with ID ${id} not found`);
//         }

//         return user;
//     }

//     @Query(returns => User, { description: "get one user by email and password" })
//     @UsePipes(ValidationPipe)
//     async signInUser(
//         //argument from the query must be SignInUser type
//         @Args("data") data: SignInUserInput, @Context() ctx, err) {
//         const salt = await this.prismaService.user.findFirst({
//             where: { email: data.email },
//             select: { salt: true },
//         })

//         const userId = await this.prismaService.user.findFirst({
//             where: {
//                 email: data.email,
//                 password: await this.hashPassword(data.password, (await salt).salt)
//             },
//         })

//         if (!userId) {
//             throw new AuthenticationError('Invalid credentials');
//         }

//         const token = this.jwtService.sign({ userId: userId.id });
//         const updToken = this.createToken(token, userId)

//         return updToken;
//     }

//     //Mutation resolver
//     @Mutation(returns => User, { description: "Create a new user" })
//     @UsePipes(ValidationPipe)
//     async signUpUser(
//         //argument from the query must be SignUpUser type
//         @Args("data") data: SignUpUserInput,
//         @Context() ctx): Promise<User> {

//         const salt = await bcrypt.genSalt();

//         const user = this.prismaService.user.create({
//             data: {
//                 email: data.email,
//                 name: data.name,
//                 password: await this.hashPassword(data.password, salt),
//                 salt: salt,
//                 token: data.token
//             }
//         })

//         if (!user) {
//             throw new UserInputError('Error');
//         }

//         return user;
//     }

//     //Mutation resolver
//     @Mutation(returns => User, { description: "Update user" })
//     @UsePipes(ValidationPipe)
//     async updateUser(
//         @Args("data") data: UpdateUserInput,
//         @Context() ctx): Promise<User> {

//         const userExists = await this.getUserById(data.id, null);

//         if (!userExists) {
//             throw new NotFoundException(`User with ID ${data.id} not found`);
//         }

//         const user = await this.prismaService.user.update({
//             where: { id: data.id, },
//             data: { name: data.name },
//         })

//         return user;
//     }

//     @Mutation(returns => User, { description: "Update user" })
//     @UsePipes(ValidationPipe)
//     async deleteUser(
//         @Args("data") data: DeleteUserInput,
//         @Context() ctx): Promise<User> {

//         const userExists = await this.getUserById(data.id, null);

//         if (!userExists) {
//             throw new NotFoundException(`User with ID ${data.id} not found`);
//         }

//         const user = await this.prismaService.user.delete({
//             where: { id: data.id, }
//         })

//         return user;
//     }

//     //Guardamos el token en la base de datos
//     async createToken(token: string, userId) {
//         const updToken = await this.prismaService.user.update({
//             where: { id: userId.id, },
//             data: { token: token, },
//             select: { token: true }
//         })

//         return updToken;
//     }

//     private async hashPassword(password: string, salt: string): Promise<string> {
//         return bcrypt.hash(password, salt);
//     }

// }
