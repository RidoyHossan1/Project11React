import React from "react";

export default function Alert(props) {
  const capitalized = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show m-0`}
        role="alert"
      >
        <strong className="ml-5">{capitalized(props.alert.type)}</strong>:{" "}
        {props.alert.message}
      </div>
    )
  );
}
