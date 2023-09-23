import { Controller, Post } from "@nestjs/common";

import { SpecializationService } from "./specialization.service";
import { ApiKeyDto } from "../../common/dto/api-key.dto";

@Controller("specialization")
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Post("add")
  createSpecialization(apiKey: ApiKeyDto) {
    return this.specializationService.createSpecialization(apiKey);
  }
}
