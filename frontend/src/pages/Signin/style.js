import style from 'styled-components';
import { Form } from '@unform/web';

export const Container = style.div`
   height:100vh;
   background:${({ theme }) => theme.colors.primary};
   display:flex;
   flex-direction:column;
   align-items:center;
   justify-content:center;
`;

export const Content = style.div`
   background:${({ theme }) => theme.colors.secondary};
   padding:1.0rem;
`;

export const Logo = style.img`
   padding:1.0rem;
   margin-top:1.0rem;
`;

export const ContentForm = style(Form)`
  margin:1.0rem;
`;

export const Label = style.label`
display:flex;
flex-direction:column;
width:100%;
padding-top:1.0rem;
`;

export const Button = style.button`
  background:${({ theme }) => theme.colors.primary};
  padding:7px 7px 7px 7px;
  margin-top:1.0rem;
  width:100%;
  border:none;
  color:${({ theme }) => theme.colors.secondary};
`;
