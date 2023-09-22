import { IsNotEmpty, IsString } from "class-validator";

export class MeetingUrl {
  @IsNotEmpty()
  @IsString()
  teamMemberEnrollment1: string;

  @IsNotEmpty()
  @IsString()
  teamMemberEnrollment2: string;
}
