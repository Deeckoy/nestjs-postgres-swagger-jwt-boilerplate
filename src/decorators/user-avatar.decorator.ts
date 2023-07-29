import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { avatarStorage } from '../users/avatar-storage';

export function UserAvatar() {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('avatar', {
        storage: avatarStorage,
      }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          avatar: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
