import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(name: string, description: string, price: number): number {
    const id = Date.now();
    const p = new Product(id, name, description, price);
    this.products.push(p);
    return id;
  }

  getProducts() {
    return { products: [...this.products] };
  }

  getProductById(id: number) {
    return this.byId(id);
  }

  private byId(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Could not find product with id=' + id);
    }

    return { ...product };
  }
}
