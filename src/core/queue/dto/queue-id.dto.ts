import { IsNotEmpty, IsString } from "class-validator";

export class QueueId {
  @IsNotEmpty()
  @IsString()
  queueId: string;
}
