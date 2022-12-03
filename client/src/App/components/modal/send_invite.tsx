import { Button, Grid, Modal, TextField } from '@mui/material';
import { CalendarApi } from '@fullcalendar/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { env } from '../../config/env';
import useAuth from '../../hooks/useAuth';
import '../../styles/modal.scss'

export enum EventType {
  ARRANGMENT = 'ARRANGEMENT',
  TASK = 'TASK',
  REMINDER = 'REMINDER',
}

export const EventTypes = {
  [EventType.ARRANGMENT]: 'ARRANGEMENT',
  [EventType.TASK]: 'TASK',
  [EventType.REMINDER]: 'REMINDER',
};

export type EventAttributes = {
  backgroundColor: string;
  textColor: string;
  type: EventType;
};

export const ListColorsCard: EventAttributes[] = [
  { backgroundColor: '#d50000', textColor: '#ffffff', type: EventType.REMINDER },
  { backgroundColor: '#039be5', textColor: '#ffffff', type: EventType.TASK },
  { backgroundColor: '#9370DB', textColor: '#ffffff', type: EventType.ARRANGMENT },
];

interface ICardColor {
  backgroundColor: string;
  textColor: string;
}

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
  eventInfo,
  isEditCard,
  calendarId,
}: IModalInfosEventCalendaryProps) => {
  const [title, setTitle] = useState<string>('');

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
          label={'User email'}
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
          {'Send request'}
        </Button>

      </div>
    </Modal>
  );
};
