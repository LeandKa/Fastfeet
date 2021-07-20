import style from 'styled-components';

export const Container = style.div`
  width: 100vw;
  height: 110vh;
  z-index: 1;
  position: absolute;
  top: 0;
  right:0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
`;

export const Content = style.div`
background: white;
padding: 20px;
position: fixed;
z-index: 1;
width: 30vw;
top: 25vh;
left: 35vw;
`;
