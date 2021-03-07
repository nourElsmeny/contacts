import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const __entityPath = __dirname+'/../schemas/';
//mongodb+srv://root:<password>@cluster0.f9s0c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url:'mongodb+srv://root:root@cluster0.f9s0c.mongodb.net/contacts?retryWrites=true&w=majority',
  // host: 'localhost',
  // port: 27017,
  // username: '',
  // password: '',
  // database: 'contacts',
  entities: [
    __entityPath + 'user/user.entity.js',
    __entityPath + 'devices/devices.entity.js',
    __entityPath + 'contacts/contacts.entity.js'
  ],
  synchronize: true,
  useUnifiedTopology: true 
};
