import React, { useContext, useEffect } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

export default function Home(props) {
  const {showAlert} = props;
  document.title = `${props.title}`;
  return (
    <>
      <div className="container my-5">
        <AddNote showAlert={showAlert} />
        <Notes showAlert={showAlert}  />
      </div>
    </>
  );
}

Home.defaultProps = {
  title: "iNoteBook: Organize, and Secure Your Notes in the Cloud",
};
