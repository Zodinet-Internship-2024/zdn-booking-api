import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReadUserDTO } from 'src/modules/user/dto/read-user-dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ReadUserDTO = {
      id: request.user.sub,
      email: request.user.email,
      name: request.user.full_name,
      phone: request.user.phone,
    };

    return user;
  },
);
