import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('should be docs in the texts', () => {
    // ARRANGE
    render(<Home />);
    //ACT
    const myElm = screen.getByText('Docs');
    //ASSERT
    expect(myElm).toBeInTheDocument();
  });
  it('should contain word "information"', () => {
    render(<Home />);
    const myElm = screen.getByText(/information/i);
    expect(myElm).toBeInTheDocument();
  });
  it('should have a heading with the content of "Learn"', () => {
    //Arrange
    render(<Home />);
    //Act
    const myElm = screen.getByRole('heading', {
      name: 'Learn',
    });
    //Assert
    expect(myElm).toBeInTheDocument();
  });
});
