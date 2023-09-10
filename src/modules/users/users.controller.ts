import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserAvatar } from '../../decorators/user-avatar.decorator';
import { UserId } from '../../decorators/user-id.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UserAvatar()
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            message: 'File too large',
          }),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ) {
    console.log(avatar);

    return this.usersService.create({ ...createUserDto, avatar: avatar.path });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/0')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findMe(@UserId() id: number) {
    return this.usersService.findById(id);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.usersService.findById(+id);
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  @UserAvatar()
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.usersService.update(+id, {
      ...updateUserDto,
      avatar: avatar.path,
    });
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@UserId() id: number) {
    return this.usersService.remove(+id);
  }
}
