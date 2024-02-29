import { IsNotEmpty, IsString } from "class-validator";

export class GroupIdDto {
  @IsNotEmpty()
  @IsString()
  groupId: string;
}
