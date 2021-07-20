import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { Container, PageNumber } from './style';

export default function Pagination({ page, maxPage, handleChangePage }) {
  return (
    <Container>
      {page !== 1 ? (
        <AiOutlineArrowLeft
          size={32}
          onClick={() => handleChangePage(page - 1)}
        />
      ) : (
        <br />
      )}
      <PageNumber>
        <span>{page}</span>
      </PageNumber>
      {page !== maxPage ? (
        <AiOutlineArrowRight
          size={32}
          onClick={() => handleChangePage(page + 1)}
        />
      ) : (
        <br />
      )}
    </Container>
  );
}

Pagination.defaultProps = {
  page: null,
  maxPage: null,
  handleChangePage: null,
};

Pagination.propTypes = {
  page: PropTypes.number,
  maxPage: PropTypes.number,
  handleChangePage: PropTypes.func,
};
