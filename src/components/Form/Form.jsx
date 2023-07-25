import { Component } from 'react';
import PropTypes from 'prop-types';
import AddForm from './Form.styled';

// const INITIAL_STATE = {
//   name: '',
//   number: '',
// };

// class ContactForm extends Component {
//   state = { ...INITIAL_STATE };

//   handleChange = evt => {
//     this.setState({ [evt.target.name]: evt.target.value });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();
//     this.props.onSubmit({ ...this.state, id: nanoid() });
//     this.reset();
//   };
//   reset() {
//     this.setState({ ...INITIAL_STATE });
//   }

//   render() {
//     return (
//       <AddForm onSubmit={this.handleSubmit}>
//         <label>
//           Name
//           <input
//             type="text"
//             name="name"
//             value={this.state.name}
//             pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             onChange={this.handleChange}
//             required
//           />
//         </label>
//         <label>
//           Number
//           <input
//             type="tel"
//             name="number"
//             value={this.state.number}
//             pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             onChange={this.handleChange}
//             required
//           />
//         </label>
//         <button type="submit">Add contact</button>
//       </AddForm>
//     );
//   }
// }

// ContactForm.propTypes = { onSubmit: PropTypes.func };

// export default ContactForm;

export default class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit, currentContacts } = this.props;
    const { state } = this;
    const existingContact = currentContacts.find(
      contact => state.name === contact.name
    );

    if (existingContact) {
      return alert(`${state.name} is already in contacts .`);
    }

    onSubmit(state);

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <AddForm onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">
            Name
            <input
              value={name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Number
            <input
              value={number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Add contact</button>
      </AddForm>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentContacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};