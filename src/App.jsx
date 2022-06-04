import logo from './logo.svg';
import './App.scss';
import React, {useState,useEffect,Fragment,useRef,memo} from 'react';
import {v1 as uuid} from "uuid";
import reloadIcon from "./assets/reload.gif";
import addIcon from "./assets/add.gif";
import deleteIcon from "./assets/delete.gif";
import delete2Icon from "./assets/delete2.gif";
import editIcon from "./assets/edit.gif";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CreateUserForm from './components/CreateUserForm/CreateUserForm';
import UpdateUserForm from './components/UpdateUserForm/UpdateUserForm';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {

  const initUserState = [
    {
      id:uuid(),
      userId:"admin",
      firstName:"Admin",
      lastName:"User",
      email:"support@cixsoft.com",
      status:"REGISTERED",
      createdOn: (new Date()).toString().substr(0,28),
    },
    {
      id: uuid(),
      userId:"megray",
      firstName:"Meg",
      lastName:"Ray",
      email:"meg@fas.com",
      status:"INITIATED",
      createdOn: (new Date()).toString().substr(0,28),
    },
    {
      id: uuid(),
      userId:"tomh",
      firstName:"Tom",
      lastName:"H",
      email:"tom@test.com",
      status:"INITIATED",
      createdOn: (new Date()).toString().substr(0,28),
    }
  ]

  
  const [users,setUsers] = useState(initUserState);
  const [selectedUsersId,setSelectedUsersId] = useState([]);
  const [searchText,setSearchText] = useState([]);
  const [showCreateUser,setShowCreateUser] = useState(false);
  const [showUpdateUser,setShowUpdateUser] = useState(false);
  const [openModal,setOpenModal] = useState(false);

  const onHandleCheckboxChange = (e,uid) => {
    setSelectedUsersId(e.target.checked ? [...selectedUsersId,uid] : [...selectedUsersId].filter(id => id !== uid))
  }
  
  const onHandleCheckboxAll = e => {

    if(e.target.checked){
      setSelectedUsersId(users.map(user=>user.id));
    }
    else {
      setShowUpdateUser(false)
      setSelectedUsersId([]);
    }
  }

  const onDeleteUser = () => {
    if(selectedUsersId.length){
      setUsers([...users].filter(user=>selectedUsersId.indexOf(user.id)==-1));
      setSelectedUsersId([]);
    }
    else{
      alert("Select user first")
    }
  }

  const onAddUser = userData => {
    setUsers([...users, userData]);
    setOpenModal(false)
  }

  const onTextChange = e => {
    setSearchText(e.target.value)
  }

  const onUpdateUser = userData => {
    setUsers([...users].map(user => user.id == userData.id ? userData : user ))
    setShowUpdateUser(false)
    setOpenModal(false)
  }

  const editUser = () => {
    if(selectedUsersId.length == 1){
      setShowUpdateUser(true)
      setOpenModal(true)
    }
    else{
      alert("Please select 1 user");
    }
  }

  return (
    <div className="App">
      <div className="wrap-inner">
        <div className="actions-container">
          <ul className="actions-buttons">
            <li>
              <IconButton onClick={()=>{
                setShowCreateUser(true)
                setOpenModal(true)
              }}>
                <img src={addIcon} alt="addIcon" />
              </IconButton>
            </li>
            <li>
              <IconButton onClick={editUser}>
                <img src={editIcon} alt="editIcon" />
              </IconButton>
            </li>
            <li>
              <IconButton onClick={()=>alert("function not specified")}>
                <img src={reloadIcon} alt="reloadIcon" />
              </IconButton>
            </li>
            <li>
              <IconButton
              onClick={() => onDeleteUser()}>
                <img src={deleteIcon} alt="deleteIcon" />
              </IconButton>
            </li>
            <li>
              <IconButton 
              onClick={()=>alert("function not specified")}>
                <img src={delete2Icon} alt="delete2Icon" />
              </IconButton>
            </li>
          </ul>
          <TextField
            id="search-field"
            label="Outlined"
            variant="outlined"
            sx={{
              width: '100%',
              maxWidth: '500px',
              color: '#fff',
            }}
            onChange={onTextChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" onChange={onHandleCheckboxAll}/></th>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>CreatedOn</th>
            </tr>
          </thead>
          <tbody>
          {users.filter(user=>{
            return  user.userId.indexOf(searchText) > -1 ||
                    user.firstName.indexOf(searchText) > -1 ||
                    user.lastName.indexOf(searchText) > -1 ||
                    user.email.indexOf(searchText) > -1
          }).map(user => (
            <tr key={user.id}>
              <td>
                <input
                type="checkbox"
                onChange={e=>onHandleCheckboxChange(e,user.id)}
                checked={selectedUsersId.includes(user.id)}
                />
              </td>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.createdOn}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {showCreateUser ? <CreateUserForm 
                              onAddUser={onAddUser}
                              setShowCreateUser={setShowCreateUser}
                              setOpenModal={setOpenModal}/> : <p></p>}
          {showUpdateUser && selectedUsersId.length ? <UpdateUserForm
                              userData={users.find(user => user.id == selectedUsersId[0])}
                              onUpdateUser={onUpdateUser}
                              setShowUpdateUser={setShowUpdateUser}
                              setOpenModal={setOpenModal}/> : <p></p>}
        </Box>
      </Modal>
    </div>
  );
}

export default App;
