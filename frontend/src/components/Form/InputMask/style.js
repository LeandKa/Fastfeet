import style from 'styled-components';
import ReactInputMask from 'react-input-mask';

export const Mask = style(ReactInputMask)`
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: 4px;
height: 44px;
padding: 0 15px;
color: ${({ theme }) => theme.colors.body};
display: block;
width: 100%;
margin: 10px 0px;
`;

export const Span = style.span`
  color:red;
  font-weigth:bold;
`;
