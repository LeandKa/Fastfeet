import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { UInput, Span } from './style';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const { clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <UInput
        id={fieldName}
        ref={inputRef}
        onFocus={clearError}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <Span>{error}</Span>}
    </>
  );
}

Input.defaultProps = {
  name: '',
};

Input.propTypes = {
  name: PropTypes.string,
};
