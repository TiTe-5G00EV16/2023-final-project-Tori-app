import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListingItem from "./ListingItem";

const TEST_LISTINGS = {
    "id": 1,
    "name": "Hat",
    "price": 10,
    "description": "Old cowboyhat"
};


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  );

describe('The ListingItem', () => {
  test('Should show a listing when given', ()=>{
      render(<ListingItem
        key={TEST_LISTINGS.id}
        id={TEST_LISTINGS.id}
        name={TEST_LISTINGS.name}
        price={TEST_LISTINGS.price}
        description={TEST_LISTINGS.description}
      />, { wrapper });
    expect(screen.getByText('Hat -')).toBeInTheDocument();
    expect(screen.getByText('10€')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveClass('listing-item');
  });
});