import { EventApi, formatDate } from '@fullcalendar/react';
import { Link } from 'react-router-dom';
import { DemoAppState } from '../calendar/Calendar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid } from '@mui/material';
interface SideBarProps {
  setCalendarState: React.Dispatch<React.SetStateAction<DemoAppState>>;
  calendarState: DemoAppState;
  calendarName: string;
}

export const SideBar = (props: SideBarProps) => {
  const renderSidebarEvent = (event: EventApi) => {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    );
  };
  const handleHolidaysToggle = () => {
    setCalendarState({
      ...calendarState,
      holidaysVisible: !calendarState.holidaysVisible,
    });
  };

  const { calendarState, setCalendarState, calendarName } = props;
  return (
    <div>
      <div className='demo-app-sidebar'>
        <Link to='/calendar'>
          <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
            <ArrowBackIcon style={{ marginLeft: '5px' }} />
            <div style={{ margin: '5px', padding: '5px' }}>Back to calendars</div>
          </Grid>
        </Link>
        <div className='demo-app-sidebar-section'>
          <h2>{calendarName}</h2>
          <ul></ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={calendarState.holidaysVisible}
              onChange={handleHolidaysToggle}
            ></input>
            Show holidays
          </label>
        </div>
        <div className='container'>
          <p>All Events ({calendarState.currentEvents.length})</p>
          <div className='left'>{calendarState.currentEvents.map(renderSidebarEvent)}</div>
        </div>
      </div>
    </div>
  );
};
