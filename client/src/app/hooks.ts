import * as React from 'react';
import uuid from 'uuid';

const USER_ID_KEY = 'USER_ID';

export const useUserId = () => {
  const [userId, setUserId] = React.useState(localStorage.getItem('USER_ID'));

  if (!userId) {
    const id = uuid.v4();
    localStorage.setItem(USER_ID_KEY, id);
    setUserId(id);

    return id
  }

  return userId;
}