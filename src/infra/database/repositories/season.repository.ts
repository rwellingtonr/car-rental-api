import { AbsSeasonRepository } from '@/application/repository/season.repository';
import { SeasonDomain } from '@/domain/season.domain';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ListAllSeasonsMapper } from '../mapper/list-all-seasons.mapper';

@Injectable()
export class SeasonRepository implements AbsSeasonRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async listAllSeasons(): Promise<SeasonDomain[]> {
		const items = await this.prismaService.season.findMany();
		return items.map(ListAllSeasonsMapper.toDomain);
	}

	async findById(id: string): Promise<SeasonDomain> {
		const item = await this.prismaService.season.findUnique({ where: { id } });
		return ListAllSeasonsMapper.toDomain(item);
	}
}
