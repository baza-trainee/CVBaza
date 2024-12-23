import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="xl:px-20 2xl:max-w-full xl:max-w-7xl lg:max-w-4xl lg:px-10 mx-auto ">{children}</div>;
};
