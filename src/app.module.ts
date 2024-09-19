import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AboutModule } from './about/about.module';

@Module({
  imports: [CommonModule, UserModule, AboutModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
