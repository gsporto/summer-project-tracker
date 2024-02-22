"use server";

import { User } from "@/app/types";
import { kv } from "@vercel/kv";
import { revalidateTag } from "next/cache";
import { getCachedUsers } from "../query/users";

async function updateUser(formData: FormData) {

  console.log(formData)

  const users = await getCachedUsers();

  const week = Number(formData.get('week'));

  users.map((user)=>{
    const weekFinded = user.weeks.find((u)=> u.id === week)
    if(weekFinded) {
      weekFinded.status = formData.get(user.id) === 'on' ? 'completed' : 'uncompleted';
    }
  })

  await kv.set<Array<User>>("users", users);

  revalidateTag("users");
}

export { updateUser };
