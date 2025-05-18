export class CarDomain {
	id: string;
	stockId: string;
	peakSeasonPriceInCents: number;
	midSeasonPriceInCents: number;
	offSeasonPriceInCents: number;
	available: boolean;
	imageUrl?: string;

	constructor(props: CarDomain) {
		Object.assign(this, props);
	}
}
