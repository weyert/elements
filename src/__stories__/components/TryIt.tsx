import { IHttpOperation } from '@stoplight/types';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

const httpOperation: IHttpOperation = require('../../__fixtures__/http-operation.json');
import { TryIt } from '../../components/TryIt';

storiesOf('components/TryIt', module).add('kitchen sink', () => (
  <div className="p-12">
    <TryIt value={httpOperation} />
  </div>
));
