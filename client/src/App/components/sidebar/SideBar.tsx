import { EventApi, formatDate } from '@fullcalendar/react';
import { Link } from 'react-router-dom';
import { DemoAppState } from '../calendar/Calendar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Checkbox, Grid } from '@mui/material';
import { InviteToCalendarModal } from '../modal/send_invite';
import { useDisclosure } from '../../hooks/useModal';
import { FormControlLabel } from '@material-ui/core';
interface SideBarProps {
  setCalendarState: React.Dispatch<React.SetStateAction<DemoAppState>>;
  calendarState: DemoAppState;
  calendarName: string;
}

export const SideBar = (props: SideBarProps) => {
  const modalState = useDisclosure(false);
  const renderSidebarEvent = (event: EventApi) => {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    );
  };
  const handleInviteModal = () => {
    modalState.handleOpen();
  }
  const handleHolidaysToggle = () => {
    setCalendarState({
      ...calendarState,
      holidaysVisible: !calendarState.holidaysVisible,
    });
  };
  const label = { };
  const { calendarState, setCalendarState, calendarName } = props;
  return (
    <div>
      <InviteToCalendarModal
        open={modalState.isOpen}
        handleClose={modalState.handleClose}
        eventInfo={'123'}
        isEditCard={false}
        calendarId={'123' || ''}
      />
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
        <Button style={{ marginLeft: '20px' }} onClick={() => handleInviteModal()}>
          + Add friends
        </Button>
        <div className='demo-app-sidebar-section'>
          <FormControlLabel
            control={<Checkbox color="success" checked={calendarState.holidaysVisible} onChange={handleHolidaysToggle} />}
            label="Check me"
            />
        </div>
        <div className='container'>
          <p>All Events ({calendarState.currentEvents.length})</p>
          <div className='left'>{calendarState.currentEvents.map(renderSidebarEvent)}</div>
        </div>
      </div>
    </div>
  );
};
