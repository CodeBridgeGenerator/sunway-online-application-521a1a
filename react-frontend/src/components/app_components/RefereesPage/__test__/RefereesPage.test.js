import React from "react";
import { render, screen } from "@testing-library/react";

import RefereesPage from "../RefereesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders referees page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RefereesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("referees-datatable")).toBeInTheDocument();
    expect(screen.getByRole("referees-add-button")).toBeInTheDocument();
});
