import { Field, InputType } from "@nestjs/graphql";
import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength} from "class-validator"
@InputType()
export class RegisterDTO{
	@Field()
	@IsNotEmpty({ message: "full name is required" })
	@IsString({ message: "full name must be a string" })
	fullName: string;
	@Field()
	@IsNotEmpty({ message: "password is required" })
	@MinLength(8, { message: "password must be atleast 8 characters" })
	@IsStrongPassword()
	password: string;
	@Field()
	@IsNotEmpty({ message: "confirm password is required" })
	confirmPassword: string;
	@Field()
	@IsNotEmpty({ message: "confirm password is required" })
	@IsEmail({}, { message: "email must be valid" })
	email: string;	
}

export class LoginDTO
{
	@Field()
	@IsNotEmpty({ message :"email is required"})
	@IsEmail({},{message:"email must be valid"})
	email:string
	@Field()
	@IsNotEmpty({message:"password is required"})
	@IsStrongPassword({},{message:"password must be strong"})
	password:string
	
}