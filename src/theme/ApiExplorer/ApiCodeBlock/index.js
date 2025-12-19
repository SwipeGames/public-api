import React from 'react';
import ApiCodeBlock from '@theme-original/ApiExplorer/ApiCodeBlock';

export default function ApiCodeBlockWrapper(props) {
  console.log('Rendering ApiCodeBlockWrapper with props:', props);

  return (
    <>
      <ApiCodeBlock {...props} />
    </>
  );
}
