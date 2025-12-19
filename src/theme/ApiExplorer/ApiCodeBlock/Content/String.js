import React from 'react';
import String from '@theme-original/ApiExplorer/ApiCodeBlock/Content/String';

export default function StringWrapper(props) {
  console.log('Rendering StringWrapper with props:', props);
  return (
    <>
      <String {...props} />
    </>
  );
}
