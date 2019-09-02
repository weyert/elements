import { Icon } from '@stoplight/ui-kit';
import cn from 'classnames';
import React from 'react';

export interface IPageTocHeading {
  title: string;
  id?: string;
  depth: number;
}

export interface IPageToc {
  headings: IPageTocHeading[];
  title?: string;
  className?: string;
  style?: any;
}

export const PageToc = ({ headings, className, style, title = 'This Page' }: IPageToc) => {
  return (
    <div className={cn('sticky top-0', className)} style={style}>
      <div className="border-l border-gray-2 dark:border-lighten-4">
        {title && (
          <div
            className="pt-1 pb-3 text-gray-5 dark:text-gray-6 font-medium text-sm flex items-center"
            style={{ paddingLeft: 18 }}
          >
            <Icon icon="properties" iconSize={10} className="mr-2" />
            {title}
          </div>
        )}

        {headings.map((heading, i) => (
          <TocItem key={i} depth={heading.depth} title={heading.title} id={heading.id} />
        ))}
      </div>
    </div>
  );
};

const TocItem: React.FC<{ depth: number; title: string; id?: string }> = ({ depth, title, id }) => {
  return (
    <a
      href={`#${id}`}
      className="truncate block py-2 pr-8 font-medium font-medium text-gray-6 dark:text-gray-5 hover:text-blue-6 hover:no-underline text-sm"
      style={{ paddingLeft: `${3 + depth * 15}px` }}
    >
      {title}
    </a>
  );
};