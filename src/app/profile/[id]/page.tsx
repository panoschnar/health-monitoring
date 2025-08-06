"use client";

import useSWR from "swr";
import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import { IUser } from "@/utils/interfaces";
import styles from "./profile.module.css";
import { fetcher } from "@/utils/helper";
import Link from "next/link";
import { backArrowIcon, addIcon } from "../../../../public/icons";
import button from "../../buttons.module.css";

const page = () => {
  const { access_token, isLoggedIn } = useUser();
  const { id } = useParams();

  const {
    data: user,
    error,
    isLoading,
  } = useSWR<IUser>(
    isLoggedIn && access_token && id ? [`/api/user`, access_token, id] : null,
    ([url, token, userId]) =>
      fetcher<IUser>(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: token, id: userId }),
      })
  );

  if (isLoading) return <div className={styles.container}>Loading user...</div>;
  if (error || !user)
    return <div className={styles.container}>{error?.message}</div>;

  return (
    <div className={styles.container}>
       <div className={styles.titleBox}>
        <Link className={button.primary} href={"/"}>
          {backArrowIcon}
        </Link>
        
        </div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default page;
