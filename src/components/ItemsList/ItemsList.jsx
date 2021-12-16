/** @jsxImportSource @emotion/react */

import { memo } from 'react';
import PropTypes from 'prop-types';
import Paper from 'components/common/Paper/Paper';
import CardWithMenu from './CardWithMenu/CardWithMenu';
import { listStyles } from './ItemsListStyles';

const ItemsList = ({ items, onEditItem, onDeleteItem, link }) => {
  return (
    <ul css={listStyles}>
      {items.map(item => (
        <li key={item.id}>
          <Paper>
            <CardWithMenu
              item={item}
              onEdit={() => onEditItem(item)}
              onDelete={() => onDeleteItem(item)}
              link={link}
            />
          </Paper>
        </li>
      ))}
    </ul>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
  onEditItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  link: PropTypes.string,
};

export default memo(ItemsList);
