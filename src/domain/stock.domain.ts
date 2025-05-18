export class StockDomain {
	id: string;
	brand: string;
	model: string;
	peakSeasonPriceInCents: number;
	midSeasonPriceInCents: number;
	offSeasonPriceInCents: number;
	imageUrl?: string | null;
	availableCount: number;

	constructor(params: StockDomain) {
		Object.assign(this, params);
	}
}
