import { Public } from "../components/Public";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

describe("Public component", () => {
  test("renders main", () => {
    render(
      <Router>
        <Public />
      </Router>
    );
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  });

  test("renders phone number link", () => {
    render(
      <Router>
        <Public />
      </Router>
    );
    const linkElement = screen.getByRole("link", {
      name: "(555) 555-5555",
    });
    expect(linkElement).toBeInTheDocument();
  });

  test("renders paragraph", () => {
    render(
      <Router>
        <Public />
      </Router>
    );
    const paragraphElement1 = screen.getByText(/this is an introduction/i);
    expect(paragraphElement1).toBeInTheDocument();
  });

  test("renders correctly", () => {
    render(
      <Router>
        <Public />
      </Router>
    );
    const paragraphElement = screen.getByText(/owner: kate wilson/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test("Component renders properly", () => {
    const component = renderer.create(
      <Router>
        <Public />
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
