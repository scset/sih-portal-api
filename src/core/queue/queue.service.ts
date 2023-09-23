import { Injectable } from '@nestjs/common';
// import { v4 as uuidv4 } from "uuid";
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as dayjs from 'dayjs';

import { PrismaService } from '../../lib/prisma';

import { AddQueue } from './dto/add-queue.dto';
import { QueueId } from './dto/queue-id.dto';
import { SpecializationId } from './dto/specialization-id.dto';

@Injectable()
export class QueueService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async next(specializationId: SpecializationId) {
    const { specialization } = specializationId;

    const specializationQueue = await this.prisma.queueItem.findMany({
      where: { specializationId: specialization },
    });

    if (specializationQueue.length === 0) {
      return {
        ok: false,
        error: null,
        data: '',
      };
    }

    let queueItem;

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

    const { data } = await axios({
      method: 'post',
      url: `${this.config.get('API_URL')}/meeting/url`,
      data: {
        groupId: queueItem.groupId,
      },
    });

    return {
      ok: true,
      error: null,
      data: { queueItem, meetingLink: data.data },
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
        error: 'A team can only ask for a mentor at a time.',
      };
    }

    const newQueueItem = await this.prisma.queueItem.create({
      data: {
        specialization: { connect: { id: specializationId } },
        group: { connect: { id: groupId } },
      },
    });

    return { ok: true, error: null, data: newQueueItem.id };
  }

  async find(queueIdDto: QueueId) {
    const { queueId } = queueIdDto;

    const queueItem = await this.prisma.queueItem.findUnique({
      where: { id: queueId },
    });

    if (!queueItem) {
      return {
        ok: false,
        error: 'You do not have any active mentor request.',
      };
    }

    return { ok: true, error: null, data: queueItem };
  }

  async delete(queueIdDto: QueueId) {
    const { queueId } = queueIdDto;

    const queueItem = await this.prisma.queueItem.findUnique({
      where: { id: queueId },
    });

    if (!queueItem) {
      return {
        ok: false,
        error: 'You do not have any active mentor request.',
      };
    }

    await this.prisma.queueItem.delete({
      where: { id: queueId },
    });

    return { ok: true, error: null };
  }
}
