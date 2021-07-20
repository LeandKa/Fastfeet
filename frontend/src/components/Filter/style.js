import style from 'styled-components';
import { Link } from 'react-router-dom';

import { FaSearch } from 'react-icons/fa';

export const Container = style.div`
   display:flex;
   flex-direction:row;
   justify-content:space-between;
   margin-top:2.0rem;
   padding:1.0rem;
`;

export const FilterInput = style.input`
   padding:0.3rem;
   width:22%;
   text-align:center;
`;

export const InputIcon = style(FaSearch)`
  position:relative;
  top:3px;
  color:${({ theme }) => theme.colors.body};
  right:200px;
`;

export const FilterButton = style(Link)`
   background:${({ theme }) => theme.colors.primary};
   color:${({ theme }) => theme.colors.secondary};
   font-size:14px;
   border:none;
   border-radius:4px 4px 4px 4px;
   width:10%;
   padding:0.3rem;
`;
