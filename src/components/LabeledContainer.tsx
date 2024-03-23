import { cn } from '@/lib/utils';
import React from 'react';

interface ILabeledContainer {
  label?: React.ReactNode | string;
  children?: React.ReactNode;
  className?: string;
}

const LabeledContainer = ({
  label,
  children,
  className,
}: ILabeledContainer) => {
  return (
    <div
      className={cn(
        'relative rounded-lg border-[1px] border-primary p-3',
        className
      )}
    >
      <p className="absolute -top-3 bg-background px-1 text-sm font-bold">
        {label}
      </p>
      {children}
    </div>
  );
};

export default LabeledContainer;
