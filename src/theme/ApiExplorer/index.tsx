import React, {type ReactNode} from 'react';
import ApiExplorer from '@theme-original/ApiExplorer';
import type ApiExplorerType from '@theme/ApiExplorer';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof ApiExplorerType>;

function sortKeysCanonical(value: any): any {
  if (Array.isArray(value)) {
    return value.map(sortKeysCanonical);
  }

  if (value !== null && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce<Record<string, any>>((acc, key) => {
        acc[key] = sortKeysCanonical(value[key]);
        return acc;
      }, {});
  }

  return value;
}

export default function ApiExplorerWrapper(props: Props): ReactNode {
  const sortedJson = sortKeysCanonical(props.item.jsonRequestBodyExample);
  const updatedProps = { ...props, item: { ...props.item, jsonRequestBodyExample: sortedJson } };

  return (
    <>
      <ApiExplorer {...updatedProps} />
    </>
  );
}
