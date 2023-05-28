import { useQuery } from "@apollo/client";
import { User } from "@prisma/client";
import { GET_USER } from "graphql/client/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ExtendedUser } from "types";

const useUserData=()=>{
    const {data:session, status}=useSession();
    const userEmail=session?.user?.email;
    const {data:userData, loading}=useQuery<{user:ExtendedUser}>(GET_USER,{variables:{
      email: userEmail,
    },
  });
    return{
        loading,
        status,
        session,
        userData,
        role:  userData?.user.role.name,     
    }
}
export {useUserData}