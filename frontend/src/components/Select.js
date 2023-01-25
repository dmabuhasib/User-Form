import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { Form } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESSFUL':
      return { ...state, sectorData: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const Select = ({ onChange, value }) => {
  const [{ loading, error, sectorData }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    sectorData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/sectors');
        dispatch({ type: 'FETCH_SUCCESSFUL', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form.Select required onChange={onChange}>
          {value ? (
            <option>{value}</option>
          ) : (
            <option>-- Select Sectors --</option>
          )}

          {sectorData.map((index) => (
            <>
              <option key={index._id}>{index.sectors}</option>
              {index.sectorItems.map((index) => (
                <>
                  <option key={index._id}>
                    &nbsp;&nbsp;{index.sectorItem}
                  </option>
                  {index.subSectorItems.map((index) => (
                    <option key={index._id}>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {index.subSectorItem}
                    </option>
                  ))}
                </>
              ))}
            </>
          ))}
        </Form.Select>
      )}
    </div>
  );
};

export default Select;
