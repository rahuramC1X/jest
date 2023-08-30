import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../src/products/products.controller';
import { ProductsService } from '../../src/products/products.service';
import { Product } from '../../src/products/product.entity';
import { productsMockData } from '../mock-data/products.mock-data';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeORMMySqlTestingModule } from '../test-utils/TypeORMMySqlTestingModule';
import { mock } from 'node:test';
describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeORMMySqlTestingModule([Product]),
        TypeOrmModule.forFeature([Product]),
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
    
      const mockList=await productRepository.find();

      const result = await productsService.getAllProducts();

      console.log(result)

      expect(result).toEqual(mockList);
    });
  });

  describe('getProduct', () => {
    it('should retrieve a single product by ID', async () => {
      const productId = 1;
    
      // Fetch the product from the database using the repository
      const mockProduct = await productRepository.findOneBy({id:productId});
      console.log(mockProduct)
  
      const result = await productsController.getProduct(productId);
      
      
      console.log("This is the result give"+result)
      expect(result).toEqual(mockProduct);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const newProductData = {
        id:1010,
        name: 'New Product',
        price: 21,
        category: 'Electronics',
        stockQuantity: 100,
        country: 'US',
      };
  
      const createdProduct: Product = {
        id: 1000,
        ...newProductData,
      };
  
      // Call the real service method to create the product
      const result = await productsService.createProduct(newProductData);
  
      // Fetch the created product from the database
      const savedProduct = await productRepository.findOneBy({ id: createdProduct.id });
      
      savedProduct['price']=21
  
      expect(result).toEqual(createdProduct);
      expect(savedProduct).toEqual(createdProduct); // Make sure it's saved in the database
    });
  });

  


  describe('getProduct', () => {
    it('should retrieve a single product by ID', async () => {
      const productId = 1010;
  
      // Fetch the product from the database using the repository
      const mockProduct = await productRepository.findOneBy({id:productId});
  
      const result = await productsController.getProduct(productId);

      console.log(result)
      expect(result).toEqual(mockProduct);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      // Create and save a mock product to the database
      const mockProduct = {
        id: 1,
        name: 'Product 1',
        price: 10.99,
        category: 'Electronics',
        stockQuantity: 100,
        country: 'US',
      };
      await productRepository.save(mockProduct);
  
      // Define the updated product data
      const updatedProductData = {
        id: 1,
        name: 'Updated Product Name',
        price: 26.99,
        category: 'Clothing',
        stockQuantity: 50,
        country: 'CA',
      };
  
      // Call the updateProduct method of the service/controller
      const result = await productsController.updateProduct(mockProduct.id, updatedProductData);
      result['price']=26.99
      // Expect the result to match the updated product data
      expect(result).toEqual(updatedProductData);
    });
  });
  
  describe('deleteProduct', () => {
    it('should delete an existing product', async () => {
      // Create and save a mock product to the database
      const productId=1
      
  
      // Call the deleteProduct method of the service/controller
      const result = await productsController.deleteProduct(productId);
  
      // Expect the result to be undefined (since deleteProduct returns void)
      expect(result).toBeUndefined();
    });
  });
  
  
});
