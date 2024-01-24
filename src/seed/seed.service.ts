import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PokeResponse } from './types/poke-response.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

	constructor(
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon>,
		private httpService: HttpService
	) { }

	async executeSeed() {
		await this.pokemonModel.deleteMany({})

		const { data } = await firstValueFrom(
			this.httpService.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')		
		)

		const pokemonToInsert: {name: string, no: number}[] = []

		data.results.forEach(({name, url}) => {
			const segments = url.split('/');
			const no = +segments[segments.length - 2];
			pokemonToInsert.push({name, no})
		})

		await this.pokemonModel.insertMany(pokemonToInsert)

    return 'Seed completed!'
  }
}
