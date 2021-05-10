import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">
          Anecdotes
        </Link>
        <Link style={padding} to="/create">
          Create new
        </Link>
        <Link style={padding} to="/about">
          About
        </Link>
      </div>
    </>
  );
};

export default Menu;
