import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../src/products/product.entity';

export const TypeORMMySqlTestingModule = (entities: any[]) =>
TypeOrmModule.forRoot({
    type: 'mysql', // Change this to your SQL database type
    host: 'localhost', // Your database host
    port: 3306, // Your database port
    username: 'root', // Your database username
    password: 'Ashoka@2500', // Your database password
    database: 'test_commerce', // Your database name
    entities: [...entities], // Add your entity classes here
    synchronize: true
  })