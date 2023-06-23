import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from 'src/user/interfaces';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
    ApiBearerAuth(),
    ApiResponse({ status: 403, description: 'Forbiden. Token related' }),
  );
};
