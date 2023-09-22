import { Module } from "@nestjs/common";

import { MentorController } from "./mentor.controller";
import { MentorService } from "./mentor.service";

@Module({
  imports: [],
  controllers: [MentorController],
  providers: [MentorService],
})
export class MentorModule {}
