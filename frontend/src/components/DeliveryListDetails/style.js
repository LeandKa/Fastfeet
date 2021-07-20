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

export const DetailsImg = style.div`

   p{
    color:${({ theme }) => theme.colors.body};
    margin-bottom:10px;
   }

   div{
       display:flex;
       justify-content:center;
       width:100%;
   }
   img{
       margin-top:10px;
   }

`;
