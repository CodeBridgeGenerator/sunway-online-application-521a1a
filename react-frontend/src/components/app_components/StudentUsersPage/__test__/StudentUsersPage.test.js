import React from "react";
import { render, screen } from "@testing-library/react";

import StudentUsersPage from "../StudentUsersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders studentUsers page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StudentUsersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("studentUsers-datatable")).toBeInTheDocument();
    expect(screen.getByRole("studentUsers-add-button")).toBeInTheDocument();
});
