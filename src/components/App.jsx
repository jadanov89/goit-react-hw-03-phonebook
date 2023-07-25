import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import { Filter } from './Filter/Filter';
import { List } from './List/List';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };


  componentDidMount() {
    const storageContacts = localStorage.getItem('contacts');
    const parsedStorageContacts = JSON.parse(storageContacts);

    if (parsedStorageContacts) {
      this.setState({ contacts: parsedStorageContacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = contact => {
    this.setState(prevState => {
      return {
        contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
      };
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterContacts = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const { deleteContact, addContact, filterContacts, getFilteredContacts } =
      this;
    const visibleContacts = getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={addContact} currentContacts={contacts} />
        <h2>Contacts</h2>
        <Filter value={filter} onFilterChange={filterContacts} />
        <List contacts={visibleContacts} deleteContact={deleteContact} />
      </div>
    );
  }
}