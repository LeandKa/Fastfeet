import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';
import { AsyncSelectStyles, Span } from './style';

export default function AsyncSelect({ name, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const { clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map(option => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        ref.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <ReactSelect
        onFocus={clearError}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
        styles={AsyncSelectStyles}
      />
      {error && <Span>{error}</Span>}
    </>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
};
