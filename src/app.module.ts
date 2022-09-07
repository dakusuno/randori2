import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageModule } from './package/package.module';
import { CostumerModule } from './customer/costumer.module';
import { MerchantModule } from './merchant/merchant.module';
import { OrderModule } from './order/order.module';
import { ReportModule } from './report/report.module';
import { ReportMiddleware } from './report.middleware';
import { ReportController } from './report/report.controller';
import { OrderMiddleware } from './order.middleware';
import { AppInterceptor } from './app.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot(config.MongoURI),
    AuthModule,
    UsersModule,
    PackageModule,
    CostumerModule,
    MerchantModule,
    OrderModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: AppInterceptor
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReportMiddleware)
      .exclude(
        {
          path: "report/cashflowtoday",
          method: RequestMethod.GET
        },
      )
      .forRoutes(
        {
          path: "report/:id",
          method: RequestMethod.ALL
        }
      )

    consumer.apply(OrderMiddleware)
      .exclude(
        { path: "latest/", method: RequestMethod.GET },
        { path: "order/report/", method: RequestMethod.GET }

      )
      .forRoutes({ path: "order/:merchant", method: RequestMethod.ALL })
  }
}
