import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammesPage from "../ProgrammesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programmes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgrammesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("programmes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("programmes-add-button")).toBeInTheDocument();
});
