import { useState } from 'react';
import { Button, Form, Card, Modal, Col, Row } from 'react-bootstrap';
import Data from './data/MOCK_DATA.json';
import { FaRegUserCircle, FaCalendarAlt, FaEye } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  // Array storage for checked entries
  const [checkedItems, setCheckedItems] = useState([]);

  // Stores data id when checkbox is checked. Pops it when unchecked
  const handleCheckboxChange = (dataId) => {
    if (checkedItems.includes(dataId)) {
      setCheckedItems(checkedItems.filter((id) => id !== dataId));
    } else {
      setCheckedItems([...checkedItems, dataId]);
    }
  };

  // Delete entry onClick function. Iterates through checkedItems and removes it from list using findIndex and splice
  function handleEntryDeletion(){
    if (checkedItems.length === 0){
      alert("No entries to be deleted.");
      return;
    }
    for (let i = 0; i < checkedItems.length; i++) { 
      const removeId = Data.findIndex((data) => data.id === checkedItems[i]);
      Data.splice(removeId, 1);
    }
    handleShow1();
  }

  // State handling for modals (Read Full and Confirmation)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // Variable storage for modalData to displayed when Full Read button is clicked
  const [modalData, setModalData] = useState('');

  return (
    <div className="mainContainer">
      <div className="header">News Articles</div>
      <div className="buttonRow">
        <input type="checkbox"/>&nbsp;&nbsp;
        <Button className='pubButton'>Publish</Button>
        <Button className='delButton' onClick={()=>{handleEntryDeletion()}}>Delete</Button>
        <Form.Control className = 'searchBar' type="text" placeholder="Search ..." />
      </div>
    {
      // Maps data from imported JSON file and displays each entry in separate cards
      Data.map(data =>{
        return(
          <div>
            <div>
              <Card className="card">
                <Row>
                  <Col className="mainContent">
                    <div className="articleName">
                      <input 
                      type="checkbox"
                      onChange={() => handleCheckboxChange(data.id)}
                      checked={checkedItems.includes(data.id)}/>&nbsp;
                      {data.title}
                    </div>
                    <div>
                      <span className="author"><FaRegUserCircle className="icons"/>  {data.author} &nbsp;  </span>
                      <span className="date"><FaCalendarAlt className="icons" />  {data.date}</span>
                    </div>
                    <Row >
                      <Col className="content">{data.content}</Col>
                      <Col className="readFull" onClick={()=> {
                        setModalData(data);
                        handleShow();
                      }}><FaEye style={{color: "#3C82F6"}}/> Read Full</Col>
                    </Row>
                  </Col>
                  <Col className="col-5 hashtags">
                    <Button className='hashButton'>#Sports</Button>
                    <Button className='hashButton'>#Worldwide</Button>
                    <Button className='hashButton'>#Local</Button>
                  </Col>
                </Row>
              </Card>
            </div>
        </div>
        )
      })
    }
    {/* Modals for Read Full and Deletion Confirmation */}
    <Modal dialogClassName="modaal" contentClassName="modaalH" size="lg" show={show} onHide={handleClose}>
      <Modal.Header class="modal-header" closeButton>
        <Modal.Title>{modalData.title}</Modal.Title>
      </Modal.Header>
      <div className="authDateModal">{modalData.author} | {modalData.date}</div>
      <Modal.Body className="modalBody">
        {modalData.content}
      </Modal.Body>
      <Modal.Footer style={{
        display: "flex",
        justifyContent: "center",
      }}>
        <Button className="modalPub" onClick={handleClose}>
          Publish
        </Button>
        <Button className="modalDel" onClick={handleClose}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal show={show1} onHide={handleClose1}>
      <Modal.Header>
        Successfully deleted selected item/s.
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={handleClose1}>
          Close
        </Button></Modal.Footer>
    </Modal>
    </div>
  );
}

export default App;


/*
Author: Eli Harold R. Guerrero

Description: A web page that shows articles in a list form from a JSON file which (1) allows users to view the full content of the article, and (2) delete an article or multiple articles from the list.

Packages used: React Bootstrap and Font Awesome
*/