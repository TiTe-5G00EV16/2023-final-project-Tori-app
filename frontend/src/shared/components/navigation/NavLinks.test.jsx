import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import NavLinks from './NavLinks';

describe('The Navigation Links', () => {
  test('Should only show All listings and Login when not authorized', () =>{
    render(
      <AuthContext.Provider value={{
        isLoggedIn: true,
        token: '1234567890-0987654321',
        userId: 'userId1',
        login: () => {},
        logout: () => {}
      }}
      >
      <BrowserRouter>
        <NavLinks/>
      </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole('list')).toHaveClass('nav-links');
    expect(screen.getByText('All listings')).toBeInTheDocument();
    expect(screen.getByText('All listings')).toHaveAttribute('href', '/');

    expect(screen.queryByText('Login')).toBeNull();

    expect(screen.getByText('Create listing')).toBeInTheDocument();
    expect(screen.getByText('Create listing')).toHaveAttribute('href', '/listings/new');

    expect(screen.getByRole('button', { name: 'Logout'})).toBeInTheDocument();
  });
});