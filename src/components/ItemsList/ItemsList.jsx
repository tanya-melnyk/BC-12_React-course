/** @jsxImportSource @emotion/react */

import PropTypes from 'prop-types';
import Paper from 'components/common/Paper/Paper';
import CardWithMenu from './CardWithMenu/CardWithMenu';
import { listStyles } from './ItemsListStyles';

const ItemsList = ({ items, onEditItem, onDeleteItem }) => (
  <ul css={listStyles}>
    {items.map(item => (
      <li key={item.id}>
        <Paper>
          <CardWithMenu
            text={item.name}
            onEdit={() => onEditItem(item)}
            onDelete={() => onDeleteItem(item)}
          />
        </Paper>
      </li>
    ))}
  </ul>
);

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
  onEditItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default ItemsList;
