import style from 'styled-components';

export const Container = style.div`
   background:${({ theme }) => theme.colors.background};
   height:120vh;
   display:flex;
   align-content:center;
   justify-content:center;
`;

export const Content = style.div`
   width:80%;
   padding-top:2.0rem;
`;

export const ContentTable = style.div`
  width:100%;
  display: flex;
  align-items: center;
`;

export const Img = style.img`
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const DeliverymanTable = style.table`
width: 100%;
border-collapse: separate;
border-spacing: 0 1em;

   tbody tr{
      background:${({ theme }) => theme.colors.secondary};
   }

   th {
      text-align: left;
      color: ${({ theme }) => theme.colors.title};
      padding: 10px;
      &:last-child {
        text-align: center;
      }
    }
    td {
      color: #666;
      width: 30%;
      padding: 10px;
      &:first-child {
        width: 10%;
        margin:1.0rem;
      }
      &:last-child {
        width: 10%;
        text-align: center;
        cursor: pointer;
      }
   }

`;
