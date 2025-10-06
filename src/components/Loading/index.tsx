import { Spinner } from "@heroui/react";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
