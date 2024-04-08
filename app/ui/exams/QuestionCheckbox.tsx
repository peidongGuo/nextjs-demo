'use client';

import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Checkbox, Radio, Space } from 'antd';
import { Question } from '@/app/mock-data/placeholder-data2';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

interface IProps {
  question: Question;
  onChange: (id: string, value: string) => void;
}

const QuestionCheckbox = ({ question, onChange }: IProps) => {
  const onValueChange = (checkedValue: CheckboxValueType[]) => {
    console.log('checkedValue', checkedValue);
    onChange(question.id, checkedValue.join(','));
  };

  return (
    <Checkbox.Group onChange={onValueChange}>
      <Space direction="vertical">
        {question.options?.map((option, index) => {
          return (
            <Checkbox key={index} value={String.fromCharCode(65 + index)}>
              {String.fromCharCode(65 + index) + '. ' + option}
            </Checkbox>
          );
        })}
      </Space>
    </Checkbox.Group>
  );
};

export default QuestionCheckbox;
