import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      console.log({ ValidateInputPipeError: e });
      if (e instanceof BadRequestException) {
        throw new UnprocessableEntityException(
          this.handleError(e?.['response']?.message || e.message)
        );
      }
    }
  }

  private handleError(errors) {
    console.log({ HandleErrorMessage: errors });
    if (Array.isArray(errors)) {
      return errors.map((error) => error.constraints);
    }
    return errors;
  }
}
