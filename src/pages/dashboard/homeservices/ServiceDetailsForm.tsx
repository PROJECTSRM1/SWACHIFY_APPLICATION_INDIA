import { Modal, Form, Input, Select, DatePicker, Button, Card } from "antd";
import "./ServiceDetailsForm.css";
import dayjs from "dayjs";


interface ServiceRequestFormProps {
  open: boolean;
  image: string;
  title: string;
  description: string;
  includedList: string[];
  issues: string[];
  price: string;
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
  price,
  onCancel,
  onSubmit,
}: ServiceRequestFormProps) {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {

      const payload = {
    ...values,
    preferredDate: values.preferredDate?.format("YYYY-MM-DD"),
  };

  onSubmit(payload);
   

    setTimeout(() => {
      Modal.success({
        title: "Added to Cart",
        content: "Your service request has been successfully added to your cart.",
        centered: true,
      });
    }, 250);
    form.resetFields();

  };

  

  return (

    <Modal
  open={open}
  onCancel={onCancel}
  footer={null}
  width={620}   // 🔥 reduced width
  centered
  className="sdform-ant-modal"
>
  <Card className="sdform-ant-container">
    <h2 className="sdform-ant-title">{title}</h2>

    <div className="sdform-ant-header">
      <div>
        <img src={image} alt={title} className="sdform-ant-image" />
        <p className="sdform-ant-description">{description}</p>

        <div className="sdform-price-wrapper">
          <div className="sdform-price-title">Service Price</div>
          <div className="sdform-price-value">{price}</div>
        </div>
      </div>

      <div className="sdform-ant-header-info">
        <h4>What's Included</h4>
        <ul className="sdform-ant-list">
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
          className="sdform-ant-form"
        >
          <div className="sdform-ant-two-col">
            <Form.Item
              label="Issue"
              name="issueType"
              rules={[{ required: true, message: "Please select an issue" }]}
            >
              <Select
                placeholder="Select issue"
                options={issues.map((i) => ({ label: i, value: i }))}
              />
            </Form.Item>

            <Form.Item
              label="Urgency Level"
              name="urgencyLevel"
              rules={[{ required: true, message: "Please select urgency" }]}
            >
              <Select
                placeholder="Select urgency"
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                ]}
              />
            </Form.Item>
          </div>

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

          <div className="sdform-ant-two-col">
            <Form.Item
              label="Preferred Date"
              name="preferredDate"
              rules={[{ required: true, message: "Select a date" }]}
            >
              <DatePicker
  style={{ width: "100%" }}
  disabledDate={(current) => current && current < dayjs().startOf("day")}
/>

            </Form.Item>

            <Form.Item
              label="Preferred Time"
              name="preferredTime"
              rules={[{ required: true, message: "Select a time" }]}
            >
              <Select
                placeholder="Select time"
                options={[
                  { label: "Morning", value: "morning" },
                  { label: "Afternoon", value: "afternoon" },
                  { label: "Evening", value: "evening" },
                ]}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Service Address"
            name="serviceAddress"
            rules={[{ required: true, message: "Address required" }]}
          >
            <Input />
          </Form.Item>

          {/* BUTTONS */}
          <div className="sdform-ant-buttons">
            <Button onClick={onCancel} className="sdform-ant-cancel">
              Cancel
            </Button>

            <Button type="primary" htmlType="submit" className="sdform-ant-submit">
              Add to Cart
            </Button>
          </div>
        </Form>
      </Card>
    </Modal>




  );
}
