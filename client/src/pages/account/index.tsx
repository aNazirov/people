import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CInput } from '../../components/shared/CInput';
import { defaultPhoto } from '../../data';
import { Toast } from '../../services/global';
import { updateUser } from '../../services/user.service';
import { userSet } from '../../store/global/global.thunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { formatData, imageUpload } from '../../utils';

export const Account: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { user } = useAppSelector((state) => state.global);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(user?.photo?.path || defaultPhoto);

  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    updateUser(user!._id, formatData({ ...data, photo: avatar }))
      .then(({ user }) => {
        dispatch(userSet(user));
        Toast.success('Success');
      })
      .catch((e) => Toast.error(e));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
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

      <div className="flex space-x-4">
        <div className="w-52">
          <CInput
            title="Name"
            name="name"
            defaultValue={user?.name}
            error={errors['name']}
            control={control}
            autoComplete="off"
          />
        </div>

        <div className="w-52">
          <CInput
            title="Password"
            name="password"
            error={errors['password']}
            required={false}
            type="password"
            control={control}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex">
        <button
          type="submit"
          className="py-1 px-24 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};
