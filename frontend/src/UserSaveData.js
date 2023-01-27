import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

  const [show, setShow] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { sectoSaveInfo, userUpdateData } = state;
  const { user } = userUpdateData;

  const [name, setName] = useState(sectoSaveInfo.name || user.name || '');
  const [sectors, setSectors] = useState(
    sectoSaveInfo.sectors || user.sectors || ''
  );
  const [agreeToTerms, setAgreeToTerm] = useState(
    sectoSaveInfo.agreeToTerms || user.agreeToTerms || false
  );

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
      ctxDispatch({ type: 'SAVE_UPDATE_DATA', payload: data });
      localStorage.setItem('updatedata', JSON.stringify(data));
      toast.success('Update sector successfully');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL' });
      toast.error(getError(error));
    }
    localStorage.removeItem('savesector');
    setShow(true);
  };

  return (
    <>
      <Container>
        <div className="form-style">
          <h4>
            Please update your name and pick the Sectors you are currently
            involved in.
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
            <ToastContainer position="top-center" limit={1} />
          </Form>
        </div>
      </Container>
      {show ? (
        <div className="table-style">
          <div>
            <h3 style={{textAlign:'center'}}>Your Updated data here !</h3>
            <table className="t-style">
              <tr>
                <th>Name</th>
                <th>Sectors</th>
                <th>Agree To Terms</th>
              </tr>
              <tr>
                <td>{user.name}</td>
                <td>{user.sectors}</td>
                {user.agreeToTerms ? <td>Yes</td> : <td>NO</td>}
              </tr>
            </table>
          </div>
          <Link to="/">
            <div className="btn-style">
              <Button>Go to Back</Button>
            </div>
          </Link>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default UserSaveData;
