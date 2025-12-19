import React from 'react';
import Container from '@theme-original/ApiExplorer/ApiCodeBlock/Container';

export default function ContainerWrapper(props) {
  console.log('Rendering ContainerWrapper with props:', props);
  return (
    <>
      <Container {...props} />
    </>
  );
}
