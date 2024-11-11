import style from './AddObject.module.css';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAddObjectMutation } from '../../../../services/getData';
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

export const AddObject = ({ handleClose, show, organizationId }) => {

  const [addObject] = useAddObjectMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onFormSubmit = async (data) => {
    data.OrgId = organizationId;
    await addObject(data)
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
          Добавить запись
        </Typography>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className='row' style={{ marginTop: '5vh', marginBottom: '5vh' }}>
            <div className='col-md-8'>
              <TextField
                {...register("ObjectName")}
                id="outlined-basic"
                label="Объект"
                style={{width:'100%'}}
                required
                variant="outlined"
              />
            </div>
            <div className='col-md-4'>
              <TextField
                {...register("ObjectSquare")}
                id="outlined-basic"
                type='number'
                label="Площадь"
                required
                variant="outlined"
              />
            </div>
          </div>
          <Stack spacing={1} direction="row" justifyContent="center">
            <Button color='primary' variant="contained" endIcon={<AddIcon />} type={'submit'}>Добавить</Button>
            <Button variant="outlined" onClick={handleClose}>Отмена</Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
