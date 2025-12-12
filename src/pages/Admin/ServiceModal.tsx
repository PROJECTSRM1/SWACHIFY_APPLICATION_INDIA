// src/pages/Admin/services/ServiceModal.tsx

import {
  Modal,
  Table,
  Button,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import FormBuilder from "./FormBuilder";
import type { Category, SubCategory, SubService } from "./servicesData";

interface Props {
  category: Category;
  onClose: () => void;
  onUpdate: (updatedCategory: Category) => void;
}

const ServiceModal = ({ category, onClose, onUpdate }: Props) => {
  const [selectedSubCat, setSelectedSubCat] = useState<SubCategory | null>(null);

  const [isAddSubOpen, setAddSubOpen] = useState(false);
  const [isEditSubOpen, setEditSubOpen] = useState<SubCategory | null>(null);

  const [isAddServiceOpen, setAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setEditServiceOpen] =
    useState<SubService | null>(null);

  const [activeFormSub, setActiveFormSub] = useState<SubCategory | null>(null);
  const [activeFormService, setActiveFormService] =
    useState<SubService | null>(null);

  const [form] = Form.useForm();
  const [serviceForm] = Form.useForm();

  const refreshParent = () => {
    onUpdate({
      ...category,
      subcategories: [...category.subcategories].map((sub) => ({
        ...sub,
        services: [...sub.services],
      })),
    });
  };

  /** ---------------- SUB CATEGORY CRUD ---------------- */
  const addSubCategory = () => {
    form.validateFields().then((values) => {
      category.subcategories.push({
        id: `SUB${Date.now()}`,
        name: values.name,
        description: values.description,
        services: [],
      });
      form.resetFields();
      setAddSubOpen(false);
      refreshParent();
      message.success("Subcategory added!");
    });
  };

  const updateSubCategory = () => {
    form.validateFields().then((values) => {
      if (isEditSubOpen) {
        isEditSubOpen.name = values.name;
        isEditSubOpen.description = values.description;
        refreshParent();
        setEditSubOpen(null);
        message.success("Subcategory updated!");
      }
    });
  };

  const deleteSubCategory = (id: string) => {
    category.subcategories = category.subcategories.filter(
      (c) => c.id !== id
    );
    setSelectedSubCat(null);
    refreshParent();
    message.success("Deleted!");
  };

  /** ---------------- SERVICE CRUD ---------------- */
  const addService = () => {
    if (!selectedSubCat) return;

    serviceForm.validateFields().then((values) => {
      selectedSubCat.services.push({
        id: `S${Date.now()}`,
        name: values.name,
        description: values.description,
      });

      setAddServiceOpen(false);
      serviceForm.resetFields();
      refreshParent();
      message.success("Service added!");
    });
  };

  const updateService = () => {
    if (!selectedSubCat || !isEditServiceOpen) return;

    serviceForm.validateFields().then((values) => {
      isEditServiceOpen.name = values.name;
      isEditServiceOpen.description = values.description;
      refreshParent();
      setEditServiceOpen(null);
      message.success("Service updated!");
    });
  };

  const deleteService = (id: string) => {
    if (!selectedSubCat) return;

    selectedSubCat.services = selectedSubCat.services.filter(
      (s) => s.id !== id
    );
    refreshParent();
    message.success("Deleted!");
  };

  const subColumns = [
    {
      title: "Subcategory",
      render: (_: any, record: SubCategory) => (
        <Button type="link" onClick={() => setActiveFormSub(record)}>
          {record.name}
        </Button>
      ),
    },
    { title: "Description", dataIndex: "description" },
    {
      title: "Actions",
      render: (_: any, record: SubCategory) => (
        <Space>
          <Button type="link" onClick={() => setSelectedSubCat(record)}>
            View Services
          </Button>
          <Button
            type="link"
            onClick={() => {
              setEditSubOpen(record);
              form.setFieldsValue(record);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete?"
            onConfirm={() => deleteSubCategory(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const serviceColumns = [
    {
      title: "Service",
      render: (_: any, record: SubService) => (
        <Button type="link" onClick={() => setActiveFormService(record)}>
          {record.name}
        </Button>
      ),
    },
    { title: "Description", dataIndex: "description" },
    {
      title: "Actions",
      render: (_: any, record: SubService) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditServiceOpen(record);
              serviceForm.setFieldsValue(record);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete service?"
            onConfirm={() => deleteService(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* =============================== CATEGORY MODAL =============================== */}
      {!selectedSubCat ? (
        <Modal
          open
          width={900}
          title={category.name}
          onCancel={onClose}
          footer={null}
        >
          <Space
            style={{
              width: "100%",
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            <Button type="primary" onClick={() => setAddSubOpen(true)}>
              + Add Sub Category
            </Button>
          </Space>

          <Table
            rowKey="id"
            columns={subColumns}
            dataSource={category.subcategories}
            pagination={false}
          />

          {/* ---------- ADD SUBCATEGORY ---------- */}
          <Modal
            open={isAddSubOpen}
            title="Add Sub Category"
            onCancel={() => setAddSubOpen(false)}
            onOk={addSubCategory}
          >
            <Form layout="vertical" form={form}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="Ex: Passenger Transport" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} placeholder="Details..." />
              </Form.Item>

              <Form.Item label="Upload Image">
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Modal>

          {/* ---------- EDIT SUBCATEGORY ---------- */}
          <Modal
            open={!!isEditSubOpen}
            title="Edit Sub Category"
            onCancel={() => setEditSubOpen(null)}
            onOk={updateSubCategory}
          >
            <Form layout="vertical" form={form}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item label="Upload Image">
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Modal>

          {/* ---------- SUBCATEGORY FORM BUILDER ---------- */}
          {activeFormSub && (
            <Modal
              open
              width={900}
              title={`Configure Form for ${activeFormSub.name}`}
              footer={null}
              onCancel={() => setActiveFormSub(null)}
            >
              <FormBuilder
                targetName={activeFormSub.name}
                onClose={() => setActiveFormSub(null)}
                onSave={(formData) => {
                  console.log("Saved Subcategory Form:", formData);
                  message.success("Form Saved!");
                  setActiveFormSub(null);
                }}
              />
            </Modal>
          )}
        </Modal>
      ) : (
        <>
          {/* =============================== SERVICES MODAL =============================== */}
          <Modal
            open
            width={900}
            title={selectedSubCat.name}
            onCancel={() => setSelectedSubCat(null)}
            footer={[
              <Button key="back" onClick={() => setSelectedSubCat(null)}>
                Back
              </Button>,
            ]}
          >
            <Space
              style={{
                width: "100%",
                justifyContent: "flex-end",
                marginBottom: 10,
              }}
            >
              <Button type="primary" onClick={() => setAddServiceOpen(true)}>
                + Add Service
              </Button>
            </Space>

            <Table
              rowKey="id"
              columns={serviceColumns}
              dataSource={selectedSubCat.services}
              pagination={false}
            />

            {/* ---------- ADD SERVICE ---------- */}
            <Modal
              open={isAddServiceOpen}
              title="Add Service"
              onCancel={() => setAddServiceOpen(false)}
              onOk={addService}
            >
              <Form layout="vertical" form={serviceForm}>
                <Form.Item
                  name="name"
                  label="Service Name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Service Name" />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item label="Upload Image">
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>

            {/* ---------- EDIT SERVICE (FIXED WITH IMAGE UPLOAD) ---------- */}
            <Modal
              open={!!isEditServiceOpen}
              title="Edit Service"
              onCancel={() => setEditServiceOpen(null)}
              onOk={updateService}
            >
              <Form layout="vertical" form={serviceForm}>
                <Form.Item
                  name="name"
                  label="Service Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>

                {/* ⭐ ADDED IMAGE UPLOAD FIELD (YOU ASKED FOR THIS) */}
                <Form.Item label="Upload Image">
                  <Upload beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>

            {/* ---------- SERVICE FORM BUILDER ---------- */}
            {activeFormService && (
              <Modal
                open
                width={900}
                title={`Configure Form for: ${activeFormService.name}`}
                footer={null}
                onCancel={() => setActiveFormService(null)}
              >
                <FormBuilder
                  targetName={activeFormService.name}
                  onClose={() => setActiveFormService(null)}
                  onSave={(formData) => {
                    console.log("Saved Service Form:", formData);
                    message.success("Form Saved!");
                    setActiveFormService(null);
                  }}
                />
              </Modal>
            )}
          </Modal>
        </>
      )}
    </>
  );
};

export default ServiceModal;