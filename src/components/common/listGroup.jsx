const ListGroup = (props) => {
  return (
    <ul className="list-group m-4">
      {props.genres.map((genre) => (
        <li
          style={{ cursor: "pointer" }}
          key={genre._id}
          className={
            (genre === props.selectedItem ? "active " : "") +
            "list-group-item p-20"
          }
          onClick={() => props.onFiltering(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
