import React, { useEffect, useState } from "react";
import styles from "./profilePage.module.css";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import { Avatar } from "antd";
import Head from "next/head";
import SkeletonLoader from "../../modules/SkeletonLoader";
import TicketTable from "./components/TicketTable";
import CustomButton from "@/app/components/elements/CustomButton";

const ProfilePage = () => {
  const { error, sendRequest, clearError, isLoading } = useHttpClient();
  const [clearFilters, setClearFilter] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [role, setRole] = useState("");
  const [badgeColor, setBadgeColor] = useState({});
  const badgeColors = [
    { bg: "#E57373", text: "#FFFFFF" }, // red
    { bg: "#BA68C8", text: "#FFFFFF" }, // purple
    { bg: "#4DB6AC", text: "#FFFFFF" }, // teal
    { bg: "#FFB74D", text: "#FFFFFF" }, // orange
    { bg: "#7986CB", text: "#FFFFFF" }, // indigo
    { bg: "#A1887F", text: "#FFFFFF" }, // brown
    { bg: "#4DD0E1", text: "#FFFFFF" }, // cyan
    { bg: "#FF8A65", text: "#FFFFFF" }, // deep orange
    { bg: "#9575CD", text: "#FFFFFF" }, // deep purple
    { bg: "#4FC3F7", text: "#FFFFFF" }, // light blue
  ];

  useEffect(() => {
    const sendFetchRequest = async () => {
      const result = await sendRequest("/support-user/get-user-profile");
      console.log(typeof result.supportUser.roles);
      if (Object.values(result.supportUser.roles).includes(1541)) {
        setRole("ADMIN");
      } else if (Object.values(result.supportUser.roles).includes(8458)) {
        setRole("SALES");
      } else if (Object.values(result.supportUser.roles).includes(7489)) {
        setRole("SUPPORT");
      } else if (Object.values(result.supportUser.roles).includes(3894)) {
        setRole("EDITOR");
      }
      setProfileData(result);
    };
    sendFetchRequest();
    setBadgeColor(badgeColors[Math.floor(Math.random() * badgeColors.length)]);
  }, []);

  return (
    <>
      <Head>
        <title>Profile | Drunken Bytes</title>
        <meta
          name="description"
          content="Get access to your personalized profile page on Drunken Bytes. View your account information, update your profile, and manage your settings."
        />
        <meta
          name="keywords"
          content="profile page, account information, user settings, personalization, manage account, Drunken Bytes"
        />
        <link rel="canonical" href="https://drunkenbytes.vercel.app/profile" />
      </Head>
      {role === "" ? (
        <SkeletonLoader />
      ) : (
        <div className={styles.profile}>
          <h1 className={styles.heading}>Drunken Bytes Profile</h1>
          <p className={styles.paragraph}>
            Here you can find your profile information
          </p>
          <div className={styles.profileDiv}>
            <div className={styles.headerDiv}>
              <strong>Support User Profile</strong>
            </div>
            <div className={styles.contentDiv}>
              <div className={styles.imageDiv}>
                <Avatar
                  className={styles.avatar}
                  style={{
                    backgroundColor: badgeColor?.bg,
                    color: badgeColor?.text,
                  }}
                >
                  {profileData?.supportUser.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('')}
                </Avatar>
              </div>
              <div className={styles.informationDiv}>
                <div className={styles.informationContent}>
                  <p>Name</p>
                  <p>{profileData?.supportUser.name}</p>
                </div>
                <div className={styles.informationContent}>
                  <p>Email</p>
                  <p>{profileData?.supportUser.email}</p>
                </div>
                <div className={styles.informationContent}>
                  <p>Role </p>
                  <p>&nbsp;&nbsp;{role}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.secondFold} tab-pane`}>
      <div className={styles.buttonDiv}>
        <CustomButton
          type="Gradient"
          text="Clear All Filter"
          onClickHandler={() => {
            setClearFilter(!clearFilters);
          }}
        />
      </div>
      <TicketTable clearFilters={clearFilters} />
    </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
