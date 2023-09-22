import { Body, Controller, Post } from "@nestjs/common";

import { MentorLogin } from "./dto/mentor-login.dto";
import { MentorService } from "./mentor.service";

@Controller("mentor")
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @Post("add")
  add(@Body() mentorLogin: MentorLogin) {
    return this.mentorService.add(mentorLogin);
  }

  @Post("login")
  login(@Body() mentorLogin: MentorLogin) {
    return this.mentorService.login(mentorLogin);
  }
}
