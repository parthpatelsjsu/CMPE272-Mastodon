import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import App from "./App";
import "@testing-library/jest-dom";

describe("App Component", () => {
  it("renders the app title", () => {
    render(<App />);
    const title = screen.getByText(/Interact with Mastodon Posts!/i);
    expect(title).toBeInTheDocument();
  });

  it("shows error when trying to create an empty post", async () => {
    render(<App />);
    const createButton = screen.getByRole("button", { name: /Create Post/i });
    fireEvent.click(createButton);

    const errorMessage = await screen.findByText(
      /Post content cannot be empty/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows error when trying to fetch a post without an ID", async () => {
    render(<App />);
    const fetchButton = screen.getByRole("button", { name: /Fetch Post/i });
    fireEvent.click(fetchButton);

    const errorMessage = await screen.findByText(/Post ID cannot be empty/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows error when trying to delete a post without an ID", async () => {
    render(<App />);
    const deleteButton = screen.getByRole("button", { name: /Delete Post/i });
    fireEvent.click(deleteButton);

    const errorMessage = await screen.findByText(/Post ID cannot be empty/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
