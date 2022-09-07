import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from './model/package.model';
import * as mongooseDeletor from 'mongoose-delete'
import { MerchantModule } from 'src/merchant/merchant.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
    name: Package.name,
    useFactory: () => {
      const schema = PackageSchema;
      schema.plugin(mongooseDeletor, { overrideMethods: 'all' })
    }
      },
    ],
  ),
  MerchantModule
  ],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService]
})
export class PackageModule { }
