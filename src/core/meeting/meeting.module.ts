import { Module } from "@nestjs/common";

import { MeetingController } from "./meeting.controller";
import { MeetingService } from "./meeting.service";

@Module({
  imports: [],
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingModule {}
