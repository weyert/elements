export type TableOfContentsProps = {
  tree: TableOfContentsItem[];
  activeId: string;
  Link: CustomLinkComponent;
  maxDepthOpenByDefault?: number;
  externalScrollbar?: boolean;
  isInResponsiveMode?: boolean;
  onLinkClick?(): void;
};

export type CustomLinkComponent = React.ComponentType<{
  to: string;
  className?: string;
  children: React.ReactNode;
}>;

export type TableOfContentsItem = TableOfContentsDivider | TableOfContentsGroupItem;

export type TableOfContentsDivider = {
  title: string;
};

export type TableOfContentsGroupItem =
  | TableOfContentsGroup
  | TableOfContentsNodeGroup
  | TableOfContentsNode
  | TableOfContentsExternalLink;

export type TableOfContentsGroup = {
  title: string;
  items: TableOfContentsGroupItem[];
  itemsType?: 'article' | 'http_operation' | 'http_webhook' | 'model';
  itemsIcon?: string | React.ReactNode;
};

export type TableOfContentsExternalLink = {
  title: string;
  url: string;
};

export type TableOfContentsNode<
  T = 'http_service' | 'http_operation' | 'http_webhook' | 'model' | 'article' | 'overview',
> = {
  id: string;
  slug: string;
  title: string;
  type: T;
  itemsIcon?: string | React.ReactNode;
  meta: string;
  version?: string;
};

export type TableOfContentsNodeGroup = TableOfContentsNode<'http_service'> & TableOfContentsGroup;
