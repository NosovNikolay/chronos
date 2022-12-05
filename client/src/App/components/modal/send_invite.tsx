import { Button, Grid, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import '../../styles/modal.scss';

export enum UserType {
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
}

interface UsetAttributes {
  backgroundColor: string;
  type: UserType;
}

export const ListUserTypes: UsetAttributes[] = [
  { backgroundColor: 'grey', type: UserType.GUEST },
  { backgroundColor: '#d50000', type: UserType.ADMIN },
];

interface IModalInfoEventCalendaryProps {
  open: boolean;
  handleClose: () => void;
  eventInfo: any;
  isEditCard: boolean;
  calendarId: string;
}

export const InviteToCalendarModal = ({ handleClose, open }: IModalInfoEventCalendaryProps) => {
  const [title, setTitle] = useState<string>('');
  const [userType, setUserType] = useState<UsetAttributes>({
    backgroundColor: 'grey',
    type: UserType.GUEST,
  });

  const handleInvite = async () => {
    try {
      toast.success('Send request for user: ' + title + ' as ' + userType.type);
    } catch (error) {
      toast.error('');
    } finally {
      setTitle('');
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className='box'>
        <TextField
          label={'User email'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <div className='select_color_div'>
          {ListUserTypes.map((type, index) => (
            <Grid style={{ margin: '10px' }} container spacing={2} key={index}>
              <div
                className='backgroundColorSelect'
                style={{ backgroundColor: type.backgroundColor }}
                onClick={() => setUserType(type)}
              >
                <input type='radio' name='cardColor' />
              </div>
              <p style={{ marginLeft: '10px' }}>{UserType[type.type]}</p>
            </Grid>
          ))}
        </div>
        <Button variant='contained' fullWidth onClick={handleInvite} sx={{ marginTop: '0.5rem' }}>
          {'Send request'}
        </Button>
      </div>
    </Modal>
  );
};
