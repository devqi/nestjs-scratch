import { ProductsService } from './products.service';
import { Controller, Get, Post, Header, Body, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  addProduct(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const productId = this.productsService.addProduct(name, description, price);
    return { id: productId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productsService.getProductById(+id);
  }
}
