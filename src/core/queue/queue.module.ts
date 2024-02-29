import { Module } from "@nestjs/common";

import { QueueController } from "./queue.controller";
import { QueueService } from "./queue.service";
import { MeetingService } from "src/core/meeting/meeting.service";

@Module({
  imports: [],
  controllers: [QueueController],
  providers: [QueueService, MeetingService],
})
export class QueueModule {}
