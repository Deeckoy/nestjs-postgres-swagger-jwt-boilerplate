import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'user@test.com',
  })
  email: string;

  @ApiProperty({
    default: 'password',
  })
  password: string;

  @ApiProperty({
    default: 'John',
  })
  firstName: string;

  @ApiProperty({
    default: 'Doe',
  })
  lastName: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty({
    default: '123456789',
  })
  phone: string;
}
