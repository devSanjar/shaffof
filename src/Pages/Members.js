import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Members.css'
import { FiTrash } from 'react-icons/fi'
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { Formik } from 'formik'
import { BsPencil } from 'react-icons/bs'
import { deleteUserRequest, editUserRequest, edtiUserInTable, setFilteredUsers } from '../redux/actions';
import moment from 'moment';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });


function Members() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [oneUser, setOneUser] = useState();
  const [editUser, setEditUser] = useState();
  console.log('EDIT USER-*-*-*', editUser)

  const [filterName, setFilterName] = useState('');
  const [filterEmail, setfilterEmail] = useState('');
  const [filterPhone, setfilterPhone] = useState('');
  const [filterStatus, setfilterStatus] = useState('');

  const [usersToRender, setUsersToRender] = useState([]);

  console.log(filterName, filterEmail, filterPhone, filterStatus);

  const dispatch = useDispatch();
  let { users, filteredUsers } = useSelector(state => state.data);

  useEffect(() => {
    if (filteredUsers.length > 0) {
      setUsersToRender(filteredUsers)
    } else {
      setUsersToRender(users)
    }
  }, [users, filteredUsers]);

  function filterForm() {
    let filtered = users.filter(item => item.name === filterName || item.email === filterEmail || item.phone === filterPhone || item.status === filterStatus)

    dispatch(setFilteredUsers(filtered))

    // console.log(filtered)
    // console.log(users)
  }

  const singleUser = (user) => {
    setOneUser(user.id)
    setEditUser(user)
    // DISPATCH
    dispatch(edtiUserInTable(user))
  }
  const handleDelete = (id) => {
    if (window.confirm('Are you sure delete a user?')) {
      dispatch(deleteUserRequest(id))
    }
  }

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChangex = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );


  return (
    <div>
      {/* FILTER-SIDE */}
      <div className="d-flex m-0 p-0 justify-content-between" style={{ width: '70%' }}>
        <div className="input-group mb-3 me-3">
          <input onChange={(e) => setFilterName(e.target.value)} type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
        </div>
        <div className="input-group mb-3 me-3">
          <input onChange={(e) => setfilterEmail(e.target.value)} type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon2" />
        </div>
        <div className="input-group mb-3 me-3">
          <input onChange={(e) => setfilterPhone(e.target.value)} type="text" className="form-control" placeholder="Phone" aria-label="Phone" aria-describedby="basic-addon3" />
        </div>
        <select onChange={(e) => setfilterStatus(e.target.options[e.target.selectedIndex].text)} className="form-select me-3" aria-label="Default defaultValue example">
          <option defaultValue> Select status </option>
          <option value="1"> Active </option>
          <option value="2"> Inactive </option>
        </select>
        <div>
          <div onClick={filterForm} className="btn btn-primary add-member px-4"> Search </div>
        </div>
      </div>

      {/* Table */}
      <div className='row'>
        <div className="card shadow-sm" style={{ width: '98%', marginLeft: '0.99%' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Photo</th>
                <th scope="col">Member name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Operation</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {usersToRender.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    <img className='user-image-table' src={item.photo.thumbUrl} alt="face3" />
                  </th>
                  <td className='align-middle'>{item.name}</td>
                  <td className='align-middle'>{item.phone}</td>
                  <td className='align-middle'>{item.email}</td>
                  <td className='align-middle'>
                    {item.status === false ?
                      (<p className='InActive text-center m-0 '>Inactive</p>) :
                      (<p className='isActive text-center m-0 '>Active</p>)
                    }
                    {/* <p className='InActive text-center m-0 '>Inactive</p>
                    <p className='isActive text-center m-0 '>Active</p> */}
                  </td>
                  {/* <td className='align-middle text-muted'>2 min ago</td> */}
                  <td className='align-middle text-muted'>
                    {moment(item.date).startOf('hour').fromNow()}
                  </td>

                  <td className='align-middle'>
                    <span
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      onClick={() => singleUser(item)}
                      type='button'
                      className='icon-edit-delete'>

                      <BsPencil />
                    </span>
                    <span
                      onClick={() => handleDelete(item.id)}
                      type='button'
                      className='ms-3 icon-edit-delete'>
                      <FiTrash />
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      {users.map((item) => (
        <Formik
          initialValues={{ name: '', phone: '', email: '', status: '', photo: '' }}
          // initialValues={{ name: '', phone: '', email: '', status: false, photo: '' }}
          validate={values => {
            console.log('RESULT', values)
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            fileList.map(item => (values.photo = item))
            console.log('values', values)
            dispatch(editUserRequest({ oneUser, values }))
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <form key={item.id} onSubmit={handleSubmit}>

              <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h6 className="modal-title text-muted" id="exampleModalLabel2">
                        Edit Member
                      </h6>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                      <div className="mb-2">
                        <label htmlFor="formGroupExampleInput" className="form-label">
                          <h6 className='text-muted m-0'>Name</h6>
                        </label>
                        <input
                          type="text"
                          className="form-control form-modal"
                          id="formGroupExampleInput"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                      </div>

                      <div className="mb-2">
                        <label htmlFor="formGroupExampleInput2" className="form-label">
                          <h6 className='text-muted m-0'>Phone</h6>
                        </label>
                        <input
                          type="text"
                          className="form-control form-modal"
                          id="formGroupExampleInput2"
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                        />
                      </div>

                      <div className="mb-2">
                        <label htmlFor="formGroupExampleInput3" className="form-label">
                          <h6 className='text-muted m-0'>Email</h6>
                        </label>
                        <input
                          type="email"
                          className="form-control form-modal"
                          id="formGroupExampleInput3"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                      </div>

                      <div className="row" style={{ marginLeft: '0.1%' }}>
                        <div className="form-check form-switch">
                          <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{ marginLeft: '-10.5%', border: 'none' }}>
                            <h6 className='text-muted m-0'>Status</h6>
                          </label> <br />
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            style={{ marginLeft: '-35px', fontSize: '18px' }}
                            name="status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                          />
                        </div>
                      </div>


                      <div className="row m-0 p-0">
                        <div className="form-check form-switch mt-3 p-0">
                          <label className="form-check-label2" htmlFor="flexSwitchCheckChecked2" style={{ border: 'none' }}>
                            <h6 className='text-muted mb-2'>
                              Photo
                            </h6>
                          </label> <br />
                          <>

                            {/* <input type="file"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChangex}
                            name='photo'
                            // onChange={(event) => setFieldValue('photo', event.currentTarget.files[0])}
                          /> */}

                            <Upload
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={handlePreview}
                              onChange={handleChangex ? handleChangex : (event) => setFieldValue('photo', event.currentTarget.files[0])}
                            >
                              {fileList.length >= 8 ? null : uploadButton}
                            </Upload>

                            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                              <img
                                alt="example"
                                style={{
                                  width: '100%',
                                }}
                                src={previewImage}
                              />
                            </Modal>
                          </>


                        </div>
                      </div>

                    </div>


                    <div className="modal-footer">
                      <button type="sutmit" className="btn btn-primary me-auto px-5 py-1 save-btn" data-bs-dismiss="modal" disabled={isSubmitting}>
                        Edit
                      </button>
                      <button type="button" className="btn btn-light cancel-btn" data-bs-dismiss="modal">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </form>
          )}

        </Formik>
      ))}

      {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal4">
        OPEN
      </button>

      <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel4" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <h4 className='text-center'>Are you sure delete this member?</h4>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button type="button" class="btn btn-primary">Ok</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div> */}

    </div>
  )
}

export default Members