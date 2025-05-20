const { PrismaClient, SeasonType } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
	const hasBeenSeeded = await prisma.stock.count();
	if (hasBeenSeeded > 0) return;

	const stockCars = [
		{
			brand: 'Toyota',
			model: 'Yaris',
			stock: 3,
			peakSeasonPriceInCents: 9843,
			midSeasonPriceInCents: 7689,
			offSeasonPriceInCents: 5365,
			imageUrl: 'https://media.toyota.com.br/8f67491b-7e20-4c1f-bfb4-1a009591a6a4.jpeg',
		},
		{
			brand: 'Seat',
			model: 'Ibiza',
			stock: 5,
			peakSeasonPriceInCents: 8512,
			midSeasonPriceInCents: 6573,
			offSeasonPriceInCents: 4685,
			imageUrl:
				'https://www.seat.ps/content/dam/public/seat-website/carworlds/new-cw-ibiza/ibiza-reference/header-version/seat-ibiza-reference-colour-candy-white.png',
		},
		{
			brand: 'Nissan',
			model: 'Qashqai',
			stock: 2,
			peakSeasonPriceInCents: 10146,
			midSeasonPriceInCents: 8294,
			offSeasonPriceInCents: 5987,
			imageUrl:
				'https://www-europe.nissan-cdn.net/content/dam/Nissan/nissan_europe/UNVEIL_QQ-PUSH/new-unveil-qashqai.png',
		},
		{
			brand: 'Jaguar',
			model: 'e-pace',
			stock: 1,
			peakSeasonPriceInCents: 12054,
			midSeasonPriceInCents: 9135,
			offSeasonPriceInCents: 7027,
			imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhw0MuUpgOkulh3bfyTL_SL2Ml2Bp-2EFWHA&s',
		},
		{
			brand: 'Mercedes',
			model: 'Vito',
			stock: 2,
			peakSeasonPriceInCents: 10916,
			midSeasonPriceInCents: 8964,
			offSeasonPriceInCents: 6497,
			imageUrl:
				'https://www.mercedes-benz.pt/content/dam/hq/vans/models/vito/tourer-(cy-24-1)/mercedes-benz-vito-tourer-exterior-SSPIP152013.jpg',
		},
	];

	for (const stockCar of stockCars) {
		await prisma.stock.create({
			data: {
				brand: stockCar.brand,
				model: stockCar.model,
				cars: {
					createMany: {
						data: Array.from({ length: stockCar.stock }).map(() => ({
							midSeasonPriceInCents: stockCar.midSeasonPriceInCents,
							offSeasonPriceInCents: stockCar.offSeasonPriceInCents,
							peakSeasonPriceInCents: stockCar.peakSeasonPriceInCents,
							imageUrl: stockCar.imageUrl,
							available: true,
						})),
					},
				},
			},
		});
	}

	await prisma.season.createMany({
		data: [
			{
				startDate: new Date('2025-06-01T00:00:00.000Z'),
				endDate: new Date('2025-09-14T23:59:59.999Z'),
				type: SeasonType.PEAK,
			},
			{
				startDate: new Date('2025-09-15T00:00:00.000Z'),
				endDate: new Date('2025-10-31T23:59:59.999Z'),
				type: SeasonType.MID,
			},
			{
				startDate: new Date('2025-11-01T00:00:00.000Z'),
				endDate: new Date('2026-02-28T23:59:59.999Z'),
				type: SeasonType.OFF,
			},
			{
				startDate: new Date('2026-03-01T00:00:00.000Z'),
				endDate: new Date('2026-05-31T23:59:59.999Z'),
				type: SeasonType.MID,
			},
		],
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
