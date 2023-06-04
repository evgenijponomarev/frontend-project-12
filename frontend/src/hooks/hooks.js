import { useContext } from 'react';

import { AuthContext, ChatApiContext } from '../context/context.js';

const useAuth = () => useContext(AuthContext);

const useChatApi = () => useContext(ChatApiContext);

export { useAuth, useChatApi };
