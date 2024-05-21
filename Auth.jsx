import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../redux/actions/auth";

const Auth = () => {
  const [user, setUser] = useState({
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    login: "",
    password: "",
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleChangeInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    // Clear the error message when the user starts typing in the field
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input fields
    let newErrors = {};
    if (user.login.trim().length === 0) {
      newErrors.login = "Логин cannot be empty.";
    }
    if (user.password.trim().length === 0) {
      newErrors.password = "Пароль cannot be empty.";
    }

    // If there are any errors, update the state and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If there are no errors, dispatch the authUser action
    dispatch(authUser(user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="login"
        value={user.login}
        onChange={handleChangeInput}
        placeholder="Логин"
      />
      {errors.login && <p>{errors.login}</p>}
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChangeInput}
        placeholder="Пароль"
      />
      {errors.password && <p>{errors.password}</p>}
      {error && <p>{error}</p>}
      <button type="submit">Войти</button>
    </form>
  );
};

export default Auth;
