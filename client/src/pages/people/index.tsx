import { useEffect } from 'react';
import { Person } from '../../components/pages/people/person';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAll } from '../../store/user/user.thunks';

export const People: React.FC = () => {
  const { users } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAll(0));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {users.map((person) => {
        return <Person key={person._id} person={person} />;
      })}
    </div>
  );
};
