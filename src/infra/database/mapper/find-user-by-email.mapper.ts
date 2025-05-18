import { FindUserByEmailDomain } from '@/domain/find-user-by-email.domain';
import { User } from '@prisma-generated/prisma';

export class FindUserByEmailMapper {
	static toDomain(user: User | null): FindUserByEmailDomain {
		if (!user) return null;
		return new FindUserByEmailDomain({
			id: user.id,
			email: user.email,
			password: user.password,
			driveLicense: user.driveLicense,
			driveLicenseExpiry: user.driveLicenseExpiry.toString(),
		});
	}
}
