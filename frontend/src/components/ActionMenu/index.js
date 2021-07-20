import React from 'react';
import { MdRemoveRedEye, MdEdit, MdDelete, MdCancel } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Menu, MenuItem, LinkEdit } from './style';

export default function ActionMenu({
  VisualizeClick,
  Editar,
  path,
  Remove,
  Cancel,
}) {
  return (
    <Menu>
      {VisualizeClick && (
        <MenuItem color="#8E5BE8" onClick={VisualizeClick}>
          <MdRemoveRedEye size={15} />
          <span>Visualizar</span>
        </MenuItem>
      )}
      {Editar && (
        <MenuItem color="#4D85EE">
          <MdEdit size={15} />
          <LinkEdit
            to={{
              pathname: `${path}`,
              state: { Editar },
            }}
          >
            Editar
          </LinkEdit>
        </MenuItem>
      )}
      {Remove && (
        <MenuItem color="#DE3B3B" onClick={Remove}>
          <MdDelete size={15} />
          <span>Excluir</span>
        </MenuItem>
      )}
      {Cancel && (
        <MenuItem color="#DE3B3B" onClick={Cancel}>
          <MdCancel size={15} />
          <span>Cancelar</span>
        </MenuItem>
      )}
    </Menu>
  );
}

ActionMenu.defaultProps = {
  VisualizeClick: null,
  Editar: {},
  Remove: null,
  Cancel: null,
  path: null,
};

ActionMenu.propTypes = {
  VisualizeClick: PropTypes.func,
  Editar: PropTypes.shape({
    Editar: PropTypes.shape({
      avatar: PropTypes.shape({
        url: PropTypes.string,
        path: PropTypes.string,
      }),
      avatar_id: PropTypes.number,
      createdAt: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
  }),
  Remove: PropTypes.func,
  Cancel: PropTypes.func,
  path: PropTypes.string,
};
