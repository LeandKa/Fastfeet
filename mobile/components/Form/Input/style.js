import styled from 'styled-components/native';
import colors from '~/../pages/styles/colors';

export const TextField = styled.TextInput`
    width: 305px;
    height: ${props => props.height}
    background: ${colors.secondary};
    text-align:center;
    margin: 10px 10px 10px 10px;
    border-radius: 5px;
    padding: 4px 4px 4px 4px;
    border: 1px solid ${colors.border};
`;
