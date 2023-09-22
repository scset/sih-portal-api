import { Body, Controller, Post } from "@nestjs/common";

import { MeetingUrlGroup } from "./dto/meeting-url-group.dto";
import { MeetingUrl } from "./dto/meeting-url.dto";
import { MeetingService } from "./meeting.service";

@Controller("meeting")
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post("url")
  getMeetingUrlFromGroup(@Body() meetingUrlGroup: MeetingUrlGroup) {
    return this.meetingService.getMeetingUrlFromGroup(meetingUrlGroup);
  }
  @Post("enrollment")
  getMeetingUrl(@Body() meetingUrl: MeetingUrl) {
    return this.meetingService.getMeetingUrl(meetingUrl);
  }
}
