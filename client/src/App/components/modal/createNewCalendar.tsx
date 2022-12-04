import { Button, Grid, Modal, TextField } from '@mui/material';
import { CalendarApi } from '@fullcalendar/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { env } from '../../config/env';
import useAuth from '../../hooks/useAuth';
import '../../styles/modal.scss'

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

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose: () => void;
  eventInfo: any;
  isEditCard: boolean;
  calendarId: string;
}

export const InviteToCalendarModal = ({
  handleClose,
  open,
}: IModalInfosEventCalendaryProps) => {
  const [title, setTitle] = useState<string>('');
  const [userType, setUserType] = useState<UsetAttributes>({
    backgroundColor: 'grey',
    type: UserType.GUEST
  });

  const handleUpdatedEvent = async () => {
    try {
      console.log('add friend');
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
          label={'Calendar Title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Button
          variant='contained'
          fullWidth
          onClick={handleUpdatedEvent}
          sx={{ marginTop: '0.5rem' }}
        >
          {'Create'}
        </Button>

      </div>
    </Modal>
  );
};
