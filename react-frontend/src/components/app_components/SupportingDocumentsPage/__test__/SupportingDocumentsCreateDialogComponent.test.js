import React from "react";
import { render, screen } from "@testing-library/react";

import SupportingDocumentsCreateDialogComponent from "../SupportingDocumentsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders supportingDocuments create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SupportingDocumentsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("supportingDocuments-create-dialog-component")).toBeInTheDocument();
});
