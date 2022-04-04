import App from './main-page';
import TestRenderer, { act } from 'react-test-renderer';
import { waitFor } from '@testing-library/react';

describe('App', () => {
  var responseData = [
    {
      country: null,
      createdOn: '2015-03-26T00:00:00',
      dateAvailableToPublic: '2015-01-01T00:00:00',
      id: 987,
      name: 'HONDA MOTOR CO., LTD',
      updatedOn: '2015-06-04T00:00:00',
      vehicleType: 'Passenger Car',
      wmi: 'JHM'
    },
    {
      country: 'UNITED STATES (USA)',
      createdOn: '2015-03-26T00:00:00',
      dateAvailableToPublic: '2015-01-01T00:00:00',
      id: 988,
      name: 'HONDA OF AMERICA MFG., INC.',
      updatedOn: null,
      vehicleType: 'Passenger Car',
      wmi: '1HG'
    }
  ];

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseData)
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should show loading screen when loading data', () => {
    const testRenderer = TestRenderer.create(<App />);
    expect(testRenderer.root.findByProps({ testid: 'loading-text' }).props.children).toEqual(
      'Loading data'
    );
    expect(testRenderer.root.findByProps({ testid: 'loading-spinner' }).toBeTruthy);
  });
});
