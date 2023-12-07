import React, { useContext, useState } from "react";
import noteContext from "../Context/Notes/NoteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
    props.showAlert("Created New Note Successfully", "success");
  };

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="w-auto">
        <h2 className="font-semibold text-5xl">Add a Note</h2>
        <form className="mt-4 mb-5 w-5/6 mx-auto">
          <div className="mb-3">
            <label htmlFor="title" className="form-label text-2xl">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={note.title} minLength={5} required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label text-2xl">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="8"
              onChange={handleChange}
              value={note.description} minLength={5} required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label text-2xl">Tag</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              id="tag"
              name="tag"
              value={note.tag}
            />
          </div>
          <button
            className="btn bg-blue-600 text-white hover:bg-blue-600 float-right"
            onClick={handleClick} 
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}
