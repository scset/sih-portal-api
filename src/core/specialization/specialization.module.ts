import { Module } from "@nestjs/common";

import { SpecializationController } from "./specialization.controller";
import { SpecializationService } from "./specialization.service";

@Module({
  imports: [],
  controllers: [SpecializationController],
  providers: [SpecializationService],
})
export class SpecializationModule {}
