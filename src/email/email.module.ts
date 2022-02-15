import { forwardRef, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { EmailConstants } from 'src/constants/constants';

@Module({
  imports: [JwtModule.register({ secret: EmailConstants.secret }), forwardRef(() => UsersModule)],
  providers: [EmailService],
  exports: [EmailService],
  controllers: [EmailController]
})
export class EmailModule {}
