import { App, ModalFuncProps, NotificationArgsProps } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export const useNotification = () => {
  const { notification, modal } = App.useApp();

  const openNotifications = (
    type: NotificationType,
    args: NotificationArgsProps
  ) => {
    const { duration = 3 } = args;

    notification[type]({
      placement: "bottomLeft",
      duration,
      ...args,
    });
  };

  const confirm = (props: ModalFuncProps) => {
    modal.confirm({
      ...props,
      centered: true,
      maskClosable: false,
    });
  };

  return { notify: openNotifications, confirm };
};
