import { Body, Controller, Post } from "@nestjs/common";

import { AddQueue } from "./dto/add-queue.dto";
import { QueueId } from "./dto/queue-id.dto";
import { QueueService } from "./queue.service";
import { NextQueueItemDto } from "src/core/queue/dto/next-queue-item.dto";
import { GroupIdDto } from "src/core/queue/dto/group-id.dto";

@Controller("queue")
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post("next")
  next(@Body() nextQueueItem: NextQueueItemDto) {
    return this.queueService.next(nextQueueItem);
  }

  @Post("add")
  add(@Body() addQueue: AddQueue) {
    return this.queueService.add(addQueue);
  }

  @Post("find")
  getMentorship(@Body() groupIdDto: GroupIdDto) {
    return this.queueService.getMentorship(groupIdDto);
  }

  @Post("delete")
  delete(@Body() queueId: QueueId) {
    return this.queueService.delete(queueId);
  }
}
