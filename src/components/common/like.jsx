import React, { Component } from "react";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      aria-hidden="true"
      style={{ color: "red", cursor: "pointer" }}
      className={classes}
      onClick={props.onClick}
    />
  );
};

export default Like;
