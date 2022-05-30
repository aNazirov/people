import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '../api';
import { ILogin } from '../interfaces';

class ToastClass {
  options = undefined;

  info(info: string) {
    toast.info(info, this.options);
  }
  success(message: string) {
    toast.success(message, this.options);
  }
  error(error: AxiosError) {
    console.log(error.response);
    const data: any = error.response?.data;
    let message = data.message || error.message || 'Server Side Error';
    if (Array.isArray(message)) {
      message = message.join('\n');
    }

    toast.error(message, this.options);
  }
  warning(warning: string) {
    toast.warn(warning, this.options);
  }
}

export const Toast = new ToastClass();

export const loginService = (params: ILogin) => {
  return api.post('/auth/login', params).then((res) => res.data);
};

export const regisService = (params: FormData) => {
  return api.post('/auth/auth', params).then((res) => res.data);
};

export const getOneService = (id: number, name: string) => {
  return api.get(`/${name}/${id}`).then((res) => res.data);
};
