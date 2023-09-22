import { IsNotEmpty, IsString } from "class-validator";

export class MeetingUrlGroup {
  @IsNotEmpty()
  @IsString()
  groupId: string;
}
