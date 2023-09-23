import { IsArray, IsNotEmpty } from "class-validator";
import { ApiKeyDto } from "../../../common/dto/api-key.dto";

export class CreateGroup extends ApiKeyDto {
  @IsNotEmpty()
  @IsArray()
  members: string[];
}
