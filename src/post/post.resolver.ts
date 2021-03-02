import { Inject, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Args, Context, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { User } from '../user/user';
import { DraftDataInput, Post, UpdatePostInput, DeletePostInput } from './post';
import { PostService } from "./post.service";


@Resolver(of => Post)
export class PostResolver {
    //Instance of the prisma service
    constructor(
        @Inject(PrismaService) private prismaService: PrismaService,
        private postService: PostService
    ) { }


    @ResolveField()
    async author(@Root() post: Post): Promise<User | null> {
        return this.prismaService.post.findUnique({
            where: {
                id: post.id
            }
        }).User()
    }

    //Queries resolver
    //posts()
    @Query(returns => [Post], { name: "posts", description: "It returns all post published" })
    async getAllPosts(): Promise<Post[]> {
        return this.postService.getAllPosts();
    }

    //post(id)
    @Query((returns) => Post, { name: "post", nullable: true, description: "get post by Id" })
    async getPostById(@Args('id') id: number) {
        return this.postService.getPostById(id);
    }

    //Display published posts
    @Query(returns => [Post], { nullable: true })
    async feed(): Promise<Post[]> {
        return this.postService.feed();
    }

    //Mutation resolver
    //Create draft
    @Mutation(returns => Post, { nullable: true })
    async createDraft(
        @Args("draftData") draftData: DraftDataInput,
        @Context() ctx): Promise<Post> {
        return this.postService.createDraft(draftData);
    }

    //Publish draft
    @Mutation(returns => Post, { nullable: true })
    async publish(@Args("id") id: number): Promise<Post | null> {
        return this.postService.publish(id);
    }

    //Mutation resolver
    @Mutation(returns => Post, { description: "Update post" })
    @UsePipes(ValidationPipe)
    async updatePost(
        @Args("data") data: UpdatePostInput,
        @Context() ctx): Promise<Post> {

        return this.postService.updatePost(data);
    }

    @Mutation(returns => Post, { description: "Delete post" })
    @UsePipes(ValidationPipe)
    async deletePost(
        @Args("data") data: DeletePostInput,
        @Context() ctx): Promise<Post> {

        return this.postService.deletePost(data);
    }

}
