import { Controller, Post } from "@nestjs/common";

import { SpecializationService } from "./specialization.service";

@Controller("specialization")
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Post("add")
  createSpecialization() {
    return this.specializationService.createSpecialization();
  }
}
