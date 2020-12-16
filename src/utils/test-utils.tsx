import React, { FC, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { SWRConfig } from 'swr';

const Wrapper: FC = ({ children }) => {
  return <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>;
};

const customRender = (ui: ReactElement, options: any) =>
  render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
