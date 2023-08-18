import { decodeJWT } from "@/utils/authenticate";
import { prisma } from "@/utils/prisma";
import { Link } from "@radix-ui/themes";
import { cookies } from "next/headers";
import NextLink from "next/link";
import { Dropdown } from "./dropdown";

export const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <header className="fixed w-screen">
      <div className="max-w-screen-lg mx-auto px-4 h-14 flex items-center">
        <div className="mr-4">CoolLogo</div>
        <a>Accounts</a>

        <div className="ml-auto">
          {user ? (
            <Dropdown userEmail={user.email} />
          ) : (
            <Link asChild>
              <NextLink href="/auth/signin">Sign In</NextLink>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

const getCurrentUser = () => {
  const cookiesList = cookies();
  const cookie = cookiesList.get("uid");
  if (!cookie || !cookie.value) {
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
