import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthPageEnum } from '../../../enums';
import { loginService, Toast } from '../../../services/global';
import { login, userSet } from '../../../store/global/global.thunks';
import { useAppDispatch } from '../../../store/hooks';
import { CInput } from '../../shared/CInput';

interface Props {
  setPage: (page: AuthPageEnum.singIn | AuthPageEnum.singUp) => void;
}

export const SignIn: React.FC<Props> = ({ setPage }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    loginService(data)
      .then((res) => {
        Toast.success('Success');
        dispatch(userSet(res.user));
        dispatch(login(res)).then(() => navigate('/people'));
      })
      .catch((e) => Toast.error(e));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <CInput title="Email" name="email" type="email" error={errors['email']} control={control} />
      </div>

      <div>
        <CInput
          title="Password"
          name="password"
          error={errors['password']}
          type="password"
          control={control}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-1 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {AuthPageEnum.singIn}
        </button>
      </div>

      <div className="flex">
        <button
          type="button"
          onClick={() => setPage(AuthPageEnum.singUp)}
          className="mx-auto py-1 px-24 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {AuthPageEnum.singUp}
        </button>
      </div>
    </form>
  );
};
