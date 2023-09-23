import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiKeyDto } from "../../../common/dto/api-key.dto";

export class MentorAdd extends ApiKeyDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
