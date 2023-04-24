import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import HelpCenterPage from "../../app/components/templates/helpCenterPage/HelpCenterPage";

const HelpCenter = () => {
  return (
    <DefaultLayout>
      <HelpCenterPage />
    </DefaultLayout>
  );
};

export default HelpCenter;