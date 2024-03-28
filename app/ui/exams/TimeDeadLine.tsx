'use client';
import React from 'react';
import type { CountdownProps } from 'antd';
import { Affix, Col, Row, Statistic } from 'antd';

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 90; // Dayjs is also OK

const onFinish: CountdownProps['onFinish'] = () => {
  console.log('finished!');
};

const TimeDeadLine: React.FC = () => (
  <Affix
    offsetTop={10}
    target={() =>
      document.getElementById('exam-detail')?.parentElement as HTMLElement
    }
  >
    <Countdown
      className="rounded-[4px] bg-[#ffffff]"
      title=""
      value={deadline}
      onFinish={onFinish}
    />
  </Affix>
);

export default TimeDeadLine;
