import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { PrismaService } from "../../lib/prisma";

import { MentorLogin } from "./dto/mentor-login.dto";

@Injectable()
export class MentorService {
  constructor(private readonly prisma: PrismaService) {}

  async add(mentorLogin: MentorLogin) {
    const { email, password } = mentorLogin;

    const en = () => {
      const uuid = uuidv4().split("-");
      return `E23CSEU${uuid[uuid.length - 1].substring(6)}`;
    };

    await this.prisma.mentor.create({
      data: {
        email: `${en()}@bennett.edu.in`,
      },
    });

    // if (!findGroup || !findGroup.members.includes(teamMemberEnrollment2)) {
    //   return { ok: false, error: "Invalid Details" };
    // }

    return { ok: true, error: null };
  }

  async login(mentorLogin: MentorLogin) {
    const { email, password } = mentorLogin;

    const mentor = await this.prisma.mentor.findFirst({
      where: { email },
    });

    if (!mentor || mentor.password !== password) {
      return { ok: false, error: "Invalid Details" };
    }

    return { ok: true, error: null, mentor };
  }
}
