import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Image, Comment } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewPost from "../../routes/PostsPage";
import {
  AdminPanelSettings,
  Analytics,
  Category,
  Facebook,
  Home,
  InputOutlined,
  Instagram,
  PostAdd,
  PostAddSharp,
  Receipt,
  Settings,
  ShoppingCart,
  Create,
  Article
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { ListItemSecondaryAction } from "@mui/material";

const items = [
  {
    text: "Products",
    icon: <ShoppingCart />,
    path: "/products",
    subitems: [
      {
        text: "Add Products",
        icon: <AddCircleOutlineIcon/>,
        path: "/addproducts",
      },
      {
        text: "View Products",
        icon: <VisibilityIcon/>,
        path: "/viewproducts",
      },
    ]
  },
  {
    text: "Category",
    icon: <Category />,
    path: "/category",
  },
  {
    text: "Posts",
    icon: <Article />,
    path: "/posts",
    subitems: [
      {
        text: "View",
        icon: <VisibilityIcon/>,
        path: "/viewpost",
      },
      {
        text: "Create Post",
        icon: <PostAdd />,
        path: "/createpost",
      },
      {
        text: "Manage Posts",
        icon: <EditIcon />,
        path: "/manageposts",
      },
    ],
  },
  {
    text: "Users",
    icon: <AdminPanelSettings />,
    path: "/users",
    subitems: [
      {
        text: "Add Products",
        icon: <AddCircleOutlineIcon/>,
        path: "/addproducts",
      },
      {
        text: "View Products",
        icon: <VisibilityIcon/>,
        path: "/viewproducts",
      },
  },
  {
    text: "Settings",
    icon: <Settings />,
    path: "/settings",
  },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNavbar() {
  const theme = useTheme();
  const setOpen = useStore((state) => state.setOpen);
  const open = useStore((state) => state.dopen);
  const navigate = useNavigate();
  const [isFormVisible, setFormVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  React.useEffect(() => {
    if (!open) {
      // Close submenus when the drawer is closed
      setFormVisible(false);
      setSelectedItem(null);
    }
  }, [open]);

  const handleSubItemClick = (path) => {
    if (path) {
      navigate(path);
    } else {
      setFormVisible(!isFormVisible);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={() => {
              setOpen(!open);
            }}
          >
            <Box height={30} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {items.map((item, index) => (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              key={item.text}
              onClick={() => {
                if (item.subitems) {
                  // Toggle the submenu visibility
                  setFormVisible(item === selectedItem && !isFormVisible);
                  setSelectedItem(item);
                } else {
                  navigate(item.path);
                }
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              {item.subitems && (
                <Collapse in={isFormVisible} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subitems.map((subitem) => (
                      <ListItemButton
                        key={subitem.text}
                        sx={{ pl: 4 }}
                        onClick={() => navigate(subitem.path)}
                      >
                        <ListItemIcon>{subitem.icon}</ListItemIcon>
                        <ListItemText primary={subitem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
