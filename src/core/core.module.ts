import { Module } from "@nestjs/common";

import { PrismaModule } from "../lib/prisma";

import { GroupModule } from "./group/group.module";
import { MeetingModule } from "./meeting/meeting.module";
import { MentorModule } from "./mentor/mentor.module";
import { QueueModule } from "./queue/queue.module";
import { SpecializationModule } from "./specialization/specialization.module";

@Module({
  imports: [
    PrismaModule,
    GroupModule,
    MeetingModule,
    MentorModule,
    SpecializationModule,
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class CoreModule {}
