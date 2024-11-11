import style from './DictionaryData.module.css';
import { useState } from 'react';
import { useGetDictionaryDataQuery } from '../../../services/getData';
import AddObject from './AddObject/';
import _Data from './Data/'
import { Button } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export const DictionaryData = ({ organization }) => {
  const { data: reportData } = useGetDictionaryDataQuery(organization);
  const [show, setShow] = useState(false);
  const addObject = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className='row' style={{ paddingLeft: '5vh', paddingTop: '5vh' }}>
      {/* <div className='col-md-12' style={{ marginBottom: '1vh', float: 'left' }}>
        <Button color='primary' variant='contained' onClick={addObject}>
          <PlaylistAddIcon />
          Добавить
        </Button>
      </div> */}
      <div className='col-md-12'>
        <table className='table table-hover' id="my-table" style={{ width: '70%' }}>
          <thead>
            <tr>
              <th>Объекты</th>
              <th>Площадь (кв.м)</th>
              <th>
                <span>
                  <Button color='info' variant='contained' onClick={addObject}>
                    <PlaylistAddIcon />
                    Добавить
                  </Button>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {reportData && reportData.map((item, index) => (
              <_Data key={`data-123-${index}`}
                item={item}
              />
            ))}
          </tbody>
        </table>
      </div>

      <AddObject
        handleClose={handleClose}
        show={show}
        organizationId={organization}
      />
    </div>
  );
};
