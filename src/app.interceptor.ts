import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";


@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
    .handle()
    .pipe(
      tap((data)=>{
        if(Array.isArray(data)){
          if(data.length == 0){
            throw new HttpException('no content',HttpStatus.NO_CONTENT)
          }
        }
        if(data==undefined){
          throw new HttpException('no content',HttpStatus.NO_CONTENT)
        }
      })
    );
  }
}
