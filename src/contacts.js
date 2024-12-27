let contacts = [];

export function getContacts(query) {
  if (!query) return contacts;
  return contacts.filter(
    (contact) =>
      contact.first.toLowerCase().includes(query.toLowerCase()) ||
      contact.last.toLowerCase().includes(query.toLowerCase())
  );
}

export function getContact(id) {
  return contacts.find((contact) => contact.id === id) || null;
}

export function createContact() {
  const newContact = {
    id: `${Date.now()}`,
    first: "",
    last: "",
    twitter: "",
    avatar: "",
    notes: "",
    favorite: false,
  };
  contacts.push(newContact);
  return newContact;
}

export function updateContact(id, updates) {
  const contact = getContact(id);
  Object.assign(contact, updates);
}

export function deleteContact(id) {
  contacts = contacts.filter((contact) => contact.id !== id);
}
