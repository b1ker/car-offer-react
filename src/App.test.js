import App from './main-page';
import renderer, { act } from 'react-test-renderer';
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
    },
    {
      country: 'UNITED STATES (USA)',
      createdOn: '2015-03-26T00:00:00',
      dateAvailableToPublic: '2015-01-01T00:00:00',
      id: 988,
      name: 'HONDA OF AMERICA MFG., INC.',
      updatedOn: null,
      vehicleType: 'Passenger Car',
      wmi: '1HV'
    },
    {
      country: 'UNITED STATES (USA)',
      createdOn: '2015-03-26T00:00:00',
      dateAvailableToPublic: '2015-01-01T00:00:00',
      id: 988,
      name: 'HONDA OF AMERICA., INC.',
      updatedOn: null,
      vehicleType: 'Passenger Car',
      wmi: '1HZ'
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
    const testRenderer = renderer.create(<App />);
    expect(testRenderer.root.findByProps({ testid: 'loading-text' }).props.children).toEqual(
      'Loading data'
    );
    expect(testRenderer.root.findByProps({ testid: 'loading-spinner' }).toBeTruthy);
  });

  it('should show total summary when data is loaded', async () => {
    let testRenderer;

    await act(async () => {
      testRenderer = renderer.create(<App />);
    });

    await waitFor(async () => {
      expect(testRenderer.root.findByProps({ testid: 'total-label' }).props.children[0]).toEqual(
        'WMI Data - Honda | Total: '
      );
      expect(testRenderer.root.findByProps({ testid: 'total-label' }).props.children[1]).toEqual(
        responseData.length
      );
      expect(testRenderer.root.findAllByProps({ testid: 'found-label' })).toBeNull;
    });
  });

  it('search box should work and count number should appear', async () => {
    let testRenderer;

    await act(async () => {
      testRenderer = renderer.create(<App />);
    });

    await waitFor(() => {
      testRenderer.root
        .findByProps({ testid: 'text-search' })
        .props.onChange({ target: { value: 'mfg' } });

      testRenderer.update(<App />);

      expect(testRenderer.root.findByProps({ testid: 'found-label' }).props.children[1]).toEqual(2);

      expect(testRenderer.root.findAll((el) => el.type === 'tr').length).toEqual(
        2 + 1 // 1 Header row
      );
    });
  });

  it('country select should work', async () => {
    let testRenderer;

    await act(async () => {
      testRenderer = renderer.create(<App />);
    });

    await waitFor(() => {
      testRenderer.root
        .findByProps({ testid: 'country-search' })
        .props.onChange({ target: { value: 'united states (usa)' } });

      testRenderer.update(<App />);

      expect(testRenderer.root.findAll((el) => el.type === 'tr').length).toEqual(
        3 + 1 // 1 Header row
      );
    });
  });

  it('both search and country select should work', async () => {
    let testRenderer;

    await act(async () => {
      testRenderer = renderer.create(<App />);
    });

    await waitFor(() => {
      testRenderer.root
        .findByProps({ testid: 'country-search' })
        .props.onChange({ target: { value: 'united states (usa)' } });

      testRenderer.root
        .findByProps({ testid: 'text-search' })
        .props.onChange({ target: { value: 'mfg' } });

      testRenderer.update(<App />);

      expect(testRenderer.root.findAll((el) => el.type === 'tr').length).toEqual(
        2 + 1 // 2 has mfg in name + 1 Header row
      );
    });
  });
});
