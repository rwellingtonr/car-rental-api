import { AbsUserRepository } from '@/application/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FindUserByEmailDomain } from '@/domain/find-user-by-email.domain';
import { Prisma } from '@prisma-generated/prisma';
import { FindUserByEmailMapper } from '../mapper/find-user-by-email.mapper';

@Injectable()
export class UserRepository implements AbsUserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findUserByEmail(email: string): Promise<FindUserByEmailDomain> {
		const result = await this.prismaService.user.findUnique({ where: { email } });
		return FindUserByEmailMapper.toDomain(result);
	}

	async create(user: Prisma.UserUncheckedCreateInput): Promise<void> {
		await this.prismaService.user.create({ data: user });
	}

	async findById(id: string): Promise<FindUserByEmailDomain> {
		const result = await this.prismaService.user.findUnique({ where: { id } });
		return FindUserByEmailMapper.toDomain(result);
	}
}
