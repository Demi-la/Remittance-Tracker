import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./login.css"

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = ({ handleSubmit }) => {
  return (
    <div className="loginContainer">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors, resetForm }) =>
          handleSubmit(values, { setSubmitting, setErrors, resetForm })
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="input"
              />
              <p style={{ color: "red" }}>
                <ErrorMessage name="email" />
              </p>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="input"
              />
              <p style={{ color: "red" }}>
                <ErrorMessage name="password" />
              </p>
            </div>
            <button
              className="loginButton"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
