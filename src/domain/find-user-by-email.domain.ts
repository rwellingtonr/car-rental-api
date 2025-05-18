export class FindUserByEmailDomain {
	id: string;
	email: string;
	password: string;
	driveLicense: string;
	driveLicenseExpiry: string;

	constructor(props: FindUserByEmailDomain) {
		Object.assign(this, props);
	}
}
