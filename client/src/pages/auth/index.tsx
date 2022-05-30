import { useState } from 'react';
import { SignIn } from '../../components/pages/auth/signin';
import { SignUp } from '../../components/pages/auth/signup';
import { AuthPageEnum } from '../../enums';

export const Auth = () => {
  const [page, setPage] = useState<AuthPageEnum.singIn | AuthPageEnum.singUp>(AuthPageEnum.singIn);

  return (
    <>
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                {page === AuthPageEnum.singIn ? `${page} to your account` : AuthPageEnum.singUp}
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                {page === AuthPageEnum.singIn ? (
                  <SignIn setPage={setPage} />
                ) : (
                  <SignUp setPage={setPage} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
};
