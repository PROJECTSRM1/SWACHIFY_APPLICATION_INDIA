import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  // Row,   // ✅ ADD
  // Col,   // ✅ ADD
} from "antd";

import dayjs from "dayjs";
import { useCart } from "../../../context/CartContext";
import { useEffect, useState } from "react";

interface IssueOption {
  label: string;
  price: number;
}

interface ServiceRequestFormProps {
  open: boolean;
  image: string;
  title: string;
  description: string;
  includedList: string[];
  issues: IssueOption[];
  totalprice: string;
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

export default function ServiceRequestForm({
  open,
  image,
  title,
  description,
  includedList,
  issues,
  totalprice,
  onCancel,
  onSubmit,
}: ServiceRequestFormProps) {
  const [form] = Form.useForm();
  const { addToCart } = useCart();

  const basePrice = Number(String(totalprice).replace(/[^0-9.]/g, ""));
  const [extraIssuePrice, setExtraIssuePrice] = useState(0);

  // ---------------- OTP STATES ----------------
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [verified, setVerified] = useState(false);
  // ---------------------------------------------

  useEffect(() => {
    if (open) document.body.classList.add("sw-hs-scrolling-disable");
    else document.body.classList.remove("sw-hs-scrolling-disable");

    return () => document.body.classList.remove("sw-hs-scrolling-disable");
  }, [open]);

  const handleFinish = (values: any) => {
    const selectedIssue = issues.find((i) => i.label === values.issueType);
    const extraPrice = selectedIssue?.price ?? 0;
    const finalPrice = basePrice + extraPrice;

   const payload = {
  id: Date.now(),
  title,
  image,
  quantity: 1,
  price: finalPrice,
  totalPrice: finalPrice,

  // ✅ REQUIRED BY CartItem
  customerName: values.fullName,
  email: values.email,
  contact: values.mobile,
  address: values.locationArea,
  instructions: values.problemDescription,

  deliveryType: "home",

  // ✅ CRITICAL FIX (THIS IS THE BUG)
  deliveryDate: values.preferredDate.format("YYYY-MM-DD"),
  deliveryTime: values.preferredTime.split("-")[0], // "09:00"


  basePrice,
  issueExtraPrice: extraPrice,
};

    addToCart(payload);
    onSubmit(payload);

    // Keep Add-to-Cart modal as you requested
    Modal.success({
      title: "Added to Cart",
      content: "Your service has been successfully added to your cart",
      centered: true,
    });

    // RESET OTP
    setVerified(false);
    setIsOtpSent(false);
    setPhoneOtp("");
    setEmailOtp("");

    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={620}
      centered
      closable={false}
      className="sw-hs-sdform-ant-modal"
    >
      <div className="sw-hs-sdform-ant-container">
        
        <button
          type="button"
          className="sw-hs-sdform-ant-close"
          onClick={onCancel}
        >
          ×
        </button>

        <h2 className="sw-hs-sdform-ant-title">{title}</h2>

        <div className="sw-hs-sdform-ant-header">
          <div>
            <img src={image} alt={title} className="sw-hs-sdform-ant-image" />
            <p className="sw-hs-sdform-ant-description">{description}</p>

            <div className="sw-hs-sdform-price-wrapper">
              <div className="sw-hs-sdform-price-title">Service Price</div>
              <div className="sw-hs-sdform-price-value">
                ₹{basePrice + extraIssuePrice}
              </div>
            </div>
          </div>

          <div className="sw-hs-sdform-ant-header-info">
            <h4>What's Included</h4>
            <ul className="sw-hs-sdform-ant-list">
              {includedList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="sw-hs-sdform-ant-form"
        >
          {/* NAME + EMAIL */}
          <div className="sw-hs-sdform-ant-two-col">
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || !value.trim())
                      return Promise.reject("Full name is required");

                    const parts = value.trim().split(/\s+/);
                    if (parts.length < 2)
                      return Promise.reject("Please enter first and last name");

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter valid email" },
              ]}
            >
              <Input placeholder="Enter email" suffix={verified ? "✔" : null} />
            </Form.Item>
          </div>

          {/* PHONE + ISSUE */}
          <div className="sw-hs-sdform-ant-two-col">
            <Form.Item
  label="Phone"
  name="mobile"
  rules={[
    { required: true, message: "Phone no is required" },
    { pattern: /^[0-9]{10}$/, message: "Enter valid 10 digit number" },
  ]}
>
  <Input
    addonBefore="+91"
    placeholder="Enter Phone Number"
    maxLength={10}
    onChange={(e) => {
      const onlyDigits = e.target.value.replace(/\D/g, "");
      form.setFieldsValue({ mobile: onlyDigits });
    }}
    suffix={
      !verified && !isOtpSent ? (
        <Button
          type="link"
          className="sw-otp-send-btn"
          onClick={() => {
            if (!form.getFieldValue("mobile") || !form.getFieldValue("email")) {
              message.error("Enter email & mobile first");
              return;
            }
            setIsOtpSent(true);
            message.success("OTP Sent (Demo Mode)");
          }}
        >
          Send OTP
        </Button>
      ) : verified ? (
        <span className="sw-otp-tick">✔</span>
      ) : null
    }
  />
</Form.Item>

            <Form.Item
              label="Issue"
              name="issueType"
              rules={[{ required: true, message: "Please select an issue" }]}
            >
              <Select
                placeholder="Select issue"
                options={issues.map((i) => ({ label: i.label, value: i.label }))}
                size="middle"
                onChange={(value) => {
                  const selected = issues.find((i) => i.label === value);
                  setExtraIssuePrice(selected?.price ?? 0);
                }}
              />
            </Form.Item>
          </div>

          {/* OTP ROW */}
          {/* {isOtpSent && !verified && (
  <Row gutter={16} align="middle" className="sw-otp-row">
    <Col xs={24} md={7}>
      <Form.Item label="Phone OTP" className="mb-0">
        <Input
          maxLength={4}
          placeholder="Enter Phone OTP"
          value={phoneOtp}
          onChange={(e) =>
            setPhoneOtp(e.target.value.replace(/\D/g, ""))
          }
        />
      </Form.Item>
    </Col>

    <Col xs={24} md={7}>
      <Form.Item label="Email OTP" className="mb-0">
        <Input
          maxLength={4}
          placeholder="Enter Email OTP"
          value={emailOtp}
          onChange={(e) =>
            setEmailOtp(e.target.value.replace(/\D/g, ""))
          }
        />
      </Form.Item>
    </Col>

    <Col xs={24} md={6}>
      <Form.Item label=" " className="mb-0">
        <Button
          type="primary"
          className="sw-otp-verify-btn"
          onClick={() => {
            if (phoneOtp.length !== 4 || emailOtp.length !== 4) {
              message.error("OTP must be 4 digits");
              return;
            }

            if (phoneOtp === emailOtp) {
              message.error("Phone OTP & Email OTP must be different");
              return;
            }

            message.success("OTP Verified");
            setVerified(true);
            setIsOtpSent(false);
          }}
        >
          Verify OTP
        </Button>
      </Form.Item>
    </Col>
  </Row>
)} */}

          {/* OTP ROW */}
        {isOtpSent && !verified && (
  <div className="sw-hs-otp-row">
    <Form.Item label="Phone OTP" className="otp-item">
      <Input
        maxLength={4}
        placeholder="Enter Phone OTP"
        value={phoneOtp}
        onChange={(e) =>
          setPhoneOtp(e.target.value.replace(/\D/g, ""))
        }
      />
    </Form.Item>

    <Form.Item label="Email OTP" className="otp-item">
      <Input
        maxLength={4}
        placeholder="Enter Email OTP"
        value={emailOtp}
        onChange={(e) =>
          setEmailOtp(e.target.value.replace(/\D/g, ""))
        }
      />
    </Form.Item>

    {/* ✅ Button inside Form.Item (no inline CSS) */}
    <Form.Item
      label=" "
      colon={false}
      className="sw-hs-otp-verify"
    >
      <Button
        type="primary"
        className="sw-hs-black-btn"
        onClick={() => {
          if (phoneOtp.length !== 4 || emailOtp.length !== 4) {
            message.error("OTP must be 4 digits");
            return;
          }

          if (phoneOtp === emailOtp) {
            message.error("Phone OTP & Email OTP must be different");
            return;
          }

          message.success("OTP Verified");
          setVerified(true);
          setIsOtpSent(false);
        }}
      >
        Verify OTP
      </Button>
    </Form.Item>
  </div>
         )}



     
          <Form.Item
            label="Problem Description"
            name="problemDescription"
            rules={[{ required: true, message: "Enter problem details" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Location / Area"
            name="locationArea"
            rules={[{ required: true, message: "Location is required" }]}
          >
            <Input />
          </Form.Item>

          {/* DATE + TIME */}
          <div className="sw-hs-sdform-ant-two-col">
            <Form.Item
              label="Preferred Date"
              name="preferredDate"
              rules={[{ required: true, message: "Select a date" }]}
            >
              <DatePicker
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
              />
            </Form.Item>

            <Form.Item
              label="Preferred Time Slot"
              name="preferredTime"
              rules={[{ required: true, message: "Select a time slot" }]}
            >
              <Select
                placeholder="Select time slot"
                options={[
                  { label: "09:00 AM - 11:00 AM", value: "09:00-11:00" },
                  { label: "11:00 AM - 01:00 PM", value: "11:00-13:00" },
                  { label: "01:00 PM - 03:00 PM", value: "13:00-15:00" },
                  { label: "02:05 PM - 05:00 PM", value: "14:05-17:00" },
                  { label: "05:00 PM - 07:00 PM", value: "17:00-19:00" },
                ]}
              />
            </Form.Item>
          </div>

          {/* BUTTONS */}
          <div className="sw-hs-sdform-ant-buttons">
            <Button onClick={onCancel}>Cancel</Button>

            <Button
              type="primary"
              htmlType="submit"
              disabled={!verified}
            >
              Add to Cart
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}