import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';

import ProductService from '~services/ProductService';
import { ProductDto, ProductRegistrationDto } from '~services/types';
import { I_filter } from '~components/FilterBar/Type';

import sortProductHelper from '~utils/sortProductHelper';

@autobind
class ProductsStore {
  @observable products: ProductDto[] = [];
  @observable detailProduct: ProductDto = {} as ProductDto;

  private cache: ProductDto[] = [];

  constructor(private productService: ProductService) {}

  @action
  async getAllProducts() {
    const response = await this.productService.getAll();
    console.log(response.data.data);
    this.setProducts(response.data.data);
  }

  @action
  async getProduct(id: string) {
    const response = await this.productService.getById(id);
    this.setDetailProduct(response.data.data);
  }

  @action
  async getAllProductByCategory(category: number) {
    const response = await this.productService.getByCategory(category);
    console.log(response.data.data);
    this.setProducts(response.data.data);
  }

  @action
  async registrationProduct(product: ProductRegistrationDto) {
    try {
      const result = await this.productService.registration(product);
      alert(result.data.msg);
    } catch (e) {
      alert(e.response.data.msg);
    }
  }

  @action
  sortProduct(category: number, filters: I_filter[] | undefined) {
    if (this.cache.length < 1) this.cache = Array.from(this.products);
    if (!filters) return this.setProducts(this.cache);
    const sortedProducts = sortProductHelper(category, this.cache, filters);
    this.setProducts(sortedProducts);
  }

  @action
  setProducts(products: ProductDto[]) {
    this.products = products;
  }

  @action
  setDetailProduct(product: ProductDto) {
    console.log('product', product);
    this.detailProduct = product;
  }
}

export default ProductsStore;
