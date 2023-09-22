import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../lib/prisma";

@Injectable()
export class SpecializationService {
  constructor(private readonly prisma: PrismaService) {}

  async createSpecialization() {
    const specialization = [
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
