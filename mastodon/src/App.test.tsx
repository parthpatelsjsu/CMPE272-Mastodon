/*
FILE AUTHOR: Parth Patel
*/

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import App from "./App";
import "@testing-library/jest-dom";

describe("App Component", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((_url, options) => {
        // Check the method used
        if (options.method === "DELETE") {
          return Promise.resolve({
            ok: true,
            json: async () => ({ data: "dummy" }),
          });
        }
        if (options.method == "GET") {
          return Promise.resolve({
            ok: true,
            json: async () => ({ data: "dummy" }),
          });
        }
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals(); // Restore the original fetch function after each test
  });
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

  // TESTS FETCH POST
  it("fetches posts using GET operation when the fetch button is clicked", async () => {
    render(<App />);

    const fetchButton = screen.getByRole("button", { name: /Fetch Post/i });
    fireEvent.click(fetchButton);

    // Check if fetch was called with the correct URL (replace with your actual API URL)
    expect(fetch).toHaveBeenCalledWith(
      "https://mstdn.plus/api/v1/accounts/114027501803173344/statuses", // Replace with your correct URL
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );
  });

  // TESTS CREATE POST
  it("performs the POST operation when the create button is clicked", async () => {
    const MASTODON_INSTANCE = "https://mstdn.plus"; // Your instance URL
    const newPostContent = "This is a new post."; // Example post content

    // Mock the fetch response for the create post request
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: "dummy" }), // Mock the API response
      })
    );

    render(<App />);

    // Simulate typing the post content into a text field (assuming a text input for the post content)
    const postContentInput = screen.getByPlaceholderText(
      "Write your post here..."
    );
    fireEvent.change(postContentInput, { target: { value: newPostContent } });

    // Simulate clicking the create button
    const createButton = screen.getByRole("button", { name: /Create Post/i });
    fireEvent.click(createButton);

    // Check if fetch was called with the correct URL, method, and data
    expect(fetch).toHaveBeenCalledWith(
      `${MASTODON_INSTANCE}/api/v1/statuses`, // The API endpoint for creating a post
      expect.objectContaining({
        method: "POST", // POST method for creating a post
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"), // Authorization header
          "Content-Type": "application/json", // Content type for JSON payload
        }),
        body: JSON.stringify({
          status: newPostContent, // The post content being sent
        }),
      })
    );
  });

  // TEST DELETE POST
  it("performs the DELETE operation when confirmed in the modal", async () => {
    render(<App />);
    const MASTODON_INSTANCE = "https://mstdn.plus"; // Your instance URL

    // Enter post ID in delete input
    const deletePostInput = screen.getAllByPlaceholderText("Enter Post ID")[1];
    fireEvent.change(deletePostInput, { target: { value: "123" } });

    // Click the delete button to open the confirmation modal
    const deleteButton = screen.getByRole("button", { name: /Delete Post/i });
    fireEvent.click(deleteButton);

    // Wait for the modal and confirm button to appear
    // const confirmButton = await screen.findByRole("button", {
    //   name: /Confirm/i,
    // });
    const confirmButton = screen.getByRole("button", { name: /Yes, Delete/i });
    await fireEvent.click(confirmButton);

    // Click the confirm button in the modal
    fireEvent.click(confirmButton);

    // Ensure fetch was called with correct DELETE method and URL
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        `${MASTODON_INSTANCE}/api/v1/statuses/123`,
        expect.objectContaining({
          method: "DELETE",
          headers: expect.objectContaining({
            Authorization: expect.stringContaining("Bearer"),
          }),
        })
      )
    );
  });
});
