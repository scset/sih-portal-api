import { IsNotEmpty, IsString } from "class-validator";

export class SpecializationId {
  @IsNotEmpty()
  @IsString()
  specialization: string;
}
