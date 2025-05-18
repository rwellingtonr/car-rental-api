import type { User } from '@/common/decorators/current-user.decorator';

declare global {
	namespace Express {
		// Estendendo a interface Request do Express
		export interface Request {
			user?: User;
		}
	}
}
