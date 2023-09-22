import { IsArray, IsNotEmpty } from "class-validator";

export class CreateGroup {
  @IsNotEmpty()
  @IsArray()
  members: string[];
}
