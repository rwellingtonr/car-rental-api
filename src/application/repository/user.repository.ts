import { FindUserByEmailDomain } from '@/domain/find-user-by-email.domain';
import { Prisma } from '@prisma-generated/prisma';

export abstract class AbsUserRepository {
	abstract findUserByEmail(email: string): Promise<FindUserByEmailDomain>;
	abstract findById(id: string): Promise<FindUserByEmailDomain>;
	abstract create(user: Prisma.UserUncheckedCreateInput): Promise<void>;
}
