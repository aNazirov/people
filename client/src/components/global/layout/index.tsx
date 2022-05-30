import { useNavigate } from 'react-router-dom';
import { defaultPhoto } from '../../../data';
import { userLogout } from '../../../store/global/global.thunks';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getAge } from '../../../utils';
import { CLink } from '../../shared/CLink';

interface Props {
  link: {
    to: string;
    title: string;
  };
  children: JSX.Element | JSX.Element[];
}

export const Layout: React.FC<Props> = ({ link, children }) => {
  const { user } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-10">
      <div className="md:flex md:items-center md:justify-between md:space-x-5 px-10 py-5 shadow-md">
        <div className="flex items-start space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                className="h-16 w-16 rounded-full"
                src={user?.photo?.path || defaultPhoto}
                alt=""
              />
              <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
            </div>
          </div>

          <div className="pt-1.5">
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-sm font-medium text-gray-500">
              {getAge(user?.birthDate || '')} years old
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <CLink
            to={link.to}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          >
            {link.title}
          </CLink>

          <button
            type="button"
            onClick={() => {
              navigate('/');
              dispatch(userLogout());
            }}
            className="inline-flex items-center justify-center px-4 py-2 border border-red-400 shadow-sm text-sm font-medium rounded-sm text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 focus:ring-red-600"
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="px-10">{children}</div>
    </div>
  );
};
