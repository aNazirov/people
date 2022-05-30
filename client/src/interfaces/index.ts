import React, { ReactElement } from 'react';

export interface ILinkObj {
  name: string;
  href: string;
  icon: ReactElement;
  current: boolean;
}

export interface IUser {
  _id: number;
  name: string;
  email?: string;
  birthDate: string;
  gender?: 'Female' | 'Male';
  photo?: IFile;
}

export interface IFile {
  _id: number;
  path: string;
}

export interface IType {
  _id: number;
  title: string;
}

export interface IUserCreateInput {
  name: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ReactFC<T> extends React.FC {
  props: {
    children: JSX.Element | JSX.Element[] | string | string[];
  };
}
