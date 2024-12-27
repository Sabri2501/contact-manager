import React from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post">
    <div className="form-section">
      <h3>Personal Information</h3>
      <div>
        <label htmlFor="first-name">First Name:</label>
        <input
         className="input-group"
          id="first-name"
          placeholder="First name"
          defaultValue={contact.first}
          name="first"
        />
      </div>
  
      <div >
        <label htmlFor="last-name">Last Name:</label>
        <input
         className="input-group"
          id="last-name"
          placeholder="Last name"
          defaultValue={contact.last}
          name="last"
        />
      </div>
    </div>
  
    <div className="form-section">
      <h3>Contact Information</h3>
      <div>
        <label htmlFor="twitter">Twitter:</label>
        <input
         className="input-group"
          id="twitter"
          placeholder="@twitter"
          defaultValue={contact.twitter}
          name="twitter"
        />
      </div>
  
      <div >
      <label htmlFor="avatar-url">Avatar URL:</label>
          <input
            className="input-group"
            id="avatar-url"
            placeholder="https://pic.com/avatar.jpg"
            name="avatar"
            defaultValue={contact.avatar || ''}
          />
      </div>
    </div>
  
    <div className="form-section">
        <h3>Notes</h3>
        <div>
          <textarea
            id="notes"
            className="input-group"
            name="notes"  // Ensure name attribute is added for form data
            defaultValue={contact.notes}
          />
        </div>
       </div>
    <div className="form-actions">
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  </Form>
  
  );
}
