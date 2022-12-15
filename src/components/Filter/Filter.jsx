import PropTypes from "prop-types";
import css from "./Filter.module.css";

const Filter = ({ filter, onChange }) => {
	return (
		<div className={css.filterWrapper}>
			<p>Find contacts by name</p>
			<input type="text" name="filter" value={filter} onChange={onChange} />
		</div>
	);
};

Filter.propTypes = {
	filter: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default Filter;
