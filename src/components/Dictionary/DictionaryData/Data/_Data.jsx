
import style from './_Data.module.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import EditObject from '../EditObject/';
import DeleteObject from '../DeleteObject/';

export const _Data = ({ item }) => {

  const [showEdit, setEditShow] = useState(false);
  const [showDelete, setDeleteShow] = useState(false);
  const editObject = (item) => setEditShow(true);
  const deleteObject = (item) => setDeleteShow(true);
  const handleEditClose = () => setEditShow(false);
  const handleDeleteClose = () => setDeleteShow(false);

  return (
    <tr>
      <td>{item.object1}</td>
      <td>{item.square}</td>
      <td>
        <IconButton style={{width:'auto'}} color='primary' aria-label="edit" title='Редактировать' onClick={editObject}>
          <EditIcon />
        </IconButton>
        <IconButton style={{width:'auto'}} color='error' aria-label="delete" title='Удалить' onClick={deleteObject}>
          <DeleteIcon />
        </IconButton>
      </td>
      <EditObject handleClose={handleEditClose} show={showEdit} item={item} />
      <DeleteObject handleClose={handleDeleteClose} show={showDelete} item={item} />
    </tr>
  );
};
