import style from 'styled-components';
import { Form } from '@unform/web';

export const Container = style.div`
   background:${({ theme }) => theme.colors.background};
   height:120vh;
   display:flex;
   align-content:center;
   justify-content:center;
`;

export const Content = style.div`
   width:80%;
   height:100vh;
   padding-top:2.0rem;
`;

export const FormContent = style(Form)`
  width: 100%;
  display: flex;
  flex-direction:column;
`;

export const Div = style.div`
width: 100%;
display: flex;
flex-direction:column;
background:white;
padding:2.0rem;
`;

export const Label = style.label`
display:flex;
flex-direction:column;
padding-top:1.0rem;
width:80%;
height:45px;
`;

export const Input = style.input`
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: 4px;
height: 44px;
padding: 0 15px;
color: ${({ theme }) => theme.colors.body};
display: block;
width: 100%;
margin: 10px 0px;
`;
