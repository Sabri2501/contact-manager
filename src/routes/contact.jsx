import React from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) throw new Response("", { status: 404, statusText: "Not Found" });
  return { contact };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
}

export default function Contact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate(); // Hook to navigate after editing

  const handleEditClick = () => {
    // Redirect to the edit page for this contact
    navigate(`/contacts/${contact.id}/edit`);
  };

  return (
    <div id="contact">
      <div>
        {/* Display the avatar URL */}
        <img
          src={contact.avatar || "https://th.bing.com/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?rs=1&pid=ImgDetMain"}
          alt="Avatar"
        />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? `${contact.first} ${contact.last} ` : <i>No Name</i>}
        </h1>
        <h4 id="h4">
            {contact.twitter ? `${contact.twitter} `: <i> no twitter </i>}
        </h4>
        <p>
            {contact.notes ? `${contact.notes}`: <i> no notes </i> }
        </p>
        {/* Corrected Form for editing */}
        <button onClick={handleEditClick} id="bt">Edit</button>

        <Form method="post" action="destroy">
          <button type="submit" id="bt">Delete</button>
        </Form>
      </div>
    </div>
  );
}
