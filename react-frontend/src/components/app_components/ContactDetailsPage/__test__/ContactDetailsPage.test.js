import React from "react";
import { render, screen } from "@testing-library/react";

import ContactDetailsPage from "../ContactDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders contactDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ContactDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("contactDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("contactDetails-add-button")).toBeInTheDocument();
});
