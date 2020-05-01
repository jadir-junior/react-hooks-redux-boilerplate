import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationActions, userActions } from '../../_actions';

function HomePage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getUser());
  }, [dispatch]);

  function logout() {
    dispatch(authenticationActions.logout());
  }

  return (
    <div>
      <h1>Home</h1>
      <div>Id: {user._id}</div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export { HomePage };
