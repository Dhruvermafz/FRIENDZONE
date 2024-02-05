import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Group from "./Group";
import ViewGroup from "./ViewGroup";
import GroupFilter from "./GroupFilter";
import { profileContext as ProfileContext } from "../../features/profile/profileContext";
import { groupsContext as GroupsContext } from "../../features/MyZone/groupsContext";
import { alertContext as AlertContext } from "../../features/alert/alertContext";

const Groups = () => {
  const profileContext = useContext(ProfileContext);
  const groupsContext = useContext(GroupsContext);
  const alertContext = useContext(AlertContext);

  const { user_profile, profile_exists } = profileContext;
  const {
    groups,
    loading,
    filtered,
    error,
    changeView,
    killFilter,
    filterByCourse,
    clearFilter,
    clearErrors,
    prompt,
    clearPrompts,
    sendJoinRequest,
    loadGroups,
  } = groupsContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (profile_exists) {
      loadGroups();
    }
  }, [profile_exists, loadGroups]);

  useEffect(() => {
    if (error !== null) {
      setAlert(error, "danger");
      clearErrors();
    }

    if (prompt !== null) {
      setAlert(prompt, "success");
      clearPrompts();
    }
  }, [error, prompt, setAlert, clearErrors, clearPrompts]);

  const isHost = (group) => {
    return (
      group.members.length > 0 &&
      group.members[0].user === user_profile.user._id
    );
  };

  const openLargeView = (id) => {
    changeView(id, "large");
  };

  const closeLargeView = (id) => {
    changeView(id, "normal");
  };

  const filterButtonClick = (course) => {
    killFilter();
    filterByCourse(course);
  };

  const cancelFilter = () => {
    clearFilter();
  };

  return (
    <div className="groups">
      {loading ? (
        <>Loading</>
      ) : (
        <div className="groups">
          {groups.length === 0 ? (
            <>No one has created a group yet, so maybe you should!</>
          ) : (
            <>
              <GroupFilter />
              <div className="peers-button-group">
                <button
                  onClick={() => cancelFilter()}
                  className="btn-med btn-peer"
                >
                  All
                </button>
                {user_profile.courses.map((course, index) => (
                  <button
                    key={index}
                    onClick={() => filterButtonClick(course)}
                    className="btn-med btn-peer"
                  >
                    {course}
                  </button>
                ))}
                <div className="to-right">
                  <Link
                    to={{
                      pathname: `/newgroup`,
                      state: {
                        goBack: `/groups`,
                      },
                    }}
                  >
                    <button className="btn-med btn-create">Create Group</button>
                  </Link>
                </div>
              </div>
              <div className="group-cards">
                {filtered.length === 0
                  ? groups.map((group, index) => {
                      if (index > 20 || isHost(group)) return null;
                      return group.view === "normal" ? (
                        <Group
                          key={group._id}
                          group={group}
                          openLargeView={openLargeView}
                        />
                      ) : (
                        <ViewGroup
                          key={group._id}
                          group={group}
                          closeLargeView={closeLargeView}
                        />
                      );
                    })
                  : filtered.map((group, index) => {
                      if (index > 20 || isHost(group)) return null;
                      return group.view === "normal" ? (
                        <Group
                          key={group._id}
                          group={group}
                          openLargeView={openLargeView}
                        />
                      ) : (
                        <ViewGroup
                          key={group._id}
                          group={group}
                          closeLargeView={closeLargeView}
                        />
                      );
                    })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Groups;
