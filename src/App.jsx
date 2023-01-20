import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import './App.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };
  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
  componentDidMount(prevState) {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      const parsedContacts = JSON.parse(contacts);
      this.setState({ contacts: parsedContacts });
    } else {
      this.setState(prevState);
    }
  }
  onHandleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onFilterName = contact => {
    return contact.name.toLowerCase() === this.state.name.toLowerCase();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  onNameChecking = () => {
    if (this.state.contacts.find(this.onFilterName)) {
      alert('This person is already in your contacts');
    } else {
      this.addContactToState();
      this.reset();
    }
  };
  onFormSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    this.setState({ name, number });
    this.onNameChecking();
  };
  addContactToState = () => {
    this.setState(prev => {
      return {
        contacts: [
          ...prev.contacts,
          { name: this.state.name, number: this.state.number, id: nanoid() },
        ],
      };
    });
  };
  onDeleteItem = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => {
        return contact.id !== id;
      }),
    });
  };
  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact => {
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
