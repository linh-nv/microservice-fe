import { GoHomeFill } from "react-icons/go";
import { HiUserGroup } from "react-icons/hi";
import {
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
    path: routes.friend.home,
    icon: <HiUserGroup />,
    label: "Groups",
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
