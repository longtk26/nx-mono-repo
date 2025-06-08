import { ConfigService } from '@nestjs/config';

export class EnvService {
  constructor(private readonly config: ConfigService) {}
}
