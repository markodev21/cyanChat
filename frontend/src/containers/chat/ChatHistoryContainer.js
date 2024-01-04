import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ChatHistoryContainer = () => {
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const [historyData, setHistoryData] = React.useState([]);

  useEffect(() => {
    const postData = { username: "user" };
    getHistoryFromSever(postData);
  }, []);

  const getHistoryFromSever = (postData) => {
    axios.post('http://localhost:5000/api/get-chat-list', postData)
      .then(response => {
        let messageString = response.data.message;

        const groupRes = messageString.reduce((item, { datetime, id }) => {
          (item[datetime] = item[datetime] || []).push(id);
          return item;
        }, {});

        setHistoryData(groupRes)
      });
  }

  const handleListItemClick = (event, index) => {
    setSelectedIdx(index);
  };
  
  const onDeleteHistory = (event, index) => {
    const postData = { username: "user", chat_id: index };
    axios.post('http://localhost:5000/api/delete-chat', postData)
      .then(response => {
        console.log("deleted chat");
      })
      .catch(error => console.error('Error fetching data:' + error));
  }

  return (
    <List
    sx={{
      color: 'black',
    }}
    subheader={<li />}
  >
    {
      Object.keys(historyData).map((dateVal) => (
        <li key={`section-${dateVal}`}>
          <ul>
            <b > {dateVal} </b>
            {
            historyData[dateVal].map((item) => (
              <ListItem 
              key={`item-${dateVal}-${item}`}
              selected={selectedIdx === item}
              onClick={(event) => handleListItemClick(event, item)}
              secondaryAction={
                  <IconButton edge="end" aria-label="delete"
                    onClick={(event) => onDeleteHistory(event, item)}
                  >
                    <DeleteIcon />
                  </IconButton>
              }
              sx={{
                bgcolor: 'background.paper',
                marginTop:1,
                borderRadius:2,
                '&: hover': { bgcolor: "darkgrey" },
              }}
          
                >
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
              ))
            }
            <br/>
          </ul>
        </li>
      ))

    }
    </List>
  );
};

export default ChatHistoryContainer;