import { Modal, Form, Input, Select, DatePicker, Button } from "antd";

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

  useEffect(() => {
  if (open) {
    document.body.classList.add("sw-hs-scrolling-disable");
  } else {
    document.body.classList.remove("sw-hs-scrolling-disable");
  }

  return () => {
    document.body.classList.remove("sw-hs-scrolling-disable");
  };
}, [open]);


  const handleFinish = (values: any) => {
    const selectedIssue = issues.find((i) => i.label === values.issueType);
    const extraPrice = selectedIssue?.price ?? 0;
    const finalPrice = basePrice + extraPrice;

    const payload = {
      id: Date.now(),
      title,
      image,
      totalPrice: finalPrice,
      basePrice,
      issueExtraPrice: extraPrice,
      ...values,
      preferredDate: values.preferredDate?.format("YYYY-MM-DD"),
    };

    addToCart(payload);
    onSubmit(payload);

    Modal.success({
      title: "Added to Cart",
      content: "Your service has been successfully added to your cart",
      centered: true,
    });

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
        {/* custom close (X) */}
        <button
          type="button"
          className="sw-hs-sdform-ant-close"
          onClick={onCancel}
        >
          ×
        </button>

        <h2 className="sw-hs-sdform-ant-title">{title}</h2>

        <div className="sw-hs-sdform-ant-header">
          {/* LEFT SIDE */}
          <div>
            <img
              src={image}
              alt={title}
              className="sw-hs-sdform-ant-image"
            />
            <p className="sw-hs-sdform-ant-description">{description}</p>

            <div className="sw-hs-sdform-price-wrapper">
              <div className="sw-hs-sdform-price-title">Service Price</div>
              <div className="sw-hs-sdform-price-value">
                ₹{basePrice + extraIssuePrice}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="sw-hs-sdform-ant-header-info">
            <h4>What's Included</h4>
            <ul className="sw-hs-sdform-ant-list">
              {includedList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* FORM SECTION */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="sw-hs-sdform-ant-form"
        >
          {/* FULL NAME + EMAIL SIDE BY SIDE */}
          <div className="sw-hs-sdform-ant-two-col">
            <Form.Item
              label="Full Name"
              name="fullName"
              className="sw-hs-sdform-ant-form-item"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || !value.trim()) {
                      return Promise.reject("Full name is required");
                    }

                    const parts = value.trim().split(/\s+/);
                    if (parts.length < 2) {
                      return Promise.reject("Please enter first and last name");
                    }

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
              className="sw-hs-sdform-ant-form-item"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter valid email" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </div>

          <div className="sw-hs-sdform-ant-two-col">
            <Form.Item
              label="Phone"
              name="phone"
              className="sw-hs-sdform-ant-form-item"
              rules={[
                { required: true, message: "Phone no is required" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Enter valid 10 digit phone number",
                },
              ]}
            >
              <Input placeholder="Enter Phone Number" maxLength={10} />
            </Form.Item>

            <Form.Item
              label="Issue"
              name="issueType"
              className="sw-hs-sdform-ant-form-item"
              rules={[{ required: true, message: "Please select an issue" }]}
            >
              <Select
                placeholder="Select issue"
                options={issues.map((i) => ({
                  label: i.label,
                  value: i.label,
                }))}
                size="middle"
                onChange={(value) => {
                  const selected = issues.find((i) => i.label === value);
                  setExtraIssuePrice(selected?.price ?? 0);
                }}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Problem Description"
            name="problemDescription"
            className="sw-hs-sdform-ant-form-item"
            rules={[{ required: true, message: "Enter problem details" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Location / Area"
            name="locationArea"
            className="sw-hs-sdform-ant-form-item"
            rules={[{ required: true, message: "Location is required" }]}
          >
            <Input />
          </Form.Item>

          <div className="sw-hs-sdform-ant-two-col">
            <Form.Item
              label="Preferred Date"
              name="preferredDate"
              className="sw-hs-sdform-ant-form-item"
              rules={[{ required: true, message: "Select a date" }]}
            >
              <DatePicker
                className="sw-hs-sdform-ant-date-picker"
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
              />
            </Form.Item>

            <Form.Item
              label="Preferred Time Slot"
              name="preferredTime"
              className="sw-hs-sdform-ant-form-item"
              rules={[{ required: true, message: "Select a time slot" }]}
            >
              <Select
                placeholder="Select time slot"
                options={[
                  { label: "09:00 AM - 11:00 AM", value: "09:00-11:00" },
                  { label: "11:00 AM - 01:00 PM", value: "11:00-13:00" },
                  { label: "01:00 PM - 03:00 PM", value: "13:00-15:00" },
                  { label: "03:00 PM - 05:00 PM", value: "15:00-17:00" },
                  { label: "05:00 PM - 07:00 PM", value: "17:00-19:00" },
                ]}
                size="middle"
              />
            </Form.Item>
          </div>

          {/* BUTTONS */}
          <div className="sw-hs-sdform-ant-buttons">
            <Button
              onClick={onCancel}
              className="sw-hs-sdform-ant-cancel"
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className="sw-hs-sdform-ant-submit"
            >
              Add to Cart
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
