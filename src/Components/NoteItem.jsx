import React, { useState, useContext } from "react";
import DeleteConfirm from "./DeleteConfirm";
import noteContext from "../Context/Notes/NoteContext";

export default function NoteItem(props) {
  const { notes, updateNote } = props;
  const context = useContext(noteContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);

  };
  const {showAlert} = props;


  return (
    <>
      <div className="col-md-4 my-3">
        <div className="position-relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <span className="position-absolute top-0 right-0 badge bg-info">
            {notes.tag}
          </span>
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {notes.title}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400 mx-auto w-5/6 ">
              {notes.description}
            </span>
            <div className="flex mt-4 md:mt-6">
              <button
                onClick={()=>{updateNote(notes)}}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <i className="fa-solid fa-pen-to-square mr-2"></i>
                Update
              </button>
              <button
                onClick={toggleModal}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-500 border border-gray-300 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
              >
                <i className="fa-solid fa-trash mr-2"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirm
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        notes={notes}
        showAlert={showAlert}
      />
    </>
  );
}
