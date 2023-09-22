import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

import { PrismaService } from "../../lib/prisma";

import { CreateGroup } from "./dto/create-group.dto";

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {}

  async createGroup(createGroup: CreateGroup) {
    const { members } = createGroup;
    await this.prisma.group.create({ data: { members } });

    await axios({
      method: "post",
      url: `${this.config.get("API_URL")}/meeting/enrollment`,
      data: {
        teamMemberEnrollment1: members[0].toUpperCase(),
        teamMemberEnrollment2: members[1].toUpperCase(),
      },
    });

    return { ok: true, error: null };
  }
}
