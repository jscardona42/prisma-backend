import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Post } from 'src/post/post';
import { PrismaService } from 'src/prisma.service';
import { User } from '../user/user';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class PostService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService) { }

    async getAllPosts(): Promise<Post[]> {
        return await this.prismaService.post.findMany();
    }

    async getPostById(id) {
        return await this.prismaService.post.findUnique({
            where: { id: id },
        })
    }

    async feed(): Promise<Post[]> {
        return await this.prismaService.post.findMany({
            where: {
                published: true,
            }
        })
    }

    async createDraft(draftData): Promise<Post> {
        return this.prismaService.post.create({
            data: {
                title: draftData.title,
                content: draftData.content,
                User: {
                    create: { email: draftData.authorEmail }
                }
            }
        })
    }

    async publish(id): Promise<Post | null> {
        return this.prismaService.post.update({
            where: {
                id: id
            },
            data: {
                published: true,
            }
        })
    }

    async updatePost(data): Promise<Post> {
        const postExists = await this.getPostById(data.id);

        if (!postExists) {
            throw new NotFoundException(`Post with ID ${data.id} not found`);
        }

        const post = await this.prismaService.post.update({
            where: { id: data.id, },
            data: {
                title: data.title,
                content: data.content,
                User: {
                    create: { email: data.authorEmail }
                }
            },
        })

        return post;
    }

    async deletePost(data): Promise<Post> {
        const postExists = await this.getPostById(data.id);

        if (!postExists) {
            throw new NotFoundException(`Post with ID ${data.id} not found`);
        }

        const post = await this.prismaService.post.delete({
            where: { id: data.id, }
        })

        return post;
    }
}
