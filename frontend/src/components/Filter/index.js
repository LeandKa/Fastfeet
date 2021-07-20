import React from 'react';
import PropTypes from 'prop-types';
import { BsPlus } from 'react-icons/bs';
import { Container, FilterInput, FilterButton, InputIcon } from './style';

export default function Filter({ text, path, onsubmit, onChange }) {
  return (
    <Container>
      <form onSubmit={onsubmit} style={{ width: '100%' }}>
        <FilterInput name="name" onChange={onChange} placeholder={text} />
        <InputIcon />
      </form>
      <FilterButton to={path}>
        {' '}
        <BsPlus />
        Cadastrar
      </FilterButton>
    </Container>
  );
}

Filter.defaultProps = {
  text: null,
  path: null,
  onsubmit: null,
  onChange: null,
};

Filter.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  onsubmit: PropTypes.func,
  path: PropTypes.string,
};
