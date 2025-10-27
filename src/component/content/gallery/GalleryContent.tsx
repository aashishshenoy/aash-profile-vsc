import React from "react";
import UnderConstructionContent from "../../common/UnderConstructionContent";
import Breadcrumb from "../../common/Breadcrumb";

const GalleryContent: React.FC = () => {
  return (
    <div className="p-6 w-full">
      <Breadcrumb currentPageTitle="Gallery" />
      <UnderConstructionContent currentPageTitle="Gallery" />
    </div>
  );
};

export default GalleryContent;
