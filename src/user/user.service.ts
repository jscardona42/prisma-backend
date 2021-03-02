import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Post } from 'src/post/post';
import { PrismaService } from 'src/prisma.service';
import { User, SignUpUserInput, SignInUserInput, UpdateUserInput, DeleteUserInput } from './user';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService) { }


    getAllUsers(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    async getUserById(id): Promise<User> {
        const user = await this.prismaService.user.findUnique(
            { where: { id: id } }
        )

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async signInUser(data) {
        const salt = await this.prismaService.user.findFirst({
            where: { email: data.email },
            select: { salt: true },
        })

        const userId = await this.prismaService.user.findFirst({
            where: {
                email: data.email,
                password: await this.hashPassword(data.password, salt.salt)
            },
        })

        if (!userId) {
            throw new AuthenticationError('Invalid credentials');
        }

        const token = this.jwtService.sign({ userId: userId.id });
        const updToken = this.createToken(token, userId)

        return updToken;
    }

    async signUpUser(data): Promise<User> {
        const salt = await bcrypt.genSalt();

        const user = this.prismaService.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: await this.hashPassword(data.password, salt),
                salt: salt,
                token: data.token
            }
        })

        if (!user) {
            throw new UserInputError('Error');
        }

        return user;
    }

    async updateUser(data): Promise<User> {
        const userExists = await this.getUserById(data.id);

        if (!userExists) {
            throw new NotFoundException(`User with ID ${data.id} not found`);
        }

        const user = await this.prismaService.user.update({
            where: { id: data.id, },
            data: { name: data.name },
        })

        return user;
    }

    async deleteUser(data): Promise<User> {
        const userExists = await this.getUserById(data.id);

        if (!userExists) {
            throw new NotFoundException(`User with ID ${data.id} not found`);
        }

        const user = await this.prismaService.user.delete({
            where: { id: data.id, }
        })

        return user;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async createToken(token: string, userId) {
        const updToken = await this.prismaService.user.update({
            where: { id: userId.id, },
            data: { token: token, },
            select: { token: true }
        })

        return updToken;
    }


}
