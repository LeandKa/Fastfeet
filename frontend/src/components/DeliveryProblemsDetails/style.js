import style from 'styled-components';

export const Details = style.div`
  margin-bottom:20px;
  border-bottom:1px solid ${({ theme }) => theme.colors.border};
  padding-bottom:10px;

  h5{
      margin-bottom:5px;
  }

  p{
    color:${({ theme }) => theme.colors.body};
    margin-bottom:10px;
  }

`;
