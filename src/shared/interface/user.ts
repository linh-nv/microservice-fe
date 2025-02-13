export interface UserChat {
  avatar: string;
  name: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface FriendProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  params: {};
  profile: {
    id: string;
    avatarUrl: string;
    bio: string;
    birthday: string;
    location: string;
  };
  friendProfiles: [
    {
      id: string;
      avatarUrl: string;
      bio: string;
      birthday: string;
      location: string;
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        status: string;
        params: {};
        fullName: string;
      };
    }
  ];
  fullName: string;
}
