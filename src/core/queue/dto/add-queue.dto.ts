import { IsNotEmpty, IsString } from "class-validator";

export class AddQueue {
  @IsNotEmpty()
  @IsString()
  groupId: string;

  @IsNotEmpty()
  @IsString()
  specializationId: string;
}
