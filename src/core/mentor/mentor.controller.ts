import { Body, Controller, Post } from "@nestjs/common";

import { MentorLogin } from "./dto/mentor-login.dto";
import { MentorService } from "./mentor.service";
import { MentorAdd } from "./dto/mentor-add.dto";
import { ApiKeyDto } from "../../common/dto/api-key.dto";

@Controller("mentor")
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @Post("add")
  add(@Body() mentorAdd: MentorAdd) {
    return this.mentorService.add(mentorAdd);
  }

  @Post("login")
  login(@Body() mentorLogin: MentorLogin) {
    return this.mentorService.login(mentorLogin);
  }

  @Post("extract-data")
  extractData(@Body() apiKeyDto: ApiKeyDto) {
    return this.mentorService.extractData(apiKeyDto);
  }
}
