import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Block, Form, Input, Label, Wrapper, Title } from "./style";
import {
  updateUsername,
  updatePassword,
  clearError,
  updateError,
  loginUser,
} from "../../redux/slices/authorizationSlice";
import building from "../../image/Building.svg";

const Authorization = () => {
  const { username, password, error, loginStatus } = useSelector(
    (state) => state.authorization
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    dispatch(updateUsername(event.target.value));
  };

  const handlePasswordChange = (event) => {
    dispatch(updatePassword(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      dispatch(clearError());

      return dispatch(updateError("Все поля обязательны для заполнения"));
    }

    login();
  };

  const login = async () => {
    const values = { username, password };

    const data = await dispatch(loginUser(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  useEffect(() => {
    if (loginStatus === "fulfilled") {
      navigate("/");
    }
  }, [loginStatus, navigate]);

  return (
    <Wrapper>
      <img src={building} alt=""></img>
      <Form onSubmit={handleSubmit}>
        <Title>Авторизация</Title>
        <Block>
          <Label htmlFor="username">Логин:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder="Логин"
          />
        </Block>
        <Block>
          <Label htmlFor="password">Пароль:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Пароль"
          />
        </Block>
        {error && <div>{error}</div>}
        <Block>
          <Button type="submit">Войти</Button>
        </Block>
      </Form>
    </Wrapper>
  );
};

export default Authorization;
