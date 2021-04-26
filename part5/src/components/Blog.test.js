import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
// import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "The Doors",
    author: "Jim Morrison",
    url: "http://google.com",
    likes: 9999,
    user: {
      username: "Lebron James",
      name: "TheKing",
    },
  };

  const component = render(<Blog blog={blog} />);
  //   component.debug();
  //   const strong = component.container.querySelector("strong");
  //   console.log(prettyDOM(strong));

  // method 1
  expect(component.container).toHaveTextContent("The Doors");

  expect(component.container.user).toBeUndefined();
  expect(component.container.likes).toBeUndefined();

  // method 2
  const element = component.getByText("Jim Morrison");
  expect(element).toBeDefined();

  // method 3
  const div = component.container.querySelector(".blog-container");
  expect(div).toHaveTextContent("The Doors by Jim Morrison");
});
