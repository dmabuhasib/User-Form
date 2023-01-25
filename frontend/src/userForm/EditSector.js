import React, { useContext, useEffect, useState } from 'react';
import Select from '../components/Select';
import Container from '../components/Container';
import { Button, Form } from 'react-bootstrap';
import { Store } from '../Store.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import getError from '../utils';

const EditSector = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userSectorInfo } = state;
  

  const [name, setName] = useState(userSectorInfo.name || '');
  const [sectors, setSectors] = useState(userSectorInfo.sectors || '');
  const [agreeToTerms, setAgreeToTerms] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/usersectordata', {
        name,
        sectors,
        agreeToTerms,
      });
      ctxDispatch({ type: 'USER_SAVE_DATA', payload: data });
      localStorage.setItem('savesector', JSON.stringify(data));
      toast.success('Save sector successfully !');
      navigate('/usersectordata');
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
  
  );
};

export default EditSector;