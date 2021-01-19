import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render } from '@testing-library/react';
import Component from '../UploadProfilePicture';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

let store: Store;

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const initialState = {
  users: {
    uploadedImage: [
      {
        path: 'path',
        fieldName: 'images'
      }
    ],
    uploadProfilePictureLoading: false,
    errors: {
      message: 'error message'
    }
  },
  messages: {
    message: 'uploaded',
    error: 'error'
  }
};
const props = {
  setIsUploaded: jest.fn(),
  closeModal: jest.fn(),
  setUploadedImage: jest.fn()
};
describe('UploadProfilePicture', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
      div
    );
  });

  it('should create snapshot', () => {
    const tree = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });
});
