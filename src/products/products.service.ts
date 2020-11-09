import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addProduct(name: string, description: string, price: number) {
    const p = new this.productModel({ name, description, price });
    const result = await p.save();
    return result.id as number;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    const convertedProducts = products.map((p: Product) => this.toModel(p));
    return convertedProducts as Product[];
  }

  async getProductById(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Could not find product with id=' + id);
    }

    return this.toModel(product) as Product;
  }

  private toModel(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }
}
