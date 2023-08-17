import { signJWT, signin } from "@/utils/authenticate";
import { cookies } from "next/headers";
import { authSchema } from "../schema";
import { Form } from "../form";
import { redirect } from "next/navigation";

export default function SignIn() {
  const handleSubmit = async (data: FormData) => {
    "use server";

    const { email, password } = authSchema.parse(data);
    const user = await signin(email, password);
    if (!user) {
      return {
        error: "Couldn't validate credentials. Please try again.",
      };
    }

    const jwt = signJWT(user.id);
    cookies().set("uid", jwt);
    redirect("/");
  };

  return <Form handleSubmit={handleSubmit} type="signin" />;
}
