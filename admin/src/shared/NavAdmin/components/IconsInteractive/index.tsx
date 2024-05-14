import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar, Stack } from "@mui/material";

export const IconsInteractive = () => {
  return (
    <Stack direction="row" spacing={4}>
      <NotificationsNoneIcon
        sx={{ position: "relative", top: "5px", fontSize: "30px" }}
      />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
    </Stack>
  );
};
