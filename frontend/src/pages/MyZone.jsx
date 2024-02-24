// Import necessary dependencies and components
import { notifications } from "../constants/Constants";
import { Notification } from "../components/index";
import Groups from "../components/MyZone/Groups";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext";
import { API_BASE_URL } from "../utils/config";

// Notifications component displays a list of notifications
const MyZone = () => {
  const { zone, setZone, socket } = useContext(MyContext);

  const fetchZones = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/zones`, {
        withCredentials: true,
      });
      console.log("zone--> ", data.zone);
      setZone(data.zone);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  useEffect(() => {
    socket.on("new zones", () => {
      fetchZones();
    });
  }, [socket]);

  return (
    <>
      
    {/* <!-- Main Content start --> */}
    <main class="main-content">
        <div class="container">
            <div class="row">
               
                <div class="col-xl-9 col-lg-8">
                    <div class="head-area mb-5">
                        <h6>Pages</h6>
                    </div>
                    <div class="top-area mb-5 d-center flex-wrap gap-3 justify-content-between">
                        <ul class="nav flex-wrap gap-2 tab-area" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link d-center active" id="liked-tab" data-bs-toggle="tab" data-bs-target="#liked-tab-pane"
                                    type="button" role="tab" aria-controls="liked-tab-pane" aria-selected="true">liked</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link d-center" id="populer-tab" data-bs-toggle="tab" data-bs-target="#populer-tab-pane"
                                    type="button" role="tab" aria-controls="populer-tab-pane" aria-selected="false">popular</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link d-center" id="suggested-tab" data-bs-toggle="tab" data-bs-target="#suggested-tab-pane"
                                    type="button" role="tab" aria-controls="suggested-tab-pane" aria-selected="false">suggested pages</button>
                            </li>
                        </ul>
                        <div class="btn-item">
                            <a href="pages-create.html" class="cmn-btn gap-1">
                                <i class="material-symbols-outlined mat-icon"> add </i>
                                Create Pages
                            </a>
                        </div>
                    </div>
                    <div class="tab-content pages-create">
                        <div class="tab-pane fade show active" id="liked-tab-pane" role="tabpanel" aria-labelledby="liked-tab" tabindex="0">
                            <div class="row cus-mar friend-request">
                                <div class="col-xl-4 col-sm-6 col-8">
                                    <div class="single-box p-5">
                                        <div class="avatar-area">
                                            <img class="avatar-img w-100" src="assets/images/page-img-1.png" alt="avatar"/>
                                        </div>
                                        <div class="head-area my-5 d-flex justify-content-between">
                                            <div class="d-flex gap-3 align-items-center">
                                                <div class="avatar-item">
                                                    <img class="avatar-img max-un" src="assets/images/page-avatar-1.png" alt="avatar"/>
                                                </div>
                                                <div class="text-area text-start">
                                                    <h6 class="m-0 mb-1"><a href="pages-details.html">Travel Moon</a></h6>
                                                    <p class="mdtxt">Zara</p>
                                                </div>
                                            </div>
                                            <div class="btn-group bg-transparent cus-dropdown dropend">
                                                <button type="button" class="dropdown-btn d-center px-2" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="material-symbols-outlined fs-xxl m-0"> more_horiz </i>
                                                </button>
                                                <ul class="dropdown-menu p-4 pt-2">
                                                    <li>
                                                        <a class="droplist d-flex align-items-center gap-2" href="#">
                                                            <i class="material-symbols-outlined mat-icon"> person_remove </i>
                                                            <span>Unfollow</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="droplist d-flex align-items-center gap-2" href="#">
                                                            <i class="material-symbols-outlined mat-icon"> hide_source </i>
                                                            <span>Hide</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="friends-list d-flex gap-3 align-items-center text-center">
                                            <ul class="d-flex align-items-center justify-content-center">
                                                <li><img src="assets/images/avatar-2.png" alt="image"/></li>
                                                <li><img src="assets/images/avatar-3.png" alt="image"/></li>
                                                <li><img src="assets/images/avatar-4.png" alt="image"/></li>
                                            </ul>
                                            <span class="smtxt d-center">30k Like</span>
                                        </div>
                                        <div class="btn-area mt-4">
                                            <button class="cmn-btn justify-content-center gap-1 w-100">
                                                <i class="material-symbols-outlined mat-icon"> thumb_up </i>
                                                Liked
                                            </button>
                                        </div>
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
    </>
  );
};

export default MyZone;
