import { decodeJWT } from "@/utils/authenticate";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

const getCurrentUser = () => {
  const cookiesList = cookies();
  const cookie = cookiesList.get("uid");
  if (!cookie) {
    return null;
  }

  const userID = decodeJWT(cookie.value);
  if (!userID) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id: userID,
    },
  });
};

export const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <header className="fixed w-screen">
      <div className="max-w-screen-lg mx-auto px-4 h-14 flex items-center">
        <div className="mr-4">CoolLogo</div>
        <a className="mr-4">link a</a>
        <a className="mr-4">link a</a>
        <a>link b</a>

        <div className="ml-auto">
          {user ? <a>{user.email}</a> : <a>Sign Up</a>}
        </div>
      </div>
    </header>
  );
};
