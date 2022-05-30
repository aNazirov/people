import { IResponse } from '../interfaces';

export const regEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const regGender = /^(?:m|M|male|Male|f|F|female|Female)$/;
export const regMimeType = /image\/png|image\/jpeg|imagesvg\+xml|image\/gif|image\/svg\+xml/;

export const customErrorHandler = (
  res: IResponse,
  error: Error | { message: string },
  status: number = 500,
) => {
  res.status(status).json({
    status: 'error',
    message: error.message ? error.message : error,
  });
};
