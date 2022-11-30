import { cleanup, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import {MemoryRouter as Router} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Dashboard from './index'
import { createSheetResponse } from 'fixtures';
import { act } from 'react-dom/test-utils';


const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => mockHistoryPush,
}));

const renderComponent = async () => {
  history = createMemoryHistory();

  await act(() => render(<Router history={history}><Dashboard /></Router>))
}

beforeEach(() => {
  renderComponent()
})

afterEach(cleanup)

test('renders dashboard page', () => {
  const dashboardText = screen.getByText(/Loading/i)
  expect(dashboardText).toBeInTheDocument()
})

test("Hide loading on saving sheet id", async () => {
  const { getByText } = render(<Dashboard />);

  const loadingEl = getByText(/Loading/i);

  await waitForElementToBeRemoved(() => getByText(/Loading/i));

  expect(loadingEl).not.toBeInTheDocument();
});

