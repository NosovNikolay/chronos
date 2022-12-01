import '../../styles/flatly/theme/bootstrap.css';
import '@fullcalendar/react/dist/vdom';
import '../../styles/dashboard.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventContentArg,
  EventChangeArg,
  EventInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { createEventId, getHolidays } from '../../utils/event-utils';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDisclosure } from '../../hooks/useModal';
import { ListColorsCard, ModalInfosEventCalendar } from '../modal/event';
import { SideBar } from '../sidebar/SideBar';
import { getEvents } from '../../services/eventService';
import useAuth from '../../hooks/useAuth';
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
  const modalState = useDisclosure(false);
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

  // const handleUpdateEventSelect = async (changeInfo: any) => {
  //   try {
  //     const eventCalendarUpdated = {
  //       eventCalendar: {
  //         _id: changeInfo.event.id,
  //         title: changeInfo.event.title,
  //         start: changeInfo.event.startStr,
  //         end: changeInfo.event.endStr,
  //         backgroundColor: changeInfo.event.backgroundColor,
  //         textColor: changeInfo.event.textColor,
  //       },
  //     };

  //     await updateEventCalendar(eventCalendarUpdated);
  //   } catch (err) {
  //     toast.error('Houve um erro ao atualizar o evento');
  //   }
  // };

  const handleChange = (info: EventDropArg) => {
  };

  useEffect(() => {
    getEvents(token || '', id || '')
    .then((eve) => {
      getHolidays()
      .then((hol) => {
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
            start: event.isFullDay ? event.start.split('T')[0]  : event.start,
            end: event.isFullDay ? event.end.split('T')[0]  : event.end,
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

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    console.log(selectInfo);
    calendarApi.unselect(); // clear date selection
    if (title) {
      toast.success('Event added successfully');
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        color: 'yellow',
        textColor: 'black',
      });
    }
  };

  const handleDrop = (dropInfo: EventChangeArg) => {
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCalendarState({
      ...calendarState,
      currentEvents: events
    });
  };

  return (
    <div className='demo-app'>
      <SideBar calendarState={calendarState} setCalendarState={setCalendarState} calendarName={searchParams.get('title') || ''}/>
      <ModalInfosEventCalendar
        open={modalState.isOpen}
        handleClose={modalState.handleClose}
        eventInfo={eventInfo}
        isEditCard={isEditCard}
        calendarId={id || ''}
      />
      { calendarState.isLoading ? <CircularProgress className="loading_indicator" color="secondary" /> : (
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
           events={calendarState.holidaysVisible ? calendarState.holidays : calendarState.personalEvents}
           select={handleAddEventSelectAndOpenModal}
           eventContent={renderEventContent}
           eventClick={handleEditEventSelectAndOpenModal}
           eventDrop={handleChange}
           eventChange={handleDrop}
           eventsSet={handleEvents} // called after events are initialized/added/changed/removed
           /* you can update a remote database when these fire:
           eventAdd={function(){}}
           eventChange={function(){}}
           eventRemove={function(){}}
           */
         />
       </div>
      ) }
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
