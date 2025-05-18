import { AbsUserRepository } from '@/application/repository/user.repository';
import { FindUserByEmailDomain } from '@/domain/find-user-by-email.domain';
import type { Prisma, User } from '@prisma-generated/prisma';
import { randomUUID } from 'node:crypto';
import { FindUserByEmailMapper } from '../mapper/find-user-by-email.mapper';

export class UserRepositoryInMemory implements AbsUserRepository {
	user: User[] = [];

	async findUserByEmail(email: string): Promise<FindUserByEmailDomain> {
		const result = this.user.find((user) => user.email === email);
		await Promise.resolve();
		return FindUserByEmailMapper.toDomain(result);
	}
	async create(user: Prisma.UserUncheckedCreateInput): Promise<void> {
		await Promise.resolve(
			this.user.push({
				...user,
				id: randomUUID(),
				createdAt: new Date(),
				updatedAt: new Date(),
				driveLicenseExpiry: new Date(user.driveLicenseExpiry),
			}),
		);
	}

	async findById(id: string): Promise<FindUserByEmailDomain> {
		const result = this.user.find((user) => user.id === id);
		await Promise.resolve();
		return FindUserByEmailMapper.toDomain(result);
	}
}
