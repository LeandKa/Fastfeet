import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { Span, Mask } from './style';

export default function InputMask({ name, ...rest }) {
  const inputRef = useRef(null);

  const { clearError } = useField(name);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Mask
        ref={inputRef}
        onFocus={clearError}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <Span>{error}</Span>}
    </>
  );
}

InputMask.defaultProps = {
  name: '',
};

InputMask.propTypes = {
  name: PropTypes.string,
};
