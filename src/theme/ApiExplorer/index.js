import React from 'react';
import ApiExplorer from '@theme-original/ApiExplorer';

function sortKeysCanonical(value) {
  if (Array.isArray(value)) {
    return value.map(sortKeysCanonical);
  }

  if (value !== null && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortKeysCanonical(value[key]);
        return acc;
      }, {});
  }

  return value;
}

export default function ApiExplorerWrapper(props) {
  console.log('Rendering ApiExplorerWrapper with props:', props);
  const sortedJson = sortKeysCanonical(props.item.jsonRequestBodyExample);
  const updatedProps = { ...props, item: { ...props.item, jsonRequestBodyExample: sortedJson } };

  return (
    <>
      <ApiExplorer {...updatedProps} />
    </>
  );
}
