import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Header";
import FormData from "../../FormData";
import CustomInput from "../../CustomInput";
import useAction from "../../../hooks/useAction";
import { StyledWrapper } from "./style";

const Login = () => {
  const [user, setUser] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { loginUser } = useAction();
  const history = useHistory();

  const handleChangeInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(user);
      history.push("/"); // Перенаправление на главную страницу приложения
    } catch (error) {
      setError("Неверный логин или пароль, попробуйте ещё раз");
    }
  };

  return (
    <StyledWrapper>
      <Header title="Авторизоваться в системе" />
      <FormData
        handleSubmit={handleSubmit}
        title="Авторизация"
        buttonText="Авторизоваться"
        linkText="Зарегистрироваться"
      >
        <CustomInput
          error={error}
          name="login"
          type="text"
          value={user.login}
          handleChangeInput={handleChangeInput}
          placeholder="Логин"
          label="Логин:"
          required
        />
        <CustomInput
          error={error}
          name="password"
          type="password"
          value={user.password}
          handleChangeInput={handleChangeInput}
          placeholder="Пароль"
          label="Пароль:"
          required
        />
      </FormData>
    </StyledWrapper>
  );
};

export default Login;
