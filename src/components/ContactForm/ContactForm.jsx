import PropTypes from "prop-types";
import css from "./ContactForm.module.css";

const ContactForm = ({ name, number, onChange, onSubmit }) => {
	return (
		<form className={css.form} onSubmit={onSubmit}>
			<label className={css.labelName}>
				Name
				<input
					type="text"
					name="name"
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
					value={name}
					onChange={onChange}
				/>
			</label>
			<label>
				Number
				<input
					type="tel"
					name="number"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					required
					value={number}
					onChange={onChange}
				/>
			</label>
			<button type="submit" className={css.button}>
				Add contact
			</button>
		</form>
	);
};

ContactForm.propTypes = {
	name: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
