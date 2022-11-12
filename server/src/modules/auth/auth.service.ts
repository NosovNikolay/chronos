import {Injectable} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {
  }

  async registration(): Promise<string> {
    return 'registration'
  }
}
