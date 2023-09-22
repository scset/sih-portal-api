import { Body, Controller, Post } from "@nestjs/common";

import { CreateGroup } from "./dto/create-group.dto";
import { GroupService } from "./group.service";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post("create")
  createGroup(@Body() createGroup: CreateGroup) {
    return this.groupService.createGroup(createGroup);
  }
}
