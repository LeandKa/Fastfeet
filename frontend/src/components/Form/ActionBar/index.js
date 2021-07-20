import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import Title from '../../Title';
import { Container, ContentButtons } from './style';

export default function ActionBar({ text }) {
  const history = useHistory();

  return (
    <Container>
      <Title text={text} />
      <ContentButtons>
        <button type="button" onClick={() => history.goBack()}>
          <BsFillCaretLeftFill size={16} />
          Voltar
        </button>
        <button type="submit">
          <AiOutlineCheck size={16} />
          Salvar
        </button>
      </ContentButtons>
    </Container>
  );
}

ActionBar.defaultProps = {
  text: null,
};

ActionBar.propTypes = {
  text: PropTypes.string,
};
