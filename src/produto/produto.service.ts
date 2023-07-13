/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProdutoEntity } from "./produto.entity";
import { AtualizaProdutoDTO } from "./dto/atualizaProduto.dto";

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produtoEntity: ProdutoEntity) {
    await this.produtoRepository.save(produtoEntity);
  }

  async listProdutos() {
    const produtosSalvos = await this.produtoRepository.find();
    return produtosSalvos;
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });
    Object.assign(entityName, novosDados);
    await this.produtoRepository.save(entityName);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }


}