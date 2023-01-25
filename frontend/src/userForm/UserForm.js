import React, { useContext, useEffect, useState } from 'react';
import Select from '../components/Select';
import Container from '../components/Container';
import { Button, Form } from 'react-bootstrap';
import { Store } from '../Store.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import getError from '../utils';

const UserForm = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { sectoSaveInfo, userUpdateData } = state;
  const [show, setShow] = useState(false);

  const [name, setName] = useState(
    sectoSaveInfo.name || userUpdateData.user.name || ''
  );
  const [sectors, setSectors] = useState(
    sectoSaveInfo.sectors || userUpdateData.user.sectors || ''
  );
  const [agreeToTerms, setAgreeToTerms] = useState(
    sectoSaveInfo.agreeToTerms || userUpdateData.user.agreeToTerms || false
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/usersectordata', {
        name,
        sectors,
        agreeToTerms,
      });
      ctxDispatch({ type: 'SECTOR_SAVE_CONFIRM', payload: data });
      localStorage.setItem('savesector', JSON.stringify(data));
      toast.success('Save sector successfully');
    } catch (error) {
      toast.error(getError(error));
    }
    setShow(!show);
  };
  useEffect(() => {
    setName('');
    setSectors('');
    setAgreeToTerms(false);
  }, [navigate]);
  const stateControl = () => {
    navigate('/userupdate');
  };

  return (
    <>
      <Container>
        <ToastContainer position="top-center" limit={1} />
        <div className="form-style">
          <h4>
            Please enter your name and pick the Sectors you are currently
            involved in.
          </h4>
          <Form onSubmit={handleSubmit}>
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
                chaked={agreeToTerms}
                id="custom-checkbox"
                label="Agree to terms"
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
            </Form.Group>
            <div>
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </div>
      </Container>
      {show ? (
        <div className="table-style">
          <div>
            <table className="t-style">
              <tr>
                <th>Name</th>
                <th>Sectors</th>
                <th>Agree To Terms</th>
              </tr>
              <tr>
                <td>{sectoSaveInfo.name}</td>
                <td>{sectoSaveInfo.sectors}</td>
                {sectoSaveInfo.agreeToTerms ? <td>Yes</td> : <td>NO</td>}
              </tr>
            </table>
          </div>

          <div className="btn-style">
            <Button onClick={stateControl}>Edit</Button>
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default UserForm;
