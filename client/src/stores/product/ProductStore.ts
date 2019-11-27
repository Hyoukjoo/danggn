import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';

import ProductService from '~services/ProductService';
import { ProductDto, ProductRegistrationDto, ProductWithOptionDto, I_Filter } from '~services/types';
import { I_filter } from '~components/FilterBar/Type';

import sortProductHelper from '~utils/sortProductHelper';
import filterProductsHelper from '~utils/filterProductHelper';

@autobind
class ProductsStore {
  @observable products: ProductDto[] = [];
  @observable detailProduct: ProductWithOptionDto = {} as ProductWithOptionDto;
  @observable filter: I_Filter | undefined = undefined;
  @observable hasMoreProducts: boolean = true;
  @observable lastId: number = 0;

  private cache: ProductDto[][] = [];
  private currentCategory: number = 486;

  constructor(private productService: ProductService) {}

  @action
  async getAllProducts(lastId?: number) {
    const response = await this.productService.getAll(lastId);
    if (this.currentCategory !== 486) {
      this.currentCategory = 486;
      this.hasMoreProducts = response.data.data.length === 12;
      return this.setProducts(response.data.data);
    }
    if (this.products.length > 0 && this.products[0].id === response.data.data[0].id) return;
    this.hasMoreProducts = response.data.data.length === 12;
    this.setProducts(this.products.concat(response.data.data));
  }

  @action
  async getProduct(id: string) {
    const response = await this.productService.getById(id);
    this.setDetailProduct(response.data.data);
  }

  @action
  async getAllProductByCategory(category: number, lastId?: number) {
    let response;
    if (this.currentCategory === category) {
      if (lastId && this.cache[category][this.cache[category].length - 1].id < lastId) {
        response = await this.productService.getByCategory(
          category,
          this.cache[category][this.cache[category].length - 1].id,
        );
      } else {
        response = await this.productService.getByCategory(category, lastId);
      }
    } else {
      response = await this.productService.getByCategory(category);
    }

    this.hasMoreProducts = response.data.data.length === 12;

    if (this.currentCategory === category) {
      if (this.cache[category][0].id !== response.data.data[0].id) {
        const newProducts = this.cache[category] ? this.cache[category].concat(response.data.data) : response.data.data;
        const filteredProducts = this.filter ? filterProductsHelper(category, newProducts, this.filter) : newProducts;
        this.cache[category] = newProducts;
        this.setProducts(filteredProducts);
      }
    } else {
      this.currentCategory = category;
      this.cache[category] = response.data.data;
      this.setProducts(response.data.data);
    }
  }

  @action
  async registrationProduct(product: ProductRegistrationDto) {
    this.currentCategory = 486;
    try {
      const result = await this.productService.registration(product);
      alert(result.data.msg);
    } catch (e) {
      alert(e.response.data.msg);
    }
  }

  @action
  filterProduct(category: number, filter: I_Filter | undefined) {
    if (!filter) return this.cache[category] && this.setProducts(this.cache[category]);
    const filteredProducts = filterProductsHelper(category, this.cache[category], filter);
    // if (this.filter && filteredProducts.length < 12)
    //   this.getAllProductByCategory(category, this.cache[category][this.cache[category].length - 1].id);
    this.setProducts(filteredProducts);
  }

  @action
  sortProduct(category: number, filter: I_filter[] | undefined) {
    if (!filter) return this.setProducts(this.cache[category]);
    const sortedProducts = sortProductHelper(category, this.cache[category], filter);
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

  @action
  setFilter(filterOptions: I_Filter | undefined) {
    this.filter = filterOptions;
  }
}

export default ProductsStore;
