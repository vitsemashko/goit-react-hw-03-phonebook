import PropTypes from "prop-types";
import css from "./ContactListItem.module.css";

const ContactListItem = ({ id, name, number, deleteItem }) => {
	return (
		<li key={id} className={css.contactListItem}>
			<span>{name}</span>
			<span>{number}</span>
			<button
				type="button"
				onClick={() => {
					return deleteItem(id);
				}}
			>
				Delete
			</button>
		</li>
	);
};

ContactListItem.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired,
	deleteItem: PropTypes.func.isRequired,
};

export default ContactListItem;
