import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

it('should be docs in the texts', () => {
  // ARRANGE
  render(<Home />);
  //ACT
  const myElm = screen.getByText('Docs');
  //ASSERT
  expect(myElm).toBeInTheDocument();
});
