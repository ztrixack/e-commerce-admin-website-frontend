import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import ForbiddenPage from '../index';

describe('<ForbiddenPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <ForbiddenPage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
