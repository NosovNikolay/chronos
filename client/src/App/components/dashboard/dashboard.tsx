import { useEffect, useState } from 'react';
import '../../styles/dashboard.scss';
import { Button, CircularProgress } from '@mui/material';

import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import useAuth from '../../hooks/useAuth';
import { env } from '../../config/env';
import { InviteToCalendarModal } from '../modal/createNewCalendar';
import { useDisclosure } from '../../hooks/useModal';
// TODO: interface forlist of calendars
const ShowCategory = (props) => {
  const { list } = props;
  return (
    <div style={{ marginLeft: '15px', height: '30px', width: '150px' }}>
      <Paper key={list.id}>
        <p style={{ position: 'relative', top: '40%' }}>{list.title}</p>
      </Paper>
    </div>
  );
};

function Dashboard() {
  const { token } = useAuth();
  const [state, setState] = useState([]);
  const modalState = useDisclosure(false);

  useEffect(() => {
    fetch(env.VITE_APP_API + '/calendars', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setState(data.items);
      });
  }, []);
  const handleInviteModal = () => {
    modalState.handleOpen();
  }
  // TODO: remove string concat + types
  return (
    <>
      <InviteToCalendarModal
        open={modalState.isOpen}
        handleClose={modalState.handleClose}
        eventInfo={'123'}
        isEditCard={false}
        calendarId={'123' || ''}
      />
      <div>
        <Typography variant='h3' style={{ padding: '30px', textAlign: 'center' }}>
          List of Calendars
        </Typography>
      </div>
      {state?.length ? (
        <div>
          <Grid
            container
            spacing={8}
            direction='row'
            alignItems='center'
            justifyContent='center'
          >
            {state.map((calendar, index) => (
              <Grid key={index} item>
                <Link to={'/calendar/' + calendar.id + '?' + 'title=' + calendar.title}>
                  <Grid style={{margin: '20px'}} container spacing={2}>
                    <ShowCategory list={calendar}></ShowCategory>
                  </Grid>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Grid 
            container
            direction='column'
            alignItems='center'
            justifyContent='center'>
                <Link to={'/calendar'}>
                  <Grid container spacing={2}>
                  <Button style={{ marginLeft: '20px' }} onClick={() => handleInviteModal()}>
                    + Create new Calendar
                  </Button>
                  </Grid>
                </Link>
              </Grid>
        </div>
      ) : (
        <CircularProgress className='loading_indicator' color='secondary' />
      )}
    </>
  );
}

export default Dashboard;
