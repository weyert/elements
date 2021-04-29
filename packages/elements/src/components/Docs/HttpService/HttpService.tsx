import { Box, Flex, Heading, VStack } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { StoplightProjectContext } from '../../../containers/Provider';
import { MarkdownViewer } from '../../MarkdownViewer';
import { IDocsComponentProps } from '..';
import { Badge } from '../HttpOperation/Badges';
import { SecuritySchemes } from './SecuritySchemes';
import { ServerInfo } from './ServerInfo';

const enhanceVersionString = (version: string): string => {
  if (version[0] === 'v') return version;

  return `v${version}`;
};

export type HttpServiceProps = IDocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(({ className, data, headless }) => {
  const context = React.useContext(StoplightProjectContext);
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const description = data.description && <MarkdownViewer className="sl-mb-10" markdown={data.description} />;

  const dataPanel = (
    <VStack spacing={6}>
      {(data.servers ?? context.mockUrl?.servicePath) && (
        <ServerInfo servers={data.servers} mockUrl={context.mockUrl?.servicePath} />
      )}
      <Box>
        {data.securitySchemes?.length && (
          <SecuritySchemes schemes={data.securitySchemes} defaultScheme={query.get('security') || undefined} />
        )}
      </Box>
    </VStack>
  );

  return (
    <Box className={className} w="full">
      {data.name && (
        <Heading size={1} fontWeight="semibold">
          {data.name}
        </Heading>
      )}

      {data.version && (
        <Box mt={3}>
          <Badge className="sl-bg-gray-6">{enhanceVersionString(data.version)}</Badge>
        </Box>
      )}

      {!headless ? (
        <Flex mt={12}>
          <Box flex={1}>{description}</Box>
          <Box ml={16} pos="relative" w="2/5" style={{ maxWidth: 500 }}>
            {dataPanel}
          </Box>
        </Flex>
      ) : (
        <Box mb={10}>
          {description}
          {dataPanel}
        </Box>
      )}
    </Box>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });