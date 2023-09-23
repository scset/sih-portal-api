import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../lib/prisma";

import { MentorLogin } from "./dto/mentor-login.dto";
import { MentorAdd } from "./dto/mentor-add.dto";
import { ConfigService } from "@nestjs/config";
import { ApiKeyDto } from "../../common/dto/api-key.dto";

@Injectable()
export class MentorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async add(mentorAdd: MentorAdd) {
    const { email, apiKey } = mentorAdd;

    if (apiKey !== this.config.get("API_KEY")) {
      return { ok: false, error: "Invalid Api Key" };
    }

    await this.prisma.mentor.create({
      data: { email },
    });

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

  async extractData(apiKeyDto: ApiKeyDto) {
    const { apiKey } = apiKeyDto;

    if (apiKey !== this.config.get("API_KEY")) {
      return { ok: false, error: "Invalid Api Key" };
    }

    const mentors = await this.prisma.mentor.findMany();

    return {
      ok: true,
      data: mentors.map((mentor) => {
        return [mentor.email, mentor.password];
      }),
    };
  }
}
