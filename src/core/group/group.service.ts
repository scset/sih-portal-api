import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

import { PrismaService } from "../../lib/prisma";

import { CreateGroup } from "./dto/create-group.dto";

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async createGroup(createGroup: CreateGroup) {
    const { members, apiKey } = createGroup;

    if (apiKey !== this.config.get("API_KEY")) {
      return { ok: false, error: "Invalid Api Key" };
    }

    const { data } = await axios({
      method: "post",
      url: "https://graph.microsoft.com/v1.0/me/events",
      data: {
        subject: `${members[0]}`,
        start: {
          dateTime: "2023-09-22T17:00:00+0530",
          timeZone: "UTC",
        },
        end: {
          dateTime: "2023-09-24T20:00:00+0530",
          timeZone: "UTC",
        },
        isOnlineMeeting: true,
      },
      headers: {
        Authorization: `Bearer ${this.config.get("OUTLOOK_ACCESS_TOKEN")}`,
      },
    });

    console.log({ data });

    await this.prisma.group.create({
      data: { members, meetingLink: data.onlineMeeting.joinUrl },
    });

    return { ok: true, error: null };
  }
}
