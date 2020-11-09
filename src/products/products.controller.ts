import { ProductsService } from './products.service';
import { Controller, Get, Post, Header, Body, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async addProduct(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const productId = await this.productsService.addProduct(name, description, price);
    return { id: productId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productsService.getProductById(id);
    return product;
  }
}
