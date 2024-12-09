import React from "react";
import { render, screen } from "@testing-library/react";

import ApplicantDetailsPage from "../ApplicantDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders applicantDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ApplicantDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("applicantDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("applicantDetails-add-button")).toBeInTheDocument();
});
