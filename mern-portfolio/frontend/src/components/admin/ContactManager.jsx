import { useState, useEffect } from 'react';
import axios from 'axios';

const ContactManager = ({ onUpdate }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/contact`);
      setContacts(response.data.data);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="manager-section">
      <div className="manager-header">
        <h2>Contact Messages</h2>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{formatDate(contact.createdAt)}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td className="message-preview">
                  {contact.message.substring(0, 50)}...
                </td>
                <td>
                  <span className={`status-badge ${contact.status}`}>
                    {contact.status}
                  </span>
                </td>
                <td className="action-cell">
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="view-btn"
                  >
                    👁️ View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedContact && (
        <div className="modal-overlay" onClick={() => setSelectedContact(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact Message</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedContact(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="contact-detail">
                <strong>From:</strong> {selectedContact.name}
              </div>
              <div className="contact-detail">
                <strong>Email:</strong>{' '}
                <a href={`mailto:${selectedContact.email}`}>
                  {selectedContact.email}
                </a>
              </div>
              <div className="contact-detail">
                <strong>Date:</strong> {formatDate(selectedContact.createdAt)}
              </div>
              <div className="contact-detail">
                <strong>Message:</strong>
                <p className="message-full">{selectedContact.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManager;