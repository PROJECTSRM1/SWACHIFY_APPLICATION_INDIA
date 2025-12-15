// src/pages/Admin/FormBuilder.tsx
import React, { useState } from "react";
import { Plus,  X } from "lucide-react";
import type { FormField } from "./types";
import {
  Card,
  Button,
  Space,
  Typography,
  Input,
  Switch,
  Tag,
  List,
  Divider,
  message,
} from "antd";

const { TextArea } = Input;
const { Title, Text } = Typography;

interface Props {
  targetName: string; // Category / Sub / Service name coming from parent
  onClose: () => void;
  onSave: (form: any) => void;
}

const fieldTypes = [
  { value: "text", label: "Text Input" },
  { value: "email", label: "Email" },
  { value: "number", label: "Number Input" },
  { value: "textarea", label: "Long Text Area" },
  { value: "select", label: "Dropdown" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio Button" },
];

const FormBuilder: React.FC<Props> = ({ targetName, onSave }) => {
  const [formName, setFormName] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [showPreview] = useState(false);

  const [newField, setNewField] = useState<Partial<FormField>>({
    type: "text",
    label: "",
    placeholder: "",
    required: false,
    options: [],
  });

  const [optionInput, setOptionInput] = useState("");

  const addField = () => {
    if (!newField.label || newField.label.trim() === "") {
      message.error("Label is required");
      return;
    }
    setFields([
      ...fields,
      {
        id: Date.now().toString(),
        type: newField.type!,
        label: newField.label!,
        placeholder: newField.placeholder || "",
        required: newField.required || false,
        options: newField.options || [],
      },
    ]);
    setNewField({
      type: "text",
      label: "",
      placeholder: "",
      required: false,
      options: [],
    });
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const saveForm = () => {
    if (!formName || fields.length === 0) {
      message.error("Please fill form name & add at least 1 field");
      return;
    }

    const newForm = {
      id: Date.now().toString(),
      name: formName,
      description,
      targetName,
      fields,
    };

    onSave(newForm);
    message.success("Form Saved Successfully!");
  };

  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: 10 }}>
      <Space
        align="start"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <div>
          <Title level={4} style={{ marginBottom: 0 }}>
            Create New Form
          </Title>
          <Text type="secondary">
            Configure a custom form for <b>{targetName}</b>
          </Text>
        </div>

      </Space>

      <Divider />

      {!showPreview && (
        <Space align="start" style={{ width: "100%" }} size="large" wrap>
          {/* LEFT SIDE */}
          <div style={{ flex: 1, minWidth: 380, maxWidth: "52%" }}>
            <Card size="small" title="Form details" style={{ marginBottom: 16 }}>
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <Input
                  placeholder="Enter Form Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  style={{ height: 44 }}
                />

                <TextArea
                  rows={3}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ height: 80 }}
                />
              </Space>
            </Card>

            <Card size="small" title="Add field">
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <select
                  className="ant-input"
                  style={{ height: 44 }}
                  value={newField.type}
                  onChange={(e) =>
                    setNewField((prev) => ({
                      ...prev,
                      type: e.target.value,
                      options: [],
                    }))
                  }
                >
                  {fieldTypes.map((ft) => (
                    <option key={ft.value} value={ft.value}>
                      {ft.label}
                    </option>
                  ))}
                </select>

                <Input
                  placeholder="Field Label"
                  value={newField.label}
                  onChange={(e) =>
                    setNewField((prev) => ({ ...prev, label: e.target.value }))
                  }
                  style={{ height: 44 }}
                />

                <Input
                  placeholder="Placeholder"
                  value={newField.placeholder}
                  onChange={(e) =>
                    setNewField((prev) => ({
                      ...prev,
                      placeholder: e.target.value,
                    }))
                  }
                  style={{ height: 44 }}
                />

                <Space align="center">
                  <Text>Required</Text>
                  <Switch
                    checked={newField.required}
                    onChange={(checked) =>
                      setNewField((prev) => ({ ...prev, required: checked }))
                    }
                  />
                </Space>

                {/* OPTIONS FOR SELECT / RADIO / CHECKBOX */}
                {["select", "checkbox", "radio"].includes(newField.type!) && (
                  <>
                    <Space style={{ width: "100%" }} align="start">
                      <Input
                        placeholder="Add Option"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                      />
                      <Button
                        type="dashed"
                        onClick={() => {
                          if (!optionInput.trim()) return;
                          setNewField((prev) => ({
                            ...prev,
                            options: [
                              ...(prev.options || []),
                              optionInput.trim(),
                            ],
                          }));
                          setOptionInput("");
                        }}
                      >
                        Add
                      </Button>
                    </Space>

                    <div>
                      {newField.options?.map((opt, i) => (
                        <Tag
                          key={i}
                          closable
                          onClose={() =>
                            setNewField((prev) => ({
                              ...prev,
                              options: prev.options?.filter(
                                (_, idx) => idx !== i
                              ),
                            }))
                          }
                        >
                          {opt}
                        </Tag>
                      ))}
                    </div>
                  </>
                )}

                <Button
                  type="primary"
                  icon={<Plus size={16} />}
                  onClick={addField}
                  block
                  style={{ height: 44, background: "#0057FF" }}
                >
                  + Add Field
                </Button>
              </Space>
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <div style={{ flex: 1, minWidth: 350 }}>
            <Card
              size="small"
              title="Fields in this form"
              bodyStyle={{ maxHeight: 350, overflowY: "auto" }}
            >
              {fields.length > 0 ? (
                <List
                  size="small"
                  dataSource={fields}
                  renderItem={(field) => (
                    <List.Item
                      key={field.id}
                      actions={[
                        <Button
                          key="remove"
                          type="link"
                          danger
                          icon={<X size={14} />}
                          onClick={() => removeField(field.id)}
                        >
                          Remove
                        </Button>,
                      ]}
                    >
                      <Space>
                        <Text strong>{field.label}</Text>
                        <Tag color="blue">{field.type}</Tag>
                        {field.required && <Tag color="red">Required</Tag>}
                      </Space>
                    </List.Item>
                  )}
                />
              ) : (
                <Text type="secondary">
                  No fields yet. Add field using button.
                </Text>
              )}
            </Card>
          </div>
        </Space>
      )}

      {showPreview && (
        <Card size="small" bordered style={{ marginTop: 12 }}>
          <Title level={5}>{formName}</Title>
          <Text type="secondary">{description}</Text>
        </Card>
      )}
    </div>
  );
};

export default FormBuilder;