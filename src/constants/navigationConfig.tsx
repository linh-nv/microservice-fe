import { GoHomeFill } from "react-icons/go";
import { HiUserGroup } from "react-icons/hi";
import { FaFacebookMessenger, FaThList } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import {
  ActionItem,
  NavigationItem,
  ProfileMenuItem,
} from "../types/navigation";
import { routes } from "../routes/routes";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "home",
    path: routes.home,
    icon: <GoHomeFill />,
    label: "Home",
  },
  {
    id: "groups",
    path: routes.friend,
    icon: <HiUserGroup />,
    label: "Groups",
  },
];

export const ACTION_ITEMS: ActionItem[] = [
  {
    id: "menu",
    icon: <FaThList />,
    label: "Menu",
  },
  {
    id: "message",
    icon: <FaFacebookMessenger />,
    label: "Messages",
    badge: 0,
  },
  {
    id: "notification",
    icon: <IoNotificationsSharp />,
    label: "Notifications",
    badge: 0,
  },
];

export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  {
    key: "1",
    label: "Profile",
    onClick: () => console.log("Profile clicked"),
  },
  {
    key: "2",
    label: "Settings",
    onClick: () => console.log("Settings clicked"),
  },
  {
    key: "3",
    label: "Logout",
    onClick: () => console.log("Logout clicked"),
  },
];
