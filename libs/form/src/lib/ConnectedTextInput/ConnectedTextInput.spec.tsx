import { render } from '@testing-library/react';

import ConnectedTextInput from './ConnectedTextInput';

describe('ConnectedTextInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConnectedTextInput />);
    expect(baseElement).toBeTruthy();
  });
});
