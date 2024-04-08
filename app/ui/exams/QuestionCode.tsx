'use client';

import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Checkbox, Radio, Space } from 'antd';
import { Question } from '@/app/mock-data/placeholder-data2';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import LandingSimple from '@/app/code-editor/LandingSimple';
import { inter } from '../fonts';

interface IProps {
  question: Question;
  onChange: (id: string, value: string) => void;
}

const QuestionCode = ({ question, onChange }: IProps) => {
  const onValueChange = (code: string) => {
    console.log('code', code);
    onChange(question.id, code);
  };
  return <LandingSimple onChange={onValueChange} />;
};

export default QuestionCode;
