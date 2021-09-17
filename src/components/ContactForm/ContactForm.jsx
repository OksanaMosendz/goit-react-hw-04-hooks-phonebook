import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from './ContactForm.styled';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const HandleNameInput = e => setName(e.target.value);
  const HandleNumberInput = e => setNumber(e.target.value);

  const FormSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={FormSubmit}>
      <Label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={HandleNameInput}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </Label>

      <Label>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={HandleNumberInput}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </Label>
      <button type="submit">Add contact</button>
    </Form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
