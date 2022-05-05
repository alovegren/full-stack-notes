import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  login,
  setToken,
  setUser,
  setAndHideErrorMessage,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        username, password
      });

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );

      setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setAndHideErrorMessage('Wrong credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setAndHideErrorMessage: PropTypes.func.isRequired,
};

export default LoginForm;