import React from 'react';
import { ThemeProvider } from '../ui/theme-provider';
import { ModeToggle } from '../ui/mode-toggle';

interface IMainLayout {
  children: React.ReactElement;
}

const MainLayout = ({ children }: IMainLayout) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="relative flex min-h-screen flex-col">
        <div className="fixed bottom-5 right-5 z-[50] rounded-lg bg-background">
          <ModeToggle />
        </div>
        <div>{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
