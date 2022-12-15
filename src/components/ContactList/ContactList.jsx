import ContactListItem from "../ContactListItem/ContactListItem";
import PropTypes from "prop-types";
import css from "./ContactList.module.css";

const ContactList = ({ visibleContacts, deleteItem }) => {
	return (
		<ul className={css.contactsList}>
			{visibleContacts.map(({ id, name, number }) => {
				return (
					<ContactListItem
						key={id}
						id={id}
						name={name}
						number={number}
						deleteItem={deleteItem}
					/>
				);
			})}
		</ul>
	);
};

ContactList.propTypes = {
	visibleContacts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
	deleteItem: PropTypes.func.isRequired,
};

export default ContactList;
