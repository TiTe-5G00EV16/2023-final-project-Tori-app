import { render, screen } from '@testing-library/react';
import ListingsList from './ListingsList';
import { QueryClient, QueryClientProvider } from 'react-query';

const TEST_LISTINGS = [
    {
      "id": 1,
      "name": "Hat",
      "price": 10.00,
      "description": "Old cowboyhat"
    },
    {
        "id": 2,
        "name": "InttiRolexi",
        "price": 10.00,
        "description": "Intin nähnyt kello"
    }
];


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

describe('The ListingsList', () => {
    test('should show no citues when no listing is available', () => {
        render(<ListingsList items={[]} />)
        expect(screen.getByText('No listings found.')).toBeInTheDocument();
    });

    test('should show a list of listings', () => {
        render(<ListingsList items={TEST_LISTINGS} />,{ wrapper });
        expect(screen.queryByText('No listings found.')).toBeNull();
        expect(screen.getByText('Hat')).toBeInTheDocument();
        expect(screen.getByText('InttiRolexi')).toBeInTheDocument();
      });
});