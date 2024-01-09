import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { signIn } from "next-auth/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => jest.fn(),
      replace: () => jest.fn(),
    };
  },
}));

describe("LoginPage", () => {
  it("should display errors for invalid email and password", async () => {
    render(<LoginPage />, { wrapper: MemoryRouterProvider });

    const submitButton = screen.getByText("Login");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 6 characters long")
      ).toBeInTheDocument();
    });
  });

  it("should navigate to home page on successful login", async () => {
    render(<LoginPage />, { wrapper: MemoryRouterProvider });

    const submitButton = screen.getByText("Login");

    const emailInput = screen.getByPlaceholderText("user@email.com");
    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(emailInput, {
      target: { value: "chistoperez@gmail.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "chistoperez@gmail.com",
        password: "123456",
        redirect: false,
      });
      expect(mockRouter.asPath).toEqual("/");
    });
  });
});
