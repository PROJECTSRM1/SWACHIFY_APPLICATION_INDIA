import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import "../../../index.css";
import dayjs from "dayjs";
import { useCart } from "../../../context/CartContext";

interface ServiceRequestFormProps {
  open: boolean;
  image: string;
  title: string;
  description: string;
  includedList: string[];
  issues: string[];
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

  const handleFinish = (values: any) => {
    const payload = {
      id: Date.now(),
      title,
      image,
      totalPrice: Number(String(totalprice).replace(/[^0-9.]/g, "")),
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
      closable={false} // we'll use our own close button
      styles={{
        body: { padding: 0 },
        content: { padding: 0, borderRadius: 10, overflow: "hidden" },
      }}
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
              <div className="sw-hs-sdform-price-value">{totalprice}</div>
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
          {/* {title.toLowerCase().includes("cleaning") && (
            <Form.Item
              label="Cleaning Type"
              name="cleaningType"
              className="sw-hs-sdform-ant-form-item"
              style={{ marginBottom: 10 }}
              rules={[{ required: true, message: "Please select cleaning type" }]}
            >
              <Select
                placeholder="Select Cleaning type"
                options={[
                  { label: "Regular Cleaning", value: "regularcleaning" },
                  { label: "Deep Cleaning", value: "deepcleaning" },
                ]}
                size="middle"
              />
            </Form.Item>
          )} */}

          <div className="sw-hs-sdform-ant-two-col">
            <Form.Item
              label="Issue"
              name="issueType"
              className="sw-hs-sdform-ant-form-item"
              style={{ marginBottom: 10 }}
              rules={[{ required: true, message: "Please select an issue" }]}
            >
              <Select
                placeholder="Select issue"
                options={issues.map((i) => ({ label: i, value: i }))}
                size="middle"
              />
            </Form.Item>

            <Form.Item
              label="Urgency Level"
              name="urgencyLevel"
              className="sw-hs-sdform-ant-form-item"
              style={{ marginBottom: 10 }}
              rules={[{ required: true, message: "Please select urgency" }]}
            >
              <Select
                placeholder="Select urgency"
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                ]}
                size="middle"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Problem Description"
            name="problemDescription"
            className="sw-hs-sdform-ant-form-item"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Enter problem details" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Location / Area"
            name="locationArea"
            className="sw-hs-sdform-ant-form-item"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Location is required" }]}
          >
            <Input />
          </Form.Item>

          <div className="sw-hs-sdform-ant-two-col">
            <Form.Item
              label="Preferred Date"
              name="preferredDate"
              className="sw-hs-sdform-ant-form-item"
              style={{ marginBottom: 10 }}
              rules={[{ required: true, message: "Select a date" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
              />
            </Form.Item>

            <Form.Item
              label="Preferred Time"
              name="preferredTime"
              className="sw-hs-sdform-ant-form-item"
              style={{ marginBottom: 10 }}
              rules={[{ required: true, message: "Select a time" }]}
            >
              <Select
                placeholder="Select time"
                options={[
                  { label: "Morning", value: "morning" },
                  { label: "Afternoon", value: "afternoon" },
                  { label: "Evening", value: "evening" },
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


