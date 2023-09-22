import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PrismaService } from "../../lib/prisma";

import { MeetingUrlGroup } from "./dto/meeting-url-group.dto";
import { MeetingUrl } from "./dto/meeting-url.dto";

@Injectable()
export class MeetingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {}

  async getMeetingUrl(MeetingUrl: MeetingUrl) {
    const { teamMemberEnrollment1, teamMemberEnrollment2 } = MeetingUrl;

    const group = await this.prisma.group.findFirst({
      where: {
        members: {
          has: teamMemberEnrollment1,
        },
      },
    });

    if (!group || !group.members.includes(teamMemberEnrollment2)) {
      return { ok: false, error: "Invalid Details" };
    }

    return {
      ok: true,
      error: null,
      data: { groupId: group.id, meetingLink: group.meetingLink },
    };
  }

  async getMeetingUrlFromGroup(meetingUrlGroup: MeetingUrlGroup) {
    const { groupId } = meetingUrlGroup;

    const group = await this.prisma.group.findFirst({
      where: {
        id: groupId,
      },
    });

    if (!group) {
      return { ok: false, error: "Invalid Details" };
    }

    return {
      ok: true,
      error: null,
      data: group.meetingLink,
    };
  }
}
