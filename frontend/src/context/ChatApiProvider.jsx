import React from 'react';
import { io } from 'socket.io-client';
import store, { actions } from '../slices/index.js';
import { ChatApiContext } from './context.js';

const socket = io();

const ChatApiProvider = ({ children }) => {
  React.useEffect(() => {
    socket.on('newMessage', (payload) => store.dispatch(actions.addMessage(payload)));
    socket.on('newChannel', (payload) => store.dispatch(actions.addChannel(payload)));
    socket.on('removeChannel', (payload) => store.dispatch(actions.deleteChannel(payload)));
    socket.on('renameChannel', (payload) => store.dispatch(actions.renameChannel(payload)));
  }, []);

  const sendMessage = React.useCallback((message) => (
    new Promise((resolve, reject) => {
      socket.emit('newMessage', message, (response) => {
        if (response.error) {
          console.error(response.error);
          reject();
        } else {
          resolve();
        }
      });
    })
  ), []);

  const newChannel = React.useCallback((name) => (
    new Promise((resolve, reject) => {
      socket.emit('newChannel', { name }, (response) => {
        if (response.error) {
          console.error(response.error);
          reject();
        } else {
          resolve(response.data.id);
        }
      });
    })
  ), []);

  const removeChannel = React.useCallback((id) => (
    new Promise((resolve, reject) => {
      socket.emit('removeChannel', { id }, (response) => {
        if (response.error) {
          console.error(response.error);
          reject();
        } else {
          resolve();
        }
      });
    })
  ), []);

  const renameChannel = React.useCallback(({ name, id }) => (
    new Promise((resolve, reject) => {
      socket.emit('renameChannel', { name, id }, (response) => {
        if (response.error) {
          console.error(response.error);
          reject();
        } else {
          resolve();
        }
      });
    })
  ), []);

  const providedData = React.useMemo(() => ({
    sendMessage,
    newChannel,
    removeChannel,
    renameChannel,
  }), [sendMessage, newChannel, removeChannel, renameChannel]);

  return (
    <ChatApiContext.Provider value={providedData}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
