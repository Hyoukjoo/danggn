import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';

import ProductService from '~services/ProductService';
import { ProductDto, ProductRegistrationDto, ProductWithOptionDto } from '~services/types';
import { I_filter } from '~components/FilterBar/Type';

import sortProductHelper from '~utils/sortProductHelper';
import { I_Filter } from '~components/FixedTopBar';
import filterProductsHelper from '~utils/filterProductHelper';

@autobind
class ProductsStore {
  @observable products: ProductDto[] = [];
  @observable detailProduct: ProductWithOptionDto = {} as ProductWithOptionDto;

  private cache: ProductDto[] = [];

  constructor(private productService: ProductService) {}

  @action
  async getAllProducts() {
    const response = await this.productService.getAll();
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
    this.setProducts(response.data.data);
    this.cache = response.data.data;
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
  filterProduct(category: number | undefined, filter: I_Filter | undefined) {
    if (!filter) return this.setProducts(this.cache);
    const filteredProducts = filterProductsHelper(category, this.cache, filter);
    this.setProducts(filteredProducts);
  }

  @action
  sortProduct(category: number, filters: I_filter[] | undefined) {
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
    this.detailProduct = product;
  }
}

export default ProductsStore;
