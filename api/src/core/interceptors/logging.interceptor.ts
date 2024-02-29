import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    Logger.log(
      'Method Execution - From Logger',
      `${context.getClass().name} - ${context.getHandler().name}`
    );

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `Method Completion - After... ${Date.now() - now}ms`,
            `${context.getClass().name} - ${context.getHandler().name}`
          )
        )
      );
  }
}
