import { Body, Controller, Post } from "@nestjs/common";

import { AddQueue } from "./dto/add-queue.dto";
import { QueueId } from "./dto/queue-id.dto";
import { SpecializationId } from "./dto/specialization-id.dto";
import { QueueService } from "./queue.service";

@Controller("queue")
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post("next")
  next(@Body() specializationId: SpecializationId) {
    return this.queueService.next(specializationId);
  }

  @Post("add")
  add(@Body() addQueue: AddQueue) {
    return this.queueService.add(addQueue);
  }

  @Post("find")
  find(@Body() queueId: QueueId) {
    return this.queueService.find(queueId);
  }

  @Post("delete")
  delete(@Body() queueId: QueueId) {
    return this.queueService.delete(queueId);
  }
}
