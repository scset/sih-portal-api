import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../lib/prisma";
import { ApiKeyDto } from "../../common/dto/api-key.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SpecializationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async createSpecialization(apiKeyDto: ApiKeyDto) {
    const { apiKey } = apiKeyDto;

    if (apiKey !== this.config.get("API_KEY")) {
      return { ok: false, error: "Invalid Api Key" };
    }

    const specialization = [
      "General Request",
      "AI",
      "DataScience",
      "Blockchain",
      "FullStack",
      "DevOps",
      "IOT",
      "Quantum Computing",
      "Mobile Technology",
      "Drones",
      "AR/VR",
      "Gaming",
      "CyberSecurity",
      "Product Design Technology",
      "Cloud Computing",
      "Robotics Process Automation",
    ];

    specialization.forEach(async (sep) => {
      await this.prisma.specialization.create({ data: { name: sep } });
    });
  }
}
