import React from "react";
import { render, screen } from "@testing-library/react";

import SupportingDocumentsPage from "../SupportingDocumentsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders supportingDocuments page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SupportingDocumentsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("supportingDocuments-datatable")).toBeInTheDocument();
    expect(screen.getByRole("supportingDocuments-add-button")).toBeInTheDocument();
});
