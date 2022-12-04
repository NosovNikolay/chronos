import { IsJWT } from 'class-validator';

export class UseInviteTokenRequestDto {
  @IsJWT()
  inviteToken: string;
}
