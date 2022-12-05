import { Button, Grid, Modal, TextField } from '@mui/material';
import { CalendarApi } from '@fullcalendar/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { env } from '../../config/env';
import useAuth from '../../hooks/useAuth';
import '../../styles/modal.scss';

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

interface IModalInfoEventCalendaryProps {
  open: boolean;
  handleClose: () => void;
  eventInfo: any;
  isEditCard: boolean;
  calendarId: string;
}

export const ModalInfoEventCalendar = ({
  handleClose,
  open,
  eventInfo,
  isEditCard,
  calendarId,
}: IModalInfoEventCalendaryProps) => {
  const [title, setTitle] = useState<string>('');
  const [cardColor, setCardColor] = useState<ICardColor>({
    backgroundColor: '#039be5',
    textColor: '#ffffff',
  });
  const { token } = useAuth();

  useEffect(() => {
    if (isEditCard) {
      setTitle(eventInfo?.event?.title);
      setCardColor({
        backgroundColor: eventInfo?.event?.backgroundColor,
        textColor: eventInfo?.event?.textColor,
      });
    } else {
      setTitle('');
      setCardColor({ backgroundColor: '#039be5', textColor: '#ffffff' });
    }
  }, [eventInfo, isEditCard]);

  const handleSelectCardColor = (color: EventAttributes) => {
    setCardColor({
      backgroundColor: color.backgroundColor,
      textColor: color.textColor,
    });
  };

  const handleAddedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfo.view.calendar;
      axios
        .post(
          `${env.VITE_APP_API}/calendar/${calendarId}/event`,
          {
            title: title,
            start: new Date(eventInfo.startStr).toISOString(),
            end: new Date(eventInfo.endStr).toISOString(),
            isFullDay: eventInfo.allDay,
            type: ListColorsCard.find((e) => e.backgroundColor === cardColor.backgroundColor)?.type,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then((response) => {
          const data = response.data;
          toast.success('Event added succesfully');
          calendarApi.addEvent({
            id: data.id,
            title: data.title,
            start: data.isFullDay ? data.start.split('T')[0] : data.start,
            end: data.isFullDay ? data.end.split('T')[0] : data.end,
            allDay: data.isFullDay,
            backgroundColor:
              ListColorsCard.find((e) => e.type === data.type)?.backgroundColor || '#039be5',
            textColor: '#ffffff',
          });
        });
    } catch (err) {
      console.log(err);
      toast.error('Ooops, something went wrong');
    } finally {
      setTitle('');
      handleClose();
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfo.view.calendar;
      const currentEvent = calendarApi.getEventById(eventInfo.event.id);
      if (currentEvent?.backgroundColor === 'green') {
        toast.error('Can not delete holiday');
        setTitle('');
        handleClose();
        return;
      }
      axios
        .delete(`${env.VITE_APP_API}/calendar/${calendarId}/event/${eventInfo.event.id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then(() => {
          toast.success('Delete event successfully');
          eventInfo.event.remove();
        });
    } catch (err) {
      console.log(err);
      toast.error('Ooops, something went wrong');
    } finally {
      setTitle('');
      handleClose();
    }
  };

  const handleUpdatedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfo.view.calendar;
      console.log(eventInfo);
      const eventCalendarUpdated = {
        id: eventInfo.event.id,
        title: title || 'Empty title',
        start: eventInfo.event.startStr,
        end: eventInfo.event.endStr,
        type: ListColorsCard.find((e) => e.backgroundColor === cardColor.backgroundColor)?.type,
      };
      const currentEvent = calendarApi.getEventById(eventInfo.event.id);
      if (currentEvent?.backgroundColor === 'green') {
        toast.error('Can not change holiday');
        setTitle('');
        handleClose();
        return;
      }
      axios
        .patch(
          `${env.VITE_APP_API}/calendar/${calendarId}/event/${eventInfo.event.id}`,
          {
            title: title,
            start: new Date(eventInfo.event.startStr).toISOString(),
            end: new Date(eventInfo.event.endStr).toISOString(),
            isFullDay: eventInfo.event.allDay,
            type: ListColorsCard.find((e) => e.backgroundColor === cardColor.backgroundColor)?.type,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then((response) => {
          const data = response.data;
          eventInfo.event.remove();
          calendarApi.addEvent({
            id: data.id,
            title: data.title,
            start: data.isFullDay ? data.start.split('T')[0] : data.start,
            end: data.isFullDay ? data.end.split('T')[0] : data.end,
            allDay: data.isFullDay,
            backgroundColor:
              ListColorsCard.find((e) => e.type === data.type)?.backgroundColor || '#039be5',
            textColor: '#ffffff',
          });
          toast.success('Updated event successfully');
        });
    } catch (error) {
      console.log(error);
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
          label={'Event Title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <div className='select_color_div'>
          {ListColorsCard.map((color, index) => (
            <Grid style={{ margin: '10px' }} container spacing={2} key={index}>
              <div
                className='backgroundColorSelect'
                style={{ backgroundColor: color.backgroundColor }}
                onClick={() => handleSelectCardColor(color)}
              >
                <input type='radio' name='cardColor' />
              </div>
              <p style={{ marginLeft: '10px' }}>{EventTypes[color.type]}</p>
            </Grid>
          ))}
        </div>

        <Button
          variant='contained'
          fullWidth
          onClick={isEditCard ? handleUpdatedEvent : handleAddedEvent}
          sx={{ marginTop: '0.5rem' }}
        >
          {isEditCard ? 'Update Event' : 'Create Event'}
        </Button>

        {isEditCard && (
          <Button
            variant='contained'
            fullWidth
            sx={{ marginTop: '0.5rem' }}
            onClick={handleDeleteEvent}
          >
            Delete Event
          </Button>
        )}
      </div>
    </Modal>
  );
};
