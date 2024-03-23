import { ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Button } from '../ui/button';
import { useLoading } from '@/store/useLoading';

interface IButtonWithLoading
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonContent?: React.ReactNode;
  disabledContent?: React.ReactNode;
  loadingContent?: React.ReactNode;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

const ButtonWithLoading = ({
  buttonContent,
  disabledContent,
  loadingContent,
  children,
  type = 'submit',
  variant = 'default',
  disabled,
  ...rest
}: IButtonWithLoading) => {
  const { buttonLoading } = useLoading();
  return (
    <>
      <Button
        variant={variant}
        disabled={buttonLoading || disabled}
        type={type}
        {...rest}
      >
        {buttonLoading ? (
          <>
            <ReloadIcon
              className={`h-4 w-4 animate-spin ${loadingContent && 'mr-2'}`}
            />
            {loadingContent && loadingContent}
          </>
        ) : (
          <>
            {disabled
              ? disabledContent
                ? disabledContent
                : buttonContent
              : buttonContent && buttonContent}
          </>
        )}
        {children}
      </Button>
    </>
  );
};

export default ButtonWithLoading;
