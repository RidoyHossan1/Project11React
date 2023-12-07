import React, { useState, useContext } from "react";
import noteContext from "../Context/Notes/NoteContext";

export default function UpdateNotes({ isModalOpenUN, toggleModalUN, notes }) {
  const context = useContext(noteContext);
  const { updateNote } = context;

  const [title, setTitle] = useState(notes.title || "");
  const [tag, setTag] = useState(notes.tag || "");
  const [description, setDescription] = useState(notes.description || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedNote = {
      id: notes._id,
      title: title,
      tag: tag,
      description: description,
    };
    await updateNote(
      updatedNote.id,
      updatedNote.title,
      updatedNote.description,
      updatedNote.tag
    );
    await toggleModalUN();
  };

  return (
    <>
      {isModalOpenUN && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="relative bg-white w-full max-w-md p-6 rounded-md">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Update Note
              </h3>
              <button
                onClick={toggleModalUN}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="mt-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Write product description here"
                ></textarea>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="tag"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tag
                </label>
                <input
                  type="text"
                  id="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={toggleModalUN}
                  className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
