// import React from "react";
import { useState } from "react";


import { Card, Button } from "antd";
import type { FC } from "react";


import MaterialSupply from "../building/MaterialSupply/ModMaterialSupply";
import MachineryRental from "../building/MachineryRental/MachineryRental";
import Transpotation from "../building/Transpotation/Transpotation";
import ModalWrapper from "../../components/ModalWrapper";


import materialImg from "../../assets/Building/material supply.jpg";
import rentalImg from "../../assets/Building/rental.jpg";
import transportImg from "../../assets/Building/transportation.jpg";
import bulkImg from "../../assets/Building/BulkProcurement.jpg";


import "./building.css";


interface ServiceItem {
title: string;
description: string;
image: string;
route?: any;
key: string; // added key to identify popup content
}


const services: ServiceItem[] = [
{
title: "Material Supply",
description: "Quality construction materials with verified vendors",
image: materialImg,
route: "/app/material-supply",
key: "material"
},
{
title: "Machinery Rental",
description: "Rent construction equipment with operator support",
image: rentalImg,
route: "/app/machinery-rental",
key: "machinery"
},
{
title: "Transportation",
description: "Material pickup and delivery with GPS tracking",
image: transportImg,
route: "/app/Transpotation",
key: "transport"
},
{
title: "Bulk Procurement",
description: "Large-scale orders with vendor management",
image: bulkImg,
route: "/app/bulk-procurement",
key: "bulk"
}
];


const ConstructionServices: FC = () => {
const [selectedService, setSelectedService] = useState<string | null>(null);


const renderPopupContent = () => {
switch (selectedService) {
case "material":
return <MaterialSupply />;
case "machinery":
return <MachineryRental />;
case "transport":
return <Transpotation />;
case "bulk":
return <div style={{ padding: 20 }}>Bulk Procurement Coming Soon</div>;
default:
return null;
}
};


return (
<div className="cs-wrapper">
<div className="cs-header1">
<span className="cs-title">Building & Construction Raw Materials</span>
<span className="cs-subtitle">{services.length}services available</span>
</div>


<div className="cs-grid">
{services.map((service, index) => (
<Card
key={index}
hoverable
className="cs-card"
cover={<img src={service.image} alt={service.title} className="cs-image" />}
>
<h3 className="cs-card-title">{service.title}</h3>
<p className="cs-card-desc">{service.description}</p>


<Button
// type="default"
block
className="cs-button1"
onClick={() => setSelectedService(service.key)}
>
View Details
</Button>
</Card>
))}
</div>


{selectedService && (
<ModalWrapper onClose={() => setSelectedService(null)}>
{renderPopupContent()}
</ModalWrapper>
)}
</div>
);
};


export default ConstructionServices;