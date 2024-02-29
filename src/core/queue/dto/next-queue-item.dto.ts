import { IsNotEmpty, IsString } from "class-validator";
import { SpecializationId } from "src/core/queue/dto/specialization-id.dto";

export class NextQueueItemDto extends SpecializationId {
  @IsNotEmpty()
  @IsString()
  mentorId: string;
}
