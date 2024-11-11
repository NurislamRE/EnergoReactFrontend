import style from './DeleteObject.module.css';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useDeleteObjectMutation } from '../../../../services/getData';

const mStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const DeleteObject = ({ show, handleClose, item }) => {
  const [deleteObject] = useDeleteObjectMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onFormSubmit = async (data) => {
    data.ObjectName = item.object1;
    data.ObjectSquare = item.square;
    console.log(data);
    await deleteObject(data)
      .unwrap()
      .then(() => {
        handleClose();
        reset();
      })
      .catch((error) => console.error(error));
  }

  return (
    <Modal open={show} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={mStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
          Удалить запись
        </Typography>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <input type={'hidden'} {...register("Id")} value={item.id}></input>
          <div className='row' style={{ marginTop: '5vh', marginBottom: '5vh' }}>
            <div className='col-md-8'>
              <TextField                
                disabled
                label="Объект"
                style={{ width: '100%' }}
                defaultValue={item.object1}
              />
            </div>
            <div className='col-md-4'>
              <TextField
                disabled
                type='number'
                label="Площадь"
                defaultValue={item.square}
              />
            </div>
          </div>
          <Stack spacing={1} direction="row" justifyContent="center">
            <Button variant="contained" color='error' type='submit' endIcon={<DeleteIcon />}>Удалить</Button>
            <Button variant="outlined" onClick={handleClose}>Отмена</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
