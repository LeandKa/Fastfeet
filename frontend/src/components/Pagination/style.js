import style from 'styled-components';

export const Container = style.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  margin-top:2.0rem;
  
  svg{
    color: #7d40e7;
    cursor: pointer;
  }
`;

export const PageNumber = style.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin: 0px 10px;
    color: #7d40e7;
    font-size: 16px;
    font-weight: bold;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    padding: 10px 15px;
  }
`;
