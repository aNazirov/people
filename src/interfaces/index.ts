import { Request, Response } from 'express';

export interface UserRequest {
  uId: number;
  email: string;
}

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  path: string;
  filename: string;
}

export interface IRequest extends Request {
  user?: UserRequest;
  file?: any | MulterFile;
}

export interface IResponse extends Response {}
