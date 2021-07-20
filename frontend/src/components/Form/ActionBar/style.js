import style from 'styled-components';

export const Container = style.div`
   display:flex;
   flex-direction:row;
   justify-content:space-between;
   margin-top:1.0rem;
   padding:1.0rem;
`;

export const ContentButtons = style.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    button{
      background:${({ theme }) => theme.colors.primary};
      color:${({ theme }) => theme.colors.secondary};
      font-size:14px;
      border:none;
      width:100px;
      display:flex;
      justify-content:space-around;
      border-radius:4px 4px 4px 4px;
      padding:0.7rem;
      margin-left:1.0rem;

      svg{
         margin-right:0.3rem;
      }
    }
`;
