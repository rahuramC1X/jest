import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../src/products/products.service';
import { Product } from '../../src/products/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { productsMockData } from '../mock-data/products.mock-data';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      // Mock repository behavior
      
      jest.spyOn(productRepository, 'find').mockResolvedValue(productsMockData);

      const result = await productsService.getAllProducts();

      expect(result).toEqual(productsMockData);
    });
  });

  // ... other service test cases
});
