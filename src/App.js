import React, { Fragment, useEffect, useState } from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
import moment from 'moment';

import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

function App() {
  const classes = useStyles();

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('http://private-80e5dc-messages36.apiary-mock.com/messages')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setRecords(result.data);
      });
  }, []);

  return (
    <div className="App">
      <List className={classes.root}>
        {records.map((record, index) => (
          <Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={record.attributes.username}
                  src={record.attributes.pic}
                />
              </ListItemAvatar>
              <ListItemText
                primary={(
                  <Fragment>
                    <Typography color="textPrimary">
                      {record.attributes.message}
                    </Typography>
                    <Typography color="textPrimary">
                      {record.attributes.username}
                    </Typography>
                    <Typography color="textPrimary">
                      {record.attributes.useragent}
                    </Typography>
                  </Fragment>
                )}
                secondary={moment(record.attributes.date).format('lll')}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
    </div>
  );
}

export default App;
