import '../../styles/flatly/theme/bootstrap.css';
import '@fullcalendar/react/dist/vdom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventContentArg,
  formatDate,
  EventChangeArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { INITIAL_EVENTS, createEventId } from '../../utils/event-utils';
import { useParams } from 'react-router-dom';
interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

const Calendar = ()  => {
  const { id } = useParams();
  console.log( id );
  const [state, setState] = useState<DemoAppState>({
    weekendsVisible: true,
    currentEvents: [],
  });

  const handleWeekendsToggle = () => {
    setState({
      weekendsVisible: state.weekendsVisible,
      currentEvents: [],
    });
  };

  const handleChange = (info: EventDropArg) => {
    console.log(info);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    if (title) {
      toast.success('🦄 Wow so easy!');
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
    console.log(dropInfo);
    console.log('drop handle');
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log('delete handle');
    console.log(clickInfo);
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    console.log(events);
    setState({
      currentEvents: events,
      weekendsVisible: state.weekendsVisible,
    });
  };

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          height={600}
          themeSystem={'standard'}
          fixedWeekCount={false}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={state.weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
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
