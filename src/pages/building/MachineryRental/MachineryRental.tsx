import React, { useState } from "react";
//import '../MachineryRental/MachineryRental.css';
import MachineryDetails from "./FormMachineryRental";
import excavatorImg from "../../../assets/Building/excavator.jpg";
import loaderImg from "../../../assets/Building/loader.jpg";
import craneImg from "../../../assets/Building/crane.jpg";
import mixerImg from "../../../assets/Building/concretemixer.jpg";
const machinery = [
{ id: 1, title: "Excavators Rental", description: "Heavy-duty excavators suitable for construction and earthwork tasks.", price: "150", img: excavatorImg },
{ id: 2, title: "Loader Rental", description: "Efficient loaders for material handling, lifting and site work.", price: "200", img: loaderImg },
{ id: 3, title: "Crane Rental", description: "High-capacity cranes for lifting heavy materials and machinery.", price: "300", img: craneImg },
{ id: 4, title: "Concrete Mixer Rental", description: "Portable and truck-mounted concrete mixers for efficient construction.", price: "120", img: mixerImg },
];
const MachineryRental: React.FC = () => {
const [selectedId, setSelectedId] = useState<number | null>(null);
return (
<div className="sw-br-machinery-wrapper">
    <div className="sw-br-machinery-header">
    <h2>Construction Equipment Rental</h2>
    <p>{machinery.length} services available</p>
  </div>

<<<<<<< HEAD
  <div className="sw-br-machinery-grid">
    {machinery.map((item) => (
      <div className="sw-br-machinery-card" key={item.id}>
        
        <div className="sw-br-card-img">
          <img src={item.img} alt={item.title} />
=======
interface FormProps {
  id?: number;
  onClose?: () => void;
}

const MachineryDetails: React.FC<FormProps> = ({ id = 1,
  onClose }) => {
  const machine = machinery.find((item) => item.id === id);
  const { addToCart } = useCart();
  const formRef = useRef<HTMLFormElement>(null);

  if (!machine) return null;

  const [quantity, setQuantity] = useState(0);
  const [rentalType, setRentalType] = useState("");
  const [fuelSupply, setFuelSupply] = useState(false);

  // ✅ OTP STATE (ADDED)
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [, setOtpError] = useState("");



  const basePrice = Number(machine.price) * quantity;
  const operatorCharge = rentalType === "With Operator" ? 150 : 0;
  const fuelCharge = fuelSupply ? 200 : 0;
  const totalPrice = basePrice + operatorCharge + fuelCharge;

  const handleReset = () => {
    formRef.current?.reset();
    setQuantity(1);
    setRentalType("");
    setFuelSupply(false);
    setShowOtpFields(false);
  };

  const handleAddToCart = () => {
  const form = formRef.current!;

  const preferredDate = (form.elements.namedItem(
    "preferredDate"
  ) as HTMLInputElement)?.value;

  const preferredTime = (form.elements.namedItem(
    "preferredTime"
  ) as HTMLSelectElement)?.value;

  addToCart({
    id: Date.now(),
    title: machine.title,
    image: machine.img,
    quantity,
    price: machine.price,
    totalPrice,

    basePrice,
    operatorCharge,
    fuelCharge,

    customerName: form.customerName.value,
    email: form.email.value,
    contact: form.contact.value,
    address: form.address.value,
    instructions: form.instructions.value,

    deliveryType: rentalType,
    deliveryDate: preferredDate,
    deliveryTime: preferredTime.split("-")[0], // ✅ "09:00"

    // ✅ SAME AS SERVICE FORM
    paymentDone: true,
    workStatus: "pending",
  });

  message.success("Item added to cart");
  onClose?.();
}; 


  return (
    <div className="sw-br-mach-details-modal">
      <div className="sw-br-mach-details-box">

        <div className="sw-br-mach-details-header">
          <h2>{machine.title}</h2>
          <button className="sw-br-mach-close-btn" onClick={onClose}>✕</button>
>>>>>>> main
        </div>

        <h3>{item.title}</h3>
        <p className="sw-br-machinery-desc">{item.description}</p>

        <div className="sw-br-machinery-bottom">
          <p className="sw-br-machinery-price">{item.price}</p>

          <button
            className="sw-br-machinery-btn"
            onClick={() => setSelectedId(item.id)}
          >
            View Details
          </button>

        </div>
      </div>
    ))}
  </div>

  {selectedId !== null && (
    <MachineryDetails 
      id={selectedId} 
      onClose={() => setSelectedId(null)} 
    />
  )}

</div> 
);
};
export default MachineryRental;