import React from 'react'

type Props = {
    className?: string;
    children?: React.ReactNode
}

export const RoundedCell = ({ className, children }: Props) => {
  return (
    <div className={`${className} rounded-xl border px-4 py-4 bg-card`}>
      {children}
    </div>
  );
};
