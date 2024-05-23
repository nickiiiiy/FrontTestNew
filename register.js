// Чтобы добавить Snackbar из Material-UI в ваш код, вам нужно будет установить пакет `@material-ui/core`. Если вы еще этого не сделали, выполните следующую команду в вашем терминале:

// ```bash
// npm install @material-ui/core
// ```

// Теперь вы можете использовать компонент Snackbar в вашем компоненте `Registration`. Вот как это может выглядеть:

import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import Header from "../../Header";
import FormData from "../../FormData";
import CustomInput from "../../CustomInput";
import useAction from "../../../hooks/useAction";
import { validateInput } from "../../../helpers/validatePassword";
import { StyledWrapper } from "./style";

const Registration = () => {
  const [newUser, setNewUser] = useState({
    login: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState({
    loginError: "",
    passwordError: "",
    passwordConfirmError: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false); // Состояние для Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Сообщение для Snackbar

  const { registerUser } = useAction();

  const handleChangeInput = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ... ваш код проверки валидности формы ...

    try {
      await registerUser({
        ...newUser,
        login: newUser.login.trim(),
        password: newUser.password.trim(),
      });

      // Если регистрация прошла успешно, скрываем Snackbar
      setOpenSnackbar(false);
    } catch (error) {
      // Если произошла ошибка при регистрации, показываем Snackbar
      setOpenSnackbar(true);
      setSnackbarMessage(
        `Пользователь с логином ${newUser.login} уже существует. Пожалуйста, выберите другой логин.`
      );
    }

    // ... ваш код очистки формы и состояния ошибок ...
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <StyledWrapper>
      <Header title="Зарегистрироваться в системе" />
      <FormData
        handleSubmit={handleSubmit}
        title="Регистрация"
        buttonText="Зарегистрироваться"
        linkText="Авторизоваться"
        linkUrl="/authorization"
      >
        <CustomInput
          error={error}
          name="login"
          type="text"
          value={newUser.login}
          handleChangeInput={handleChangeInput}
          placeholder="Логин"
          label="Логин:"
          required
        />
        <CustomInput
          error={error}
          name="password"
          type="password"
          value={newUser.password}
          handleChangeInput={handleChangeInput}
          placeholder="Пароль"
          label="Пароль:"
          required
        />
        <CustomInput
          error={error}
          name="passwordConfirm"
          type="password"
          value={newUser.passwordConfirm}
          handleChangeInput={handleChangeInput}
          placeholder="Повторить пароль"
          label="Повторить пароль:"
          required
        />
      </FormData>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={<span id="message-id">{snackbarMessage}</span>}
      />
    </StyledWrapper>
  );
};

export default Registration;

// В этом примере, когда произошла ошибка при регистрации (например, пользователь с таким логином уже существует), Snackbar будет отображаться на экране. Пользователь сможет закрыть его, либо через 6 секунд, после чего он автоматически скроется.

// Обратите внимание, что в функции `handleSubmit` я добавил обработку ошибок, которая будет срабатывать, когда сервис регистрации вернет ошибку. В этом случае мы устанавливаем состояние `openSnackbar` в `true` и устанавливаем сообщение для Snackbar, которое будет содержать информацию о том, что пользователь с таким логином уже существует.
