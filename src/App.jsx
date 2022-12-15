import React, { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";

class App extends Component {
	state = {
		contacts: [
			{ id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
			{ id: "id-2", name: "Hermione Kline", number: "443-89-12" },
			{ id: "id-3", name: "Eden Clements", number: "645-17-79" },
			{ id: "id-4", name: "Annie Copeland", number: "227-91-26" },
		],
		filter: "",
		name: "",
		number: "",
	};
	componentDidUpdate() {
		localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
	}
	componentDidMount(prevState) {
		const contacts = localStorage.getItem("contacts");
		if (contacts) {
			const parsedContacts = JSON.parse(contacts);
			this.setState({ contacts: parsedContacts });
		} else {
			this.setState(prevState);
		}
	}
	onHandleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	onFilterName = (contact) => {
		return contact.name === this.state.name;
	};
	onFilterNumber = (contact) => {
		return contact.number === this.state.number;
	};
	reset = () => {
		this.setState({ name: "", number: "" });
	};
	onNameChecking = () => {
		if (this.state.contacts.find(this.onFilterName)) {
			console.log("name exist");
			this.reset();
		} else {
			console.log("name new");
			this.setState(this.addContactToState());
			alert("This is a new person. Add to contacts list");
			this.reset();
		}
	};
	onNumberChecking = () => {
		if (this.state.contacts.find(this.onFilterNumber)) {
			console.log("num exist");
			this.reset();
		} else {
			console.log("num new");
			this.setState(this.addContactToState());
			alert("This is a new person. Add to contacts list");
			this.reset();
		}
	};
	onFormSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const name = form.elements.name.value;
		const number = form.elements.number.value;
		this.setState({ name, number });
		this.onNameChecking();
		this.onNumberChecking();
	};
	addContactToState = () => {
		this.state.contacts.push({
			id: nanoid(),
			name: this.state.name,
			number: this.state.number,
		});
	};
	onDeleteItem = (id) => {
		this.setState({
			contacts: this.state.contacts.filter((contact) => {
				return contact.id !== id;
			}),
		});
	};
	render() {
		const normalizedFilter = this.state.filter;
		const visibleContacts = this.state.contacts.filter((contact) => {
			return contact.name.toLowerCase().includes(normalizedFilter);
		});
		return (
			<div>
				<h2>Phonebook</h2>
				<ContactForm
					name={this.state.name}
					number={this.state.number}
					onChange={this.onHandleChange}
					onSubmit={this.onFormSubmit}
				/>
				<h2>Contacts</h2>
				<Filter filter={this.state.filter} onChange={this.onHandleChange} />
				<ContactList
					visibleContacts={visibleContacts}
					deleteItem={this.onDeleteItem}
				/>
			</div>
		);
	}
}

export default App;
