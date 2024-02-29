import { Injectable } from "@nestjs/common";
import * as dayjs from "dayjs";

import { PrismaService } from "../../lib/prisma";

import { AddQueue } from "./dto/add-queue.dto";
import { QueueId } from "./dto/queue-id.dto";
import { MeetingService } from "src/core/meeting/meeting.service";
import { QueueItem } from "@prisma/client";
import { NextQueueItemDto } from "src/core/queue/dto/next-queue-item.dto";
import { GroupIdDto } from "src/core/queue/dto/group-id.dto";

@Injectable()
export class QueueService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly meetingService: MeetingService,
  ) {}

  async next(nextQueueItem: NextQueueItemDto) {
    const { specialization, mentorId } = nextQueueItem;

    const specializationQueue = await this.prisma.queueItem.findMany({
      where: { specializationId: specialization },
    });

    if (specializationQueue.length === 0) {
      return {
        ok: false,
        error: null,
        data: "",
      };
    }

    let queueItem: QueueItem;

    if (specializationQueue.length === 1) {
      queueItem = specializationQueue[0];
    } else {
      const dateTimeArray = specializationQueue.map((dt) => {
        return dayjs(dt.createdAt);
      });

      const earliestTimestamp = dateTimeArray.reduce((min, current) => {
        return min.isBefore(current) ? min : current;
      });

      const oldestQueue = specializationQueue.find(
        (el) => el.createdAt.toISOString() === earliestTimestamp.toISOString(),
      );

      queueItem = oldestQueue;
    }

    const res = await this.meetingService.getMeetingUrlFromGroup({
      groupId: queueItem.groupId,
    });

    await this.prisma.mentor.update({
      where: { id: mentorId },
      data: {
        queueItemId: queueItem.id,
      },
    });

    return {
      ok: true,
      error: null,
      data: { queueItem, meetingLink: res.data },
    };
  }

  async add(addQueue: AddQueue) {
    const { groupId, specializationId } = addQueue;

    const queueItem = await this.prisma.queueItem.findUnique({
      where: { groupId },
    });

    if (queueItem) {
      return {
        ok: false,
        error: "A team can only ask for a mentor at a time.",
      };
    }

    const newQueueItem = await this.prisma.queueItem.create({
      data: {
        specialization: { connect: { id: specializationId } },
        group: { connect: { id: groupId } },
      },
    });

    return { ok: true, error: null, queueId: newQueueItem.id };
  }

  async getMentorship(groupIdDto: GroupIdDto) {
    const { groupId } = groupIdDto;

    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
      include: { queueItem: true },
    });

    return { ok: true, error: null, data: group };
  }

  async delete(queueIdDto: QueueId) {
    const { queueId } = queueIdDto;

    const queueItem = await this.prisma.queueItem.findUnique({
      where: { id: queueId },
    });

    if (!queueItem) {
      return {
        ok: false,
        error: "Queue item does not exist.",
      };
    }

    await this.prisma.queueItem.delete({
      where: { id: queueId },
    });

    return { ok: true, error: null };
  }
}
