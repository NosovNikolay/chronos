import { Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { env } from '../../config/env';
import useAuth from '../../hooks/useAuth';
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
  const { token } = useAuth();
  const handleCreateCalendar = async () => {
    axios
      .post(
        `${env.VITE_APP_API}/calendars`,
        {
          title: title,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      .then(() => {
        toast.success('Calendar successfully created');
      })
      .catch(() => {
        toast.error('Ooops sometheng went wrong');
      })
      .finally(() => {
        setTitle('');
        handleClose();
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className='box'>
        <TextField
          label={'Calendar Title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Button
          variant='contained'
          fullWidth
          onClick={handleCreateCalendar}
          sx={{ marginTop: '0.5rem' }}
        >
          {'Create'}
        </Button>
      </div>
    </Modal>
  );
};
