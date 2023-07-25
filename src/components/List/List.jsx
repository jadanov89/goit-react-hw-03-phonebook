
import PropTypes from 'prop-types';
import UlList from './List.styled';

// class List extends Component {
//   render() {
//     const { contacts, filter } = this.props;
//     const contactList = this.props.filter
//       ? contacts.filter(({ name }) => name.toLowerCase().includes(filter))
//       : contacts;
//     return (
//       <UlList>
//         {contactList.map(({ id, name, number }) => (
//           <li key={id}>
//             {`${name}: ${number}`}
//             <button
//               type="submit"
//               onClick={() => this.props.onDeleteContact(id)}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </UlList>
//     );
//   }
// }

// List.propTypes = {
//   contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
//   filter: PropTypes.string,
//   onDeleteContact: PropTypes.func,
// };

// export default List;


export const List = ({ contacts, deleteContact }) => {
  return (
    <UlList>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button type="button" onClick={() => deleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </UlList>
  );
};

List.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
