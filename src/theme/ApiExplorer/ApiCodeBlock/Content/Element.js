import React from 'react';
import Element from '@theme-original/ApiExplorer/ApiCodeBlock/Content/Element';

export default function ElementWrapper(props) {
  console.log('Rendering ElementWrapper with props:', props);
  return (
    <>
      <Element {...props} />
    </>
  );
}
