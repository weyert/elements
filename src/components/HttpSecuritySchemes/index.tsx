import {
  HttpSecurityScheme,
  IOauth2AuthorizationCodeFlow,
  IOauth2ClientCredentialsFlow,
  IOauth2ImplicitFlow,
  IOauth2PasswordFlow,
} from '@stoplight/types';
import { Tag } from '@stoplight/ui-kit';
import cn from 'classnames';
import { entries, flatten, isEmpty, map, startCase } from 'lodash';
import * as React from 'react';
import { HttpSecuritySchemeColors } from '../../utils/http';
import { MarkdownViewer } from '../MarkdownViewer';

export interface ISecuritiesProps {
  securities?: HttpSecurityScheme[];
  className?: string;
  title?: string;
}

export const HttpSecuritySchemes = ({ securities, title, className }: ISecuritiesProps) => {
  if (!securities || !securities.length) return null;

  return (
    <div className={cn('HttpSecuritySchemes', className)}>
      {title && <div className="text-lg font-semibold">{title}</div>}

      <div className="mt-6 border rounded TreeList dark:border-darken">
        {flatten(securities).map((security, index) => {
          const securityClassName = cn('TreeListItem', {
            'TreeListItem--striped': index % 2 !== 0,
          });

          return <SecurityScheme key={index} className={securityClassName} security={security} />;
        })}
      </div>
    </div>
  );
};
HttpSecuritySchemes.displayName = 'HttpSecuritySchemes';

const SecurityScheme = ({ security, className }: { security: HttpSecurityScheme; className?: string }) => {
  return (
    <div
      className={cn(className, 'HttpSecuritySchemes__SecurityScheme p-4 flex items-start')}
      style={{ alignItems: 'start' }}
    >
      <div style={{ minWidth: '60px' }}>
        <div>{security.key}</div>
        <div
          className={`text-sm text-${HttpSecuritySchemeColors[security.type]}-7 dark:text-${
            HttpSecuritySchemeColors[security.type]
          }-6`}
        >
          {security.type}
        </div>
      </div>

      <div className="flex-1 ml-4">
        {security.description && (
          <MarkdownViewer className="flex-1 text-darken-7 dark:text-lighten-7" markdown={security.description} />
        )}

        <div className="flex flex-wrap">
          {'scheme' in security && security.scheme && (
            <Tag className="mt-2 mr-2" minimal>
              Scheme: {security.scheme}
            </Tag>
          )}

          {'bearerFormat' in security && security.bearerFormat && (
            <Tag className="mt-2 mr-2" minimal>
              Bearer Format: {security.bearerFormat}
            </Tag>
          )}

          {'in' in security && security.in && (
            <Tag className="mt-2 mr-2" minimal>
              {startCase(security.in)} parameter name: {security.name}
            </Tag>
          )}

          {'openIdConnectUrl' in security && security.openIdConnectUrl && (
            <Tag className="mt-2 mr-2" minimal>
              OpenId Connect URL: {security.openIdConnectUrl}
            </Tag>
          )}
        </div>

        {security.type === 'oauth2' &&
          map(security.flows, (flowObject, flow) => <OAuth2Flow key={flow} flow={flow} flowObject={flowObject} />)}
      </div>
    </div>
  );
};
SecurityScheme.displayName = 'HttpSecuritySchemes.SecurityScheme';

const OAuth2Flow = ({
  flow,
  flowObject,
}: {
  flow: string;
  flowObject?: IOauth2ImplicitFlow | IOauth2PasswordFlow | IOauth2ClientCredentialsFlow | IOauth2AuthorizationCodeFlow;
  className?: string;
}) => {
  if (!flowObject) return null;

  return (
    <div className="py-2 mt-2 border-t HttpSecuritySchemes__OAuth2Flow">
      <div className="py-2 font-semibold">{startCase(flow)} OAuth Flow</div>

      {'authorizationUrl' in flowObject && flowObject.authorizationUrl && (
        <div className="flex items-center py-1">
          <div className="mr-1">Authorize URL -</div>
          <div>
            <a href={flowObject.authorizationUrl} target="_blank" rel="noopener noreferrer">
              {flowObject.authorizationUrl}
            </a>
          </div>
        </div>
      )}

      {'tokenUrl' in flowObject && flowObject.tokenUrl && (
        <div className="flex items-center py-1">
          <div className="mr-1">Token URL -</div>
          <div>
            <a href={flowObject.tokenUrl} target="_blank" rel="noopener noreferrer">
              {flowObject.tokenUrl}
            </a>
          </div>
        </div>
      )}

      {'refreshUrl' in flowObject && flowObject.refreshUrl && (
        <div className="flex items-center py-1">
          <div className="mr-1">Refresh URL -</div>
          <div>
            <a href={flowObject.refreshUrl} target="_blank" rel="noopener noreferrer">
              {flowObject.refreshUrl}
            </a>
          </div>
        </div>
      )}

      {!isEmpty(flowObject.scopes) && (
        <>
          <div className="py-1">Scopes</div>
          <ul className="list-disc" style={{ margin: 0 }}>
            {entries(flowObject.scopes).map(([scope, description]) => {
              return (
                <li className="py-1" key={scope}>
                  <Tag minimal>{scope}</Tag> - <span className="text-darken-7 dark:text-lighten-7">{description}</span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
OAuth2Flow.displayName = 'HttpSecuritySchemes.OAuth2Flow';