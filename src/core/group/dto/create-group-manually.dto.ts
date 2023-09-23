import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ApiKeyDto } from "../../../common/dto/api-key.dto";

export class CreateGroupManually extends ApiKeyDto {
  @IsNotEmpty()
  @IsArray()
  members: string[];

  @IsNotEmpty()
  @IsString()
  meetingLink: string;
}
