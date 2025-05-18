import { SeasonType } from '@prisma-generated/prisma';

export class SeasonDomain {
	id: string;
	type: SeasonType;
	from: string;
	to: string;

	constructor(props: SeasonDomain) {
		Object.assign(this, props);
	}
}
