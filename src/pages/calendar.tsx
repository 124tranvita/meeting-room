import { FC } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import {
  SignInButton,
  SignOutButton,
  WelcomeUser,
} from "../components/ms-authentication";
import Calendar from "../components/calendar";
import { EventContextProvider } from "../context";

const CalendarPages: FC = () => {
  return (
    <EventContextProvider>
      <AuthenticatedTemplate>
        <p>This will only render if a user is signed-in.</p>
        <WelcomeUser />
        <SignOutButton />
        <br />
        <Calendar />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>This will only render if a user is not signed-in.</p>
        <SignInButton />
      </UnauthenticatedTemplate>
    </EventContextProvider>
  );
};

export default CalendarPages;
