"use client"
import { signOut, useSession } from "@/lib/auth-client";
import { Button, Spinner } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {

    const {data:session, isPending, error} = useSession();
    const router = useRouter();
    console.log("navbar session", session, error);

    if(isPending){
       return (
         <div className="flex flex-col items-center gap-2">
           <Spinner size="xl" />
           <span className="text-xs text-muted">Loading....</span>
         </div>
       );
    }


    const navLinks = (
      <>
        <li>
          <Link href={'/dashboard'}>DashBoard</Link>
        </li>
        {session?.user && <li>
          <Link href={'/profile'}>Profile</Link>
        </li>}
        <li>
          <Link href={'/features'}>Features</Link>
        </li>
      </>
    );

    const handelSignOut = async()=>{
      await signOut({
        fetchOptions: {
          onSuccess: () =>{
            router.push("/sign-in");
          }
        }
      });

    }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link href={"/"} className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {session?.user ? (
          <div className="flex items-center gap-3">Welcome {session?.user.name}<Button onClick={()=>handelSignOut()}>Sign Out</Button></div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href={"/sign-in"}>
              <Button>Sign In</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
