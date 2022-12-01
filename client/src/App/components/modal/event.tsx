import { Button, Grid, Modal, TextField } from '@mui/material';
import { CalendarApi } from '@fullcalendar/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BackgroundColorRounded, BoxContainer, SelectColors } from './styles';
import axios from 'axios';
import { env } from '../../config/env';
import useAuth from '../../hooks/useAuth';

export enum EventType {
  ARRANGMENT='ARRANGEMENT',
  TASK='TASK',
  REMINDER='REMINDER',
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

export const ModalInfosEventCalendar = ({
  handleClose,
  open,
  eventInfo,
  isEditCard,
  calendarId,
}: IModalInfosEventCalendaryProps) => {
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
      axios.post(`${env.VITE_APP_API}/calendar-events/${calendarId}`, {
        title: title,
        start: new Date(eventInfo.startStr).toISOString(),
        end: new Date(eventInfo.endStr).toISOString(),
        isFullDay: eventInfo.allDay,
        type: ListColorsCard.find((e) => e.backgroundColor === cardColor.backgroundColor)?.type
      }, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      }).then((response) => {
        const data = response.data;
        toast.success('Event added succesfully')
        calendarApi.addEvent({
          id: data.id,
          title: data.title,
          start: data.isFullDay ? data.start.split('T')[0] : data.start,
          end: data.isFullDay ? data.end.split('T')[0] : data.end,
          allDay: data.isFullDay,
          backgroundColor: ListColorsCard.find((e) => e.type === data.type)?.backgroundColor || '#039be5',
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
    // try {
    //   await deleteEventCalendar({ id: eventInfos.event.id });
    //   eventInfos.event.remove();
    // } catch (error) {
    //   toast.error('Houve um erro ao deletar o evento');
    // } finally {
    //   setTitle('');
    //   handleClose();
    // }
  };

  const handleUpdatedEvent = async () => {
    // try {
    //   const calendarApi: CalendarApi = eventInfos.view.calendar;
    //   const eventCalendarUpdated = {
    //     eventCalendar: {
    //       _id: eventInfos.event.id,
    //       title: title !== '' ? title : 'Sem título',
    //       start: eventInfos.event.startStr,
    //       end: eventInfos.event.endStr,
    //       backgroundColor: cardColor.backgroundColor,
    //       textColor: cardColor.textColor,
    //     },
    //   };
    //   const currentEvent = calendarApi.getEventById(eventInfos.event.id);
    //   if (currentEvent) {
    //     currentEvent.setProp('title', title !== '' ? title : 'Sem título');
    //     currentEvent.setProp('backgroundColor', cardColor.backgroundColor);
    //     currentEvent.setProp('textColor', cardColor.textColor);
    //   }
    //   await updateEventCalendar(eventCalendarUpdated);
    // } catch (error) {
    //   toast.error('Houve um erro ao atualizar o evento');
    // } finally {
    //   setTitle('');
    //   handleClose();
    // }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <BoxContainer>
        <TextField
          label={'Event Title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <SelectColors>
          {ListColorsCard.map((color, index) => (
            <Grid style={{ margin: '10px' }} container spacing={2} key={index}>
              <BackgroundColorRounded
                selected={false}
                color={color.backgroundColor}
                onClick={() => handleSelectCardColor(color)}
              >
                <input
                  type='radio'
                  name='cardColor'
                />
              </BackgroundColorRounded>
              <p style={{ marginLeft: '10px' }}>{EventTypes[color.type]}</p>
            </Grid>
          ))}
        </SelectColors>

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
      </BoxContainer>
    </Modal>
  );
};
