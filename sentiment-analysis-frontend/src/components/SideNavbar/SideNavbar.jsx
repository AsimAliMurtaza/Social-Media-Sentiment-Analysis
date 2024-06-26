import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Image, Comment, ViewList } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewPost from "../../routes/PostsPage";
import Slide from "@mui/material/Slide";

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
  Article,
  View,
  Add,
  Camera,
  Sort,
  Visibility,
  ViewComfy,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { ListItemSecondaryAction } from "@mui/material";
import { color } from "framer-motion";

const items = [
  {
    text: "Products",
    icon: <ShoppingCart sx={{ color: "rgb(255,255,255)" }} />,
    path: "",
    subitems: [
      {
        text: "Add Products",
        icon: <AddCircleOutlineIcon sx={{ color: "rgb(255,255,255)" }} />,
        path: "/addproducts",
      },
      {
        text: "View Products",
        icon: <ViewList sx={{ color: "rgb(255,255,255)" }} />,
        path: "/viewproducts",
      },
    ],
  },
  {
    text: "Category",
    icon: <Category sx={{ color: "rgb(255,255,255)" }} />,
    path: "",
    subitems: [
      {
        text: "Add Category",
        icon: <Add sx={{ color: "rgb(255,255,255)" }} />,
        path: "/category",
      },

      {
        text: "Manage Categories",
        icon: <Sort sx={{ color: "rgb(255,255,255)" }} />,
        path: "/managecategories",
      },
    ],
  },
  {
    text: "Posts",
    icon: <Camera sx={{ color: "rgb(255,255,255)" }} />,
    path: "/posts",
    subitems: [
      {
        text: "View",
        icon: <ViewList sx={{ color: "rgb(255,255,255)" }} />,
        path: "/viewpost",
      },
      {
        text: "Create Post",
        icon: <PostAdd sx={{ color: "rgb(255,255,255)" }} />,
        path: "/createpost",
      },
      {
        text: "Manage Posts",
        icon: <EditIcon sx={{ color: "rgb(255,255,255)" }} />,
        path: "/manageposts",
      },
    ],
  },
  {
    text: "Users",
    icon: <AdminPanelSettings sx={{ color: "rgb(255,255,255)" }} />,
    path: "/users",
    subitems: [
      {
        text: "Create Account",
        icon: <AddCircleOutlineIcon sx={{ color: "rgb(255,255,255)" }} />,
        path: "/addusers",
      },
      {
        text: "View Users",
        icon: <VisibilityIcon sx={{ color: "rgb(255,255,255)" }} />,
        path: "/viewusers",
      },
    ],
  },
];

const drawerWidth = 265;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "rgb(60,60,60)",
  color: "rgb(255,255,255)",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "rgb(60,60,60)",
  color: "rgb(255,255,255)",

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
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [openItems, setOpenItems] = React.useState([]);

  const handleItemClick = (item) => {
    if (item.subitems) {
      // Toggle the open state of subitems for the clicked main item
      const isOpen = openItems.includes(item.text);
      setOpenItems(
        isOpen
          ? openItems.filter((openItem) => openItem !== item.text)
          : [...openItems, item.text]
      );
    } else {
      // Navigate to the path if it's not a main item with subitems
      navigate(item.path);
      setSelectedItem(item);
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
              onClick={() => handleItemClick(item)}
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
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
              {item.subitems && (
                <Collapse
                  in={openItems.includes(item.text)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subitems.map((subitem) => (
                      <Slide
                        direction="down"
                        in={openItems.includes(item.text)}
                        timeout={300}
                        key={subitem.text}
                      >
                        <ListItemButton
                          key={subitem.text}
                          sx={{ pl: 4 }}
                          onClick={() => navigate(subitem.path)}
                        >
                          <ListItemIcon>{subitem.icon}</ListItemIcon>
                          <ListItemText primary={subitem.text} />
                        </ListItemButton>
                      </Slide>
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
