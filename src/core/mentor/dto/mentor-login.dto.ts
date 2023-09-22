import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class MentorLogin {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
