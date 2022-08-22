import React, { useState } from 'react';
import { useDispatch, } from 'react-redux'
import './MainSide.css'
import { Tabs } from 'antd';
import Members from './Members';
import Admin from './Admin';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { Formik } from 'formik'
import { createNewUser, createUserRequest } from '../redux/actions';

const { TabPane } = Tabs;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

function MainSide() {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  console.log('FILE-LIST', fileList);

  const dispatch = useDispatch()

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

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className='m-3'>
      <div className='position-relative' style={{ width: '100%' }}>
        <Tabs className='ps-2' defaultActiveKey="1" onChange={onChange} style={{ borderRadius: '6px', }}>
          <TabPane className='position-relative' tab="Members" key="1">
            <Members />
          </TabPane>
          <TabPane tab="Admins" key="2">
            <Admin />
          </TabPane>
        </Tabs>

        <div
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ top: '0px', right: '0px', position: 'absolute' }}
          className="btn btn-primary add-member px-4"
        >
          Add Members
        </div>

      </div>

      <Formik
        initialValues={{ name: '', phone: '', email: '', status: false, date: '', photo: '', }}
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
        // new Date()
        onSubmit={(values, { setSubmitting, resetForm }) => {
          fileList.map(item => (values.photo = item))
          console.log('values', values)
          values.date = new Date()
          // values.date = new Date();
          dispatch(createUserRequest(values))
          dispatch(createNewUser(values))
          document.getElementById("close_modal").click()
          resetForm()
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
          <form onSubmit={handleSubmit}>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title text-muted" id="exampleModalLabel">
                      Add member
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
                    <button type="sutmit" className="btn btn-primary me-auto px-5 py-1 save-btn" disabled={isSubmitting}>
                      Save
                    </button>
                    <button type="button" id='close_modal' className="btn btn-light cancel-btn" data-bs-dismiss="modal">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

        )}

      </Formik>
    </div >
  )
}

export default MainSide