'use client';

import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space } from 'antd';
import { Question } from '@/app/lib/placeholder-data2';

interface IProps {
  question: Question;
  onChange: (id: string, value: string) => void;
}
const QuestionRadio = ({ question, onChange }: IProps) => {
  //   const [value, setValue] = useState(1);

  const onValueChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    // setValue(e.target.value);
    onChange(question.id, e.target.value);
  };

  return (
    <Radio.Group onChange={onValueChange}>
      <Space direction="vertical">
        {question.options?.map((option, index) => {
          return (
            <Radio key={index} value={String.fromCharCode(65 + index)}>
              {String.fromCharCode(65 + index) + '. ' + option}
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );
};

export default QuestionRadio;
