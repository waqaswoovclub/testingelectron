import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '../renderer/Home';

describe('App', () => {
  it('should render', () => {
    expect(render(<div />)).toBeTruthy();
  });
});
