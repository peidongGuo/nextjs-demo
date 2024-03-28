import React from 'react';
import { classnames } from '../utils/general';
import { Input } from 'antd';

const { TextArea } = Input;

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <TextArea
      rows="3"
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      placeholder={`自定义输入数据，按行分隔`}
    ></TextArea>
  );
};

export default CustomInput;
