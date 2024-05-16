import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar, Badge, Stack } from "@mui/material";

export const IconsInteractive = () => {
  return (
    <Stack direction="row" spacing={4}>
      <Badge badgeContent={1} color="primary">
        <NotificationsNoneIcon
          sx={{ position: "relative", top: "1px", fontSize: "30px" }}
        />
      </Badge>

      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
    </Stack>
  );
};
