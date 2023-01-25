import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from './components/Select';

import { Store } from './Store';
import getError from './utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

const UserSaveData = () => {
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store); /////
  const { sectoSaveInfo } = state; /////

  const [name, setName] = useState(sectoSaveInfo.name);
  const [sectors, setSectors] = useState(sectoSaveInfo.sectors);
  const [agreeToTerms, setAgreeToTerm] = useState(sectoSaveInfo.agreeToTerms);

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/${sectoSaveInfo._id}`, {
        _id: sectoSaveInfo._id,
        name,
        sectors,
        agreeToTerms,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      ctxDispatch({ type: 'SECTOR_SAVE_CONFIRM', payload: data });
      localStorage.setItem('savesector', JSON.stringify(data));
      toast.success('Update sector successfully');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL' });
      toast.error(getError(error));
    }
    navigate('/');
  };

  return (
    <Container>
      <ToastContainer position="bottom-center" limit={1} />
      <div className='form-style'>

      <h4>
        Please update your name and pick the Sectors you are currently involved
        in.
      </h4>
      <Form onSubmit={updateHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name :</Form.Label>
          <Form.Control
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="sectors">
          <Form.Label>Sectors</Form.Label>
          <Select
            value={sectors}
            onChange={(e) => setSectors(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="checkbox">
          <Form.Check
            required
            type="checkbox"
            checked={agreeToTerms}
            id="custom-checkbox"
            label="Agree to terms"
            onChange={(e) => setAgreeToTerm(e.target.checked)}
          />
        </Form.Group>
        <div>
          <Button type="submit">Update Changes</Button>
        </div>
      </Form>
      </div>
    </Container>
  );
};

export default UserSaveData;
