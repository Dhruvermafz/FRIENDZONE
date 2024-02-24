import React from 'react'

const ZoneBanner = () => {
  return (
    <div class="banner-area pages-create mb-5">
    <div class="single-box p-5">
        <div class="avatar-area">
            <img class="avatar-img w-100" src="assets/images/page-cover-img.png" alt="image"/>
        </div>
        <div class="top-area py-4 d-center flex-wrap gap-3 justify-content-between">
            <div class="d-flex gap-3 align-items-center">
                <div class="avatar-item p">
                    <img class="avatar-img max-un" src="assets/images/page-avatar-1.png" alt="avatar"/>
                </div>
                <div class="text-area text-start">
                    <h6 class="m-0 mb-1">Travel Moon</h6>
                    <p class="mdtxt">Travel-30k Liked</p>
                </div>
            </div>
            <div class="btn-item d-center gap-3">
                <a href="#" class="cmn-btn gap-1">
                    Liked
                </a>
                <a href="#" class="cmn-btn third gap-1">
                    <i class="material-symbols-outlined mat-icon fs-xl"> add_box </i>
                    Invite
                </a>
                <div class="btn-group cus-dropdown dropend">
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
        </div>
        <div class="friends-list d-flex flex-wrap gap-2 align-items-center text-center">
            <ul class="d-flex align-items-center justify-content-center">
                <li><img src="assets/images/avatar-3.png" alt="image"/></li>
                <li><img src="assets/images/avatar-2.png" alt="image"/></li>
                <li><img src="assets/images/avatar-4.png" alt="image"/></li>
                <li><img src="assets/images/avatar-5.png" alt="image"/></li>
                <li><img src="assets/images/avatar-6.png" alt="image"/></li>
                <li><img src="assets/images/avatar-7.png" alt="image"/></li>
                <li><img src="assets/images/avatar-8.png" alt="image"/></li>
                <li><img src="assets/images/avatar-9.png" alt="image"/></li>
                <li><img src="assets/images/avatar-10.png" alt="image"/></li>
            </ul>
            <span class="mdtxt d-center">Rezeka, Martiola, Larmjio, and 10+ more</span>
        </div>
        <div class="page-details">
            <ul class="nav mt-5 pt-4 flex-wrap gap-2 tab-area" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link d-center active" id="feed-tab" data-bs-toggle="tab" data-bs-target="#feed-tab-pane"
                        type="button" role="tab" aria-controls="feed-tab-pane" aria-selected="true">feed</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link d-center" id="about-tab" data-bs-toggle="tab" data-bs-target="#about-tab-pane"
                        type="button" role="tab" aria-controls="about-tab-pane" aria-selected="false">about</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link d-center" id="connections-tab" data-bs-toggle="tab" data-bs-target="#connections-tab-pane"
                        type="button" role="tab" aria-controls="connections-tab-pane" aria-selected="false">connections</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link d-center" id="media-tab" data-bs-toggle="tab" data-bs-target="#media-tab-pane"
                        type="button" role="tab" aria-controls="media-tab-pane" aria-selected="false">media</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link d-center" id="videos-tab" data-bs-toggle="tab" data-bs-target="#videos-tab-pane"
                        type="button" role="tab" aria-controls="videos-tab-pane" aria-selected="false">videos</button>
                </li>
            </ul>
        </div>
    </div>
</div>
  )
}

export default ZoneBanner
