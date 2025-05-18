import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type User = {
	id: string;
};

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
	const request = ctx.switchToHttp().getRequest<Request>();
	return request.user;
});
