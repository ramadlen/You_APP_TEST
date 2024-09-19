import { Module } from '@nestjs/common';

import { ContactController } from './about.controller';
import { AboutService } from './about.service';

@Module({
  providers: [AboutService],
  exports: [AboutService],
  controllers: [ContactController],
})
export class AboutModule {}
