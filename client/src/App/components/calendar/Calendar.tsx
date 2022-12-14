import '../../styles/flatly/theme/bootstrap.css';
import '@fullcalendar/react/dist/vdom';
import '../../styles/dashboard.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import FullCalendar, {
  EventApi,
  EventContentArg,
  EventChangeArg,
  EventInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { getHolidays } from '../../utils/event-utils';
import { useParams, useSearchParams } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { ListColorsCard, ModalInfoEventCalendar } from '../modal/event';
import { SideBar } from '../sidebar/SideBar';
import { getEvents } from '../../services/eventService';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { env } from '../../config/env';

export interface DemoAppState {
  holidaysVisible: boolean;
  currentEvents: EventApi[];
  holidays: EventInput[];
  personalEvents: EventInput[];
  isLoading: boolean;
}

const Calendar = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [calendarState, setCalendarState] = useState<DemoAppState>({
    holidaysVisible: true,
    currentEvents: [],
    holidays: [],
    personalEvents: [],
    isLoading: true,
  });
  const [isEditCard, setIsEditCard] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState();
  const modalState = useModal(false);
  const { token } = useAuth();
  const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
    setIsEditCard(false);
    setEventInfo(selectInfo);
    modalState.handleOpen();
  };

  const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
    setIsEditCard(true);
    setEventInfo(clickInfo);
    modalState.handleOpen();
  };

  useEffect(() => {
    getEvents(token || '', id || '').then((eve) => {
      getHolidays().then((hol) => {
        const holidays: Array<any> = hol.items;
        const formatHolidays = holidays.map((element) => {
          return {
            id: element.id,
            title: element.summary,
            start: element.start.date,
            color: 'green',
          };
        });
        const formatPersonal = eve.map((event) => {
          return {
            id: event.id,
            title: event.title,
            start: event.isFullDay ? event.start.split('T')[0] : event.start,
            end: event.isFullDay ? event.end.split('T')[0] : event.end,
            allDay: event.isFullDay,
            color: ListColorsCard.find((e) => e.type === event.type)?.backgroundColor || '#039be5',
          };
        });
        setCalendarState({
          ...calendarState,
          holidays: formatHolidays.concat(formatPersonal),
          isLoading: false,
          personalEvents: formatPersonal,
        });
      });
    });
  }, []);

  const handleChange = (changeInfo: EventChangeArg) => {
    console.log(changeInfo.event.startStr);
    console.log(changeInfo.event.endStr);

    try {
      const currentEvent = changeInfo.oldEvent;
      console.log(currentEvent.allDay);
      if (currentEvent?.backgroundColor === 'green') {
        toast.error('Can not change holiday');
        changeInfo.revert();
        return;
      }
      axios
        .patch(
          `${env.VITE_APP_API}/calendar/${id}/event/${currentEvent.id}`,
          {
            start: new Date(changeInfo.event.startStr).toISOString(),
            end: currentEvent.allDay
              ? new Date(changeInfo.event.startStr).toISOString()
              : new Date(changeInfo.event.endStr).toISOString(),
            isFullDay: changeInfo.event.allDay,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then((response) => {
          // const data = response.data;
          toast.success('Updated event successfully');
        });
    } catch (error) {
      toast.error('Oops something went wrong');
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCalendarState({
      ...calendarState,
      currentEvents: events,
    });
  };

  return (
    <div className='demo-app'>
      <SideBar
        calendarState={calendarState}
        setCalendarState={setCalendarState}
        calendarName={searchParams.get('title') || ''}
      />
      <ModalInfoEventCalendar
        open={modalState.isOpen}
        handleClose={modalState.handleClose}
        eventInfo={eventInfo}
        isEditCard={isEditCard}
        calendarId={id || ''}
      />
      {calendarState.isLoading ? (
        <CircularProgress className='loading_indicator' color='secondary' />
      ) : (
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            height={600}
            titleFormat={{
              month: 'long',
              year: 'numeric',
              day: '2-digit',
              weekday: 'long',
            }}
            themeSystem={'standard'}
            fixedWeekCount={false}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={
              calendarState.holidaysVisible ? calendarState.holidays : calendarState.personalEvents
            }
            select={handleAddEventSelectAndOpenModal}
            eventContent={renderEventContent}
            eventClick={handleEditEventSelectAndOpenModal}
            eventChange={handleChange}
            eventsSet={handleEvents}
          />
        </div>
      )}
    </div>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

export default Calendar;
