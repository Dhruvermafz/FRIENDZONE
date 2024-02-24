import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {profileContext as ProfileContext} from '../../../features/profile/profileContext';
import {groupsContext as GroupsContext} from '../../../features/MyZone/groupsContext';
import {alertContext as AlertContext} from '../../../features/alert/alertContext';

const CreateGroup = ({existingGroup, history, location, finish}) => {
    const profileContext = useContext(ProfileContext);
    const groupsContext = useContext(GroupsContext);
    const alertContext = useContext(AlertContext);
    
    const { uploadGroup, creation_error, creation_success, clearErrors, clearSuccess } = groupsContext;
    const { setAlert } = alertContext;
    const { profile_exists, user_profile } = profileContext;
    
    const [courses, setCourses] = useState([]);

    const [group, setGroup] = useState({
        ...existingGroup,
        id: existingGroup._id
    });

    const {name, course, description, max_members} = group;

    useEffect(() => {
        if (group._id) {
            delete group._id;
        }
    }, []);

    useEffect(() => {
        if (profile_exists && user_profile.courses.length > 0) {
            setCourses(user_profile.courses);
            if (!existingGroup.exists) {
                setGroup({
                    ...group,
                    course: user_profile.courses[0]
                })
            }
        }

    }, [user_profile]);

    useEffect(() => {
        if (creation_error !== null) {
            creation_error.forEach(error => setAlert(error, 'danger'));
            clearErrors();
        }

        if (creation_success === true) {
            if (existingGroup.exists) {
                setAlert('Group successfully edited', 'success');
                clearSuccess();
                finish()
            } else {
                setAlert('Group successfully created', 'success');
                clearSuccess();
                history.push('/studyview');
            }
        }

    }, [creation_error, creation_success]);

    const onChange = e =>
        setGroup({ 
            ...group, 
            [e.target.name]: e.target.value
        });

    const changeCourse = course => {
        setGroup({
            ...group,
            course
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if (group.max_members === '0' || group.max_members === '1') {
            setAlert('Member limit too small', 'danger');
        } else {
            uploadGroup(group);
        }
    }

    return (
    <Fragment>
      {/* <!-- Main Content start --> */}
    <main class="main-content">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-lg-4">
                    <div class="d-block d-lg-none">
                        <button class="button profile-active mb-4 mb-lg-0 d-flex align-items-center gap-2">
                            <i class="material-symbols-outlined mat-icon"> tune </i>
                            <span>My Create</span>
                        </button>
                    </div>
                    <div class="profile-sidebar cus-scrollbar p-5">
                        <div class="d-block d-lg-none position-absolute end-0 top-0">
                            <button class="button profile-close">
                                <i class="material-symbols-outlined mat-icon fs-xl"> close </i>
                            </button>
                        </div>
                        <div class="head-area mb-5">
                            <h5>Create Page</h5>
                        </div>
                        <div class="profile-picture d-flex gap-2 mb-5 align-items-center">
                            <div class="avatar position-relative">
                                <img class="avatar-img max-un" src="assets/images/avatar-1.png" alt="avatar"/>
                            </div>
                            <div class="text-area">
                                <h6 class="m-0 mb-1"><a href="profile-post.html">Lerio Mao</a></h6>
                                <p class="mdtxt">Admin</p>
                            </div>
                        </div>
                        <form action="https://pixner.net/circlehub/main/pages-info.html" class="text-center d-grid gap-4">
                            <div class="input-area second">
                                <input type="text" placeholder="Page name"/>
                            </div>
                            <div class="input-area second">
                                <select>
                                    <option value="0">Category</option>
                                    <option value="1">Category One</option>
                                    <option value="2">Category Two</option>
                                    <option value="3">Category Three</option>
                                </select>
                            </div>
                            <div class="input-area second">
                                <textarea cols="30" placeholder="Bio(optional)" rows="3"></textarea>
                            </div>
                            <div class="btn-area text-end">
                                <button class="cmn-btn">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-xl-9 col-lg-8">
                    <div class="banner-area create-group pages-create mb-5">
                        <div class="single-box p-5">
                            <div class="avatar-area position-relative">
                                <img class="avatar-img w-100" src="assets/images/create-page-cover.png" alt="avatar"/>
                                <div class="abs-area w-100 position-absolute bottom-0 p-3 d-center justify-content-end">
                                    <form action="#">
                                        <div class="file-upload">
                                            <label class="file mt-1">
                                                <input type="file"/>
                                                <span class="file-custom bg-transparent border-0 p-3 d-grid text-center">
                                                    <p class="cmn-btn">Select Photo</p>
                                                </span>
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="top-area py-4 px-5 d-center flex-wrap gap-3 justify-content-between">
                                <div class="d-grid gap-4 align-items-center">
                                    <div class="abs-avatar-item m-0">
                                        <form action="#">
                                            <div class="file-upload">
                                                <label class="file mt-1">
                                                    <input type="file"/>
                                                    <span class="file-custom border-0 px-3 py-6 d-grid text-center">
                                                        <span class="material-symbols-outlined mat-icon fs-xxxl"> perm_media </span>
                                                        <span class="mdtxt">Group Profile</span>
                                                    </span>
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="text-area text-start">
                                        <h5 class="m-0 mb-1">Page Name</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    {/* <!-- Main Content end --> */}
    </Fragment>
    )
}

CreateGroup.defaultProps = {
    existingGroup: {
        exists: false,
        name: "",
        course: "",
        description: "",
        public: false,
        max_members: 20
    }
}

export default CreateGroup;