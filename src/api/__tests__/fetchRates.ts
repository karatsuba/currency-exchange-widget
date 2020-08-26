import { fetchRates } from '../fetchRates';

beforeEach(() => {
    fetchMock.resetMocks();
});

it('should fetch rates', async () => {
    fetchMock.mockResponseOnce(
        JSON.stringify({
            base: 'USD',
            rates: {
                EUR: 0.846112,
                GBP: 0.761287,
                USD: 1
            }
        })
    );

    const response = await fetchRates();

    expect(response).toEqual({ base: 'USD', rates: { EUR: 0.846112, GBP: 0.761287, USD: 1 } });
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toMatch('https://openexchangerates.org/api/latest.json');
});
