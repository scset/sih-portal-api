import { Body, Controller, Post } from "@nestjs/common";

import { CreateGroup } from "./dto/create-group.dto";
import { GroupService } from "./group.service";
import { CreateGroupManually } from "./dto/create-group-manually.dto";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post("create")
  createGroup(@Body() createGroup: CreateGroup) {
    return this.groupService.createGroup(createGroup);
  }

  @Post("create-manually")
  createGroupManually(@Body() createGroupManually: CreateGroupManually) {
    return this.groupService.createGroupManually(createGroupManually);
  }
}
