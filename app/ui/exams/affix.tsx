'use client';
import React from 'react';
import { Affix, Button } from 'antd';
import { useState } from 'react';

function AffixContainer() {
  const [top, setTop] = useState<number>(10);

  return (
    <Affix
      offsetTop={top}
      target={() =>
        document.getElementById('exam-detail')?.parentElement as HTMLElement
      }
    >
      <Button type="primary">Affix top</Button>
    </Affix>
  );
}
export default AffixContainer;
