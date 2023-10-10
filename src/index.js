import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { Toaster } from "react-hot-toast";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import SignIn from "views/auth/signIn";
import Register from "views/auth/register";
import ForgotPassword from "views/auth/forgot-password";
import { AuthProvider } from "contexts/authContext";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <HashRouter>
          <AuthProvider>
            <Switch>
              <Route path={`/auth/sign-in`} component={SignIn} />
              <Route path={`/auth/register`} component={Register} />
              <Route
                path={`/auth/forgot-password`}
                component={ForgotPassword}
              />
              <Route path={`/admin`} component={AdminLayout} />
              <Route path={`/rtl`} component={RtlLayout} />
              <Redirect from="/" to="/admin" />
            </Switch>
          </AuthProvider>
        </HashRouter>
      </ThemeEditorProvider>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
