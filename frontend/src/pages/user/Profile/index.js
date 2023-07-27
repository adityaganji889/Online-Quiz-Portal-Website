import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { updateUserInfo } from '../../../apicalls/users';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { useNavigate } from 'react-router-dom';
import { SetUser } from '../../../redux/usersSlice';


function Profile(props) {
  const navigate = useNavigate()
  const {user} = useSelector(state=>state.users);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image,setImage] = useState(user.profilePicture);
  const [desc, setDesc] = useState(user.description);
  const dispatch = useDispatch();
  const onFileSelect = async(e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = async() => {
        setImage(reader.result);
    }
  }
  const updateProfile = async() => {
    const updatedUserObj = {
        image, desc
    }
     try{
        dispatch(ShowLoading())
        const response = await updateUserInfo(updatedUserObj);
        if(response.success){
            setTimeout(()=>{
              dispatch(HideLoading())
              message.success("User info updated successfully.");
              dispatch(SetUser(response.data));
              message.success("User info fetched successfully.");
            },500)
        }
     }
     catch(error){
        setTimeout(()=>{
           dispatch(HideLoading())
           message.error(error);
        },500)
     }
  }
  return (
    <Container>
      <Row className='d-flex flex-column p-5 mx-5 justify-content-center align-items-center'>
        <div>
          <h1>Your Info</h1>
        </div>
        <hr/>
        <div>
        {user.profilePicture&&<div className='mb-3'>
        <center><img src={image} alt="Profile Pic" width="15%" height="15%"/></center>
        </div>}
        <div className="mb-2">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your name"
                    value={name} onChange={(e)=>setName(e.target.value)}
                    readOnly={true}
                  />
                </div>
             <div className="mb-2">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="Enter your email"
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    readOnly={true}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput3"
                    placeholder="Enter your description"
                    value={desc} onChange={(e)=>setDesc(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="exampleFormControlInput4"
                    className="form-label"
                  >
                    Profile Pic
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    id="exampleFormControlInput4"
                    // placeholder="Enter your recent profile pic"
                    // value={image} 
                    onChange={onFileSelect}
                  />
                </div>
        </div>
        <div className='d-flex justify-content-start gap-2 mt-2'>
         <Button variant="secondary" onClick={()=>{
            navigate(-1)
          }}>
            Back
          </Button>
         <Button variant="primary" onClick={updateProfile}>
            Save
          </Button>
        </div>
      </Row>
    </Container>
  );
}

export default Profile;