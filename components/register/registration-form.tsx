import { userInfo } from 'os';
import React, { useState } from 'react';
import { UserInfo } from '../../types';

const RegistrationForm: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const formSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const info: UserInfo = {
      userName,
      email,
    };
  };

  const userNameChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const emailChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <label htmlFor="name">Your username</label>
      <input type="text" value={userName} onChange={userNameChangeHandler} />
      <label htmlFor="email">Your email</label>
      <input type="email" value={email} onChange={emailChangeHandler} />
      <button>Submit</button>
    </form>
  );
};

export default RegistrationForm;
