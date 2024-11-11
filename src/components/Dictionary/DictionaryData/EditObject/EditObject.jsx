import style from './EditObject.module.css';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEditObjectMutation } from '../../../../services/getData';
import { useForm } from 'react-hook-form';

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

export const EditObject = ({ show, handleClose, item }) => {
  const [editObject] = useEditObjectMutation();
  
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  
  const onFormSubmit = async (data) => {
    await editObject(data)
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
          Редактировать запись
        </Typography>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <input type={'hidden'} {...register("Id")} value={item.id}></input>
          <div className='row' style={{ marginTop: '5vh', marginBottom: '5vh' }}>
            <div className='col-md-8'>
              <TextField
                {...register("ObjectName")}
                label="Объект"
                required
                style={{width:'100%'}}
                defaultValue={item.object1}
              />
            </div>
            <div className='col-md-4'>
              <TextField
                {...register("ObjectSquare")}
                type='number'
                label="Площадь"
                required
                defaultValue={item.square}
              />
            </div>
          </div>
          <Stack spacing={1} direction="row" justifyContent="center">
            <Button variant="contained" color='info' type='submit' endIcon={<EditIcon />}>Редактировать</Button>
            <Button variant="outlined" onClick={handleClose}>Отмена</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
