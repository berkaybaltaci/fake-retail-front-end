import { Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import { useCustomNotificationStyles } from '../../styles/ui/custom-notification.styles';

const CustomNotification: React.FC<{ message: string; title: string }> = ({
  message,
  title,
}) => {
  const { classes } = useCustomNotificationStyles();

  return (
    <div className={classes.alertContainer}>
      <Notification
        icon={<IconCheck size={20} />}
        title={title}
        color="lime"
        className={classes.alert}
        disallowClose
      >
        {message}
      </Notification>
    </div>
  );
};

export default CustomNotification;
