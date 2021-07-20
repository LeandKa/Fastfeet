import style from 'styled-components';
import { Link } from 'react-router-dom';

export const Menu = style.div`
  position:absolute;
  width:130px;
  border:1px solid ${({ theme }) => theme.colors.border};
  padding:15px;
  display:flex;
  flex-direction:column;
  background:${({ theme }) => theme.colors.secondary};
`;

export const MenuItem = style.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  width:100%;
  padding:10px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child{
    padding-top:0;
    padding-bottom:10px;
  }

  &:last-child{
    padding-top:10;
    padding-bottom:0;
    border-bottom:none;
  }


  svg{
    margin-right:3px;
    color:${props => props.color};
  }

  span{
    color:${({ theme }) => theme.colors.body};
    font-size:15px;
  }
`;

export const LinkEdit = style(Link)`
  text-decoration:none;
  color:${({ theme }) => theme.colors.body};
`;
