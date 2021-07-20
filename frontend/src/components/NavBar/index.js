import React from 'react';
import { useDispatch } from 'react-redux';
import { getSessionOut } from '~/store/modules/users/action';
import {
  Container,
  Logo,
  Row,
  Content,
  NavList,
  NavListItem,
  User,
  Username,
  Userlogout,
} from './style';
import LogoPng from '../../assets/logo.png';

export default function NavBar() {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(getSessionOut());
  };

  return (
    <Container>
      <Logo src={LogoPng} alt="Fastfeet" />
      <Row />
      <Content>
        <NavList>
          <NavListItem href="/delivery/list">ENCOMENDAS</NavListItem>
          <NavListItem href="/deliveryman/list">ENTREGADORES</NavListItem>
          <NavListItem href="/recipients/list">DESTINATARIOS</NavListItem>
          <NavListItem href="/problems/list">PROBLEMAS</NavListItem>
        </NavList>
        <User>
          <Username>Admin Fastfeet</Username>
          <Userlogout onClick={onClick}>Sair do sistema</Userlogout>
        </User>
      </Content>
    </Container>
  );
}
