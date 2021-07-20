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
flex-direction: column;

label {
   font-weight: bold;
   span {
     color: red;
   }

   input{
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: ${({ theme }) => theme.colors.b};
      display: block;
      width: 100%;
      margin: 10px 0px;
    }
   }
 }
`;

export const Div = style.div`
width: 100%;
display: flex;
flex-direction: column;
background-color: white;
padding: 20px 30px;
border-radius: 4px;
margin-top: 30px;
`;
export const Name = style.div`
    margin-bottom:1.0rem;
`;

export const Address = style.div`
   display:flex;
   justify-content:space-between;
`;

export const Street = style.label`
   width:70%;
   margin-right:2.0rem;
`;

export const Number = style.label`
    margin-right:2.0rem;
`;

export const AddressLabel = style.label`
  width:30%;
`;
