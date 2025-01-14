import React from "react";
import { PageLayout, Profile } from "../components";
import DraftView from "../components/dashboard/draft-store-dashboard";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const storeData = useSelector((state) =>
    state.stores && state.stores.length > 0 ? state.stores[state.storeID] : {}
  );
  const storeExists = useSelector((state) => state.storeExists);

  return (
    <PageLayout>
      {storeExists && storeData && storeData?.status === "Draft" ? (
        <DraftView />
      ) : (
        <Profile />
      )}
    </PageLayout>
  );
};

export default ProfilePage;
