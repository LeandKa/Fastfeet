import style from 'styled-components';

export const AsyncSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: 'white',
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      borderColor: state.isFocused ? 'red' : 'blue',
    },
  }),
};

export const Span = style.span`
  color:red;
  font-weigth:bold;
`;
