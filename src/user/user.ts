import 'reflect-metadata'
import { ObjectType, Field, ID, InputType, InterfaceType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { Post } from "../post/post"

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Field()
  @IsNotEmpty()
  password: string

  @Field((type) => String, { nullable: true })
  token?: string | null

  @Field((type) => String, { nullable: true })
  salt?: string | null

  @Field((type) => String, { nullable: true })
  name?: string | null

  @Field((type) => [Post], { nullable: true })
  posts?: [Post] | null
}

@InputType({ description: "New User Input" })
export class SignUpUserInput {
  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Field()
  @IsNotEmpty()
  password: string

  @Field((type) => String, { nullable: true })
  token: string

  @Field((type) => String, { nullable: true })
  salt: string
}

@InputType()
export class SignInUserInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string
}

@InputType()
export class UpdateUserInput {
  @Field()
  id: number

  @Field()
  @IsNotEmpty()
  name: string
}

@InputType()
export class DeleteUserInput {
  @Field()
  id: number
}

@ObjectType()
export class Error1 {
  @Field()
  path: string

  @Field()
  message: string
}

