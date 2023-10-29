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

  async create(createPokemonDto: CreatePokemonDto | CreatePokemonDto[]) {
    if (Array.isArray(createPokemonDto)) {
      createPokemonDto.forEach((item) => {
        item.name = item.name.toLocaleLowerCase();
      });

      try {
        const pokemon = await this.pokemonModel.insertMany(createPokemonDto);
        return pokemon;
      } catch (error) {
        this.handleExceptions(error);
      }
    } else {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      try {
        const pokemon = await this.pokemonModel.create(createPokemonDto);
        return pokemon;
      } catch (error) {
        this.handleExceptions(error);
      }
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
        this.handleExceptions(error);
      }
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(param: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: param });

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${param} not found`);
    }

    // const result = await this.pokemonModel.findByIdAndDelete(param);
    // const pokemon: Pokemon = await this.findOne(param);

    // if (pokemon) {
    //   await pokemon.deleteOne();
    // }
  }

  private handleExceptions(error: any) {
    console.log(error);

    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.error(error);
    throw new BadRequestException(`Can't create Pokemon - Check server logs`);
  }
}
