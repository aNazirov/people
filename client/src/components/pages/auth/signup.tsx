import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultPhoto } from '../../../data';
import { AuthPageEnum, GenderEnum } from '../../../enums';
import { regisService, Toast } from '../../../services/global';
import { classNames, formatData, imageUpload } from '../../../utils';
import { CInput } from '../../shared/CInput';

interface Props {
  setPage: (page: AuthPageEnum.singIn | AuthPageEnum.singUp) => void;
}

export const SignUp: React.FC<Props> = ({ setPage }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(defaultPhoto);

  const onSubmit = (data: any) => {
    regisService(formatData({ ...data, photo: avatar }))
      .then((res) => {
        Toast.success(res.message);
        setPage(AuthPageEnum.singIn);
      })
      .catch((e) => Toast.error(e));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <div className="flex items-center">
          <span className="h-16 w-16 rounded-sm shadow-md overflow-hidden bg-gray-100">
            <img src={preview} alt="" className="h-full" />
          </span>
          <div>
            <label
              htmlFor="upload-image"
              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload
            </label>

            {avatar && (
              <button
                type="button"
                className="ml-5 bg-red-600 py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  setPreview(defaultPhoto);
                  setAvatar(null);
                }}
              >
                Reset
              </button>
            )}

            <input
              id="upload-image"
              type="file"
              accept="image/*"
              className="w-0"
              onChange={imageUpload(setPreview, setAvatar)}
            />
          </div>
        </div>
      </div>
      <div>
        <CInput title="Name" name="name" error={errors['name']} control={control} />
      </div>

      <div>
        <CInput title="Email" name="email" type="email" error={errors['email']} control={control} />
      </div>

      <div>
        <CInput
          title="Date of birth"
          name="birthDate"
          type="date"
          error={errors['birthDate']}
          control={control}
        />
      </div>

      <div>
        <select
          defaultValue={GenderEnum.male}
          {...register('gender')}
          className={classNames(
            errors['gender']?.message ? 'border-red-300' : 'border-gray-300',
            ' mt-1 w-full rounded-sm border bg-white py-1 px-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm',
          )}
        >
          <option value={GenderEnum.male}>{GenderEnum.male}</option>
          <option value={GenderEnum.female}>{GenderEnum.female}</option>
        </select>
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
          {AuthPageEnum.singUp}
        </button>
      </div>

      <div className="flex">
        <button
          type="button"
          onClick={() => setPage(AuthPageEnum.singIn)}
          className="mx-auto py-1 px-24 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {AuthPageEnum.singIn}
        </button>
      </div>
    </form>
  );
};
