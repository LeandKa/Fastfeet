import style from 'styled-components';

export const Img = style.img`
  align-self:center;
  width:150px;
  height:150px;
`;

export const Label = style.label`
  font-size:1.25rem;
  font-weight:700;
  text-align:center;
  color:black;
  display:inline-block;

  &:hover{
      cursor:pointer;
  }
`;

export const Input = style.input`
width: 0.1px;
height: 0.1px;
opacity: 0;
overflow: hidden;
position: absolute;
z-index: -1;F
`;

export const Span = style.span`
  color:red;
  font-weigth:bold;
`;
