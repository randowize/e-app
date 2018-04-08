import * as React from 'react';

interface TurkishLiraProps {
}

export const TurkishLira: React.SFC<TurkishLiraProps> = (props) => {
  return <span>&#8378;</span>;
};

export default function TurkishLiraBlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'turkish-lira') {
    return {
      component: TurkishLira,
      editable: false,
      props: {
        foo: 'bar',
      },
    };
  }
};