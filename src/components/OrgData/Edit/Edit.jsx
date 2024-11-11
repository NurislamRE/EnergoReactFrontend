
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEditOrgDataMutation } from '../../../services/getData';
import { useForm } from 'react-hook-form';

const mStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Edit = ({ show, handleClose, item }) => {
  console.log(item);
  const [edit] = useEditOrgDataMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onFormSubmit = async (data) => {
    await edit(data)
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
          <input type={'hidden'} {...register("Year")} value={item.year}></input>
          <input type={'hidden'} {...register("Period")} value={item.period}></input>
          <input type={'hidden'} {...register("EnergyTypeId")} value={item.energyTypeId}></input>
          <input type={'hidden'} {...register("ObjectId")} value={item.objectId}></input>
          <div className='row' style={{ marginTop: '5vh', marginBottom: '5vh' }}>
            <div className='col-md-3'>
              <TextField
                {...register("PlanValue")}
                label="План(квт*час)"
                required
                style={{ width: '100%' }}
                defaultValue={item.planValue}
              />
            </div>
            <div className='col-md-3'>
              <TextField
                {...register("PlanSum")}
                label="План сумма(тыс.тенге)"
                required
                defaultValue={item.planSum}
              />
            </div>
            <div className='col-md-3'>
              <TextField
                {...register("Value")}
                label="Факт(квт*час)"
                required
                style={{ width: '100%' }}
                defaultValue={item.value}
              />
            </div>
            <div className='col-md-3'>
              <TextField
                {...register("Sum")}
                label="Факт сумма(тыс.тенге)"
                required
                defaultValue={item.sum}
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
