// import React, { useEffect, useState } from "react";
import GateHeaderTable from "./components/GateHeaderTable";
import ContentCard from "@/components/custom/CardContent"; // Adjust the import path as needed

const UserPage = () => {
  return (
    <section className="p-6 mx-5 mt-[70px] rounded-lg w-full">
      <ContentCard>
        <div className="py-5">
          <GateHeaderTable />
        </div>
      </ContentCard>
    </section>
  );
};

export default UserPage;