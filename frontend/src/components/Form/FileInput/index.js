import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import NoI from '~/assets/noImage.png';
import Api from '~/services/Api';
import { Img, Input, Label } from './style';

export default function FileInput({ name, defaultValue }) {
  const inputRef = useRef(null);

  const { fieldName, registerField } = useField(name);

  const [file, setFile] = useState(0);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    setFile(defaultValue.id);
    setPreview(defaultValue.url);
  }, [defaultValue]);

  async function handlePreview(e) {
    const file = e.target.files?.[0];

    const data = new FormData();
    data.append('avatar', file);

    const response = await Api.post('/files', data);
    setPreview(response.data.files.url);
    setFile(response.data.files.id);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'dataset.pass',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Label htmlFor="avatar">
        {file !== -1 ? (
          <Img src={preview} alt="Preview" />
        ) : (
          <>
            <Img alt="Change Avatar" src={NoI} />
          </>
        )}
        <Input
          type="file"
          id="avatar"
          accept="image/*"
          data-pass={file}
          ref={inputRef}
          onChange={handlePreview}
        />
      </Label>
    </>
  );
}

FileInput.defaultProps = {
  name: '',
  defaultValue: {},
};

FileInput.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  }),
};
