export const SceletonForPage: React.FC = () => {
  return (
    <div className="h-full">
      <div className="animate-pulse bg-gray-300 grow rounded-sm" />
    </div>
  );
};

export const SceletonForInput: React.FC = () => {
  return (
    <div className="mt-2 flex animate-pulse flex-row items-center h-full justify-center space-x-5">
      <div className="w-full bg-gray-300 h-6 rounded-md " />
    </div>
  );
};
