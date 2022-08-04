import React from 'react';
import { Input } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import InputIncDecWrapper from './InputIncDec.style';

const InputIncDec = ({ className, increment, decrement, ...restProps }) => {
  const addAllClasses = ['quantity'];
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <InputIncDecWrapper className={addAllClasses.join(' ')}>
      <button className="btn decBtn" type="button" onClick={decrement}>
        <MinusOutlined />
      </button>
      <Input className="qnt-input" type="number" {...restProps} />
      <button className="btn incBtn" type="button" onClick={increment}>
        <PlusOutlined />
      </button>
    </InputIncDecWrapper>
  );
};

export default InputIncDec;
