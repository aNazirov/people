import { defaultPhoto } from '../../../data';
import { IUser } from '../../../interfaces';
import { getAge } from '../../../utils';

interface Props {
  person: IUser;
}

export const Person: React.FC<Props> = ({ person }) => {
  return (
    <div className="flex shadow-md rounded-sm p-4 space-x-2">
      <div className="flex-shrink-0">
        <img
          src={person.photo?.path || defaultPhoto}
          alt=""
          className="h-16 w-16 border border-gray-300 bg-white text-gray-300 rounded-sm"
        />
      </div>
      <div>
        <h4 className="text-lg font-bold">{person.name}</h4>
        <p className="mt-1">{getAge(person.birthDate)} years old</p>
      </div>
    </div>
  );
};
