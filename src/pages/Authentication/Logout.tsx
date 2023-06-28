/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import { notification } from "antd";
import withRouter from "../../components/Common/withRouter";
// import { logoutUser } from "../../store/actions";

//redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/auth/login/reducer";

const Logout: React.FC = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [api] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  useEffect(() => {
    dispatch(logoutUser({ history, openNotificationWithIcon }));
  }, [dispatch, history]);

  return <></>;
};

export default withRouter(Logout);
