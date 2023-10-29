import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon already exist in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.error(error);
      throw new BadRequestException(`Can't create Pokemon - Check server logs`);
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(param: string) {
    let pokemon: Pokemon;

    if (!isNaN(+param)) {
      pokemon = await this.pokemonModel.findOne({ no: param });
    }

    if (!pokemon && isValidObjectId(param)) {
      pokemon = await this.pokemonModel.findById(param);
    }

    if (!pokemon && param) {
      pokemon = await this.pokemonModel.findOne({
        name: param.toLocaleLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no ${param}, not found`,
      );

    return pokemon;
  }

  async update(param: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(param);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    if (pokemon) {
      try {
        await pokemon.updateOne(updatePokemonDto, { new: true });
      } catch (error) {
        if (error.code === 11000) {
          throw new BadRequestException(
            `Pokemon already exist in db ${JSON.stringify(error.keyValue)}`,
          );
        }
        console.error(error);
        throw new BadRequestException(
          `Can't create Pokemon - Check server logs`,
        );
      }
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  remove(id: string) {
    return `This action removes a #${id} pokemon`;
  }
}
