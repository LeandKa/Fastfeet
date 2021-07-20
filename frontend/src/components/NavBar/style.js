import style from 'styled-components';

export const Container = style.div`
   display:flex;
   flex-direction:row;
   padding:1.0rem;
   background:${({ theme }) => theme.colors.secondary};
   border-bottom:1px solid ${({ theme }) => theme.colors.border};
`;
export const Logo = style.img`
   width:135px;
   height:26px;
`;

export const Row = style.hr`
 height: 31px;
 margin-left:10px;
 border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Content = style.div`
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:space-between;
`;

export const NavList = style.ul`
   display:flex;
   flex-direction:row;
   justify-content: space-between;
   margin-top:0.4rem;
`;

export const NavListItem = style.a`
   color:${({ theme }) => theme.colors.body};
   margin-left:1.0rem;
`;

export const User = style.div`
  display:flex;
  flex-direction:column;
`;

export const Username = style.h1`
  font-size:12px;
`;
export const Userlogout = style.button`
    border:none;
    background:none;
    color:red;
   hover:& {
      outline:none;
    }
`;
