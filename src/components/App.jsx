import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { v4 as uuidv4 } from 'uuid';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parseLocalContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parseLocalContacts) {
      setContacts(parseLocalContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = (name, number) => {
    const isInList = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    isInList
      ? alert(name + ' is already in contacts.')
      : setContacts([
          ...contacts,
          { name: name, id: uuidv4(), number: number },
        ]);
  };

  const handleClickDelete = e => {
    const updatedContacts = [];
    contacts.forEach(
      (contact, index) =>
        contact.id !== e.target.id && updatedContacts.push(contact),
    );
    setContacts(updatedContacts);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleFormSubmit} />
      <h2>Contacts</h2>
      <Filter onChangeFilter={e => setFilter(e.target.value)} filter={filter} />
      <ContactList
        filter={filter}
        contacts={contacts}
        onClickDelete={handleClickDelete}
      />
    </>
  );
};
