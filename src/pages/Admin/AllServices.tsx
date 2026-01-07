// src/pages/Admin/AllServices.tsx
import React, { useMemo, useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Tree,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FormOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { ServiceCategories as InitialCategories } from "./servicesData";
import type { Category as CategoryType } from "./servicesData";
import type { DataNode } from "antd/es/tree"; // ✅ ADDED

import FormBuilder from "./FormBuilder";

const { Title, Text } = Typography;
const { TextArea } = Input;

// ───────────────────────────────────────────────
// UNIVERSAL NODE FORMAT
// ───────────────────────────────────────────────
export interface ServiceNode {
  id: string;
  name: string;
  description?: string;
  image?: File | null;
  children: ServiceNode[];
}

// Convert initial 3-level structure to infinite hierarchical format
const convertInitialToNodes = (cats: CategoryType[]): ServiceNode[] =>
  cats.map((c) => ({
    id: `CAT:${c.id}`,
    name: c.name,
    description: c.description,
    image: null,
    children: c.subcategories.map((s) => ({
      id: `SUB:${s.id}`,
      name: s.name,
      description: s.description,
      image: null,
      children: s.services.map((svc) => ({
        id: `SVC:${svc.id}`,
        name: svc.name,
        description: svc.description,
        image: null,
        children: [],
      })),
    })),
  }));

// Find Node
const findNode = (
  nodes: ServiceNode[],
  id: string,
  parentId: string | null = null
): { node: ServiceNode | null; parentId: string | null } => {
  for (const n of nodes) {
    if (n.id === id) return { node: n, parentId };
    const res = findNode(n.children, id, n.id);
    if (res.node) return res;
  }
  return { node: null, parentId: null };
};

// Insert Node (Fix root insertion)
const insertNode = (
  nodes: ServiceNode[],
  parentId: string | null,
  child: ServiceNode
): ServiceNode[] => {
  if (parentId === null) {
    return [...nodes, child];
  }
  return nodes.map((n) =>
    n.id === parentId
      ? { ...n, children: [...n.children, child] }
      : { ...n, children: insertNode(n.children, parentId, child) }
  );
};

// Update Node
const updateNode = (
  nodes: ServiceNode[],
  id: string,
  patch: Partial<ServiceNode>
): ServiceNode[] =>
  nodes.map((n) =>
    n.id === id ? { ...n, ...patch } : { ...n, children: updateNode(n.children, id, patch) }
  );

// Delete Node
const deleteNode = (nodes: ServiceNode[], id: string): ServiceNode[] =>
  nodes
    .map((n) => ({ ...n, children: deleteNode(n.children, id) }))
    .filter((n) => n.id !== id);

// Convert to Ant Tree
const toTreeData = (nodes: ServiceNode[]): DataNode[] => // ✅ return type
  nodes.map(
    (n): DataNode => ({
      title: n.name,
      key: n.id,
      isLeaf: n.children.length === 0,
      children: toTreeData(n.children),
    })
  );

// Generate new ID
const makeIdForChild = (parentId: string | null) => {
  const rnd = `${Date.now()}:${Math.floor(Math.random() * 10000)}`;
  if (!parentId) return `CAT:${rnd}`;
  if (parentId.startsWith("CAT:")) return `SUB:${rnd}`;
  return `SVC:${rnd}`;
};

// Button text
const addButtonTextFor = (nodeId: string | null) => {
  if (!nodeId) return "+ Add Category";
  if (nodeId.startsWith("CAT:")) return "+ Add Subcategory";
  return "+ Add Subcategory";
};

// ───────────────────────────────────────────────
// MAIN COMPONENT
// ───────────────────────────────────────────────
const AllServices: React.FC = () => {
  const [nodes, setNodes] = useState<ServiceNode[]>(() =>
    convertInitialToNodes(InitialCategories)
  );

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const [nodeForm] = Form.useForm();
  const [addModalFor, setAddModalFor] =
    useState<{ parentId: string | null; title: string } | null>(null);

  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const [formBuilderTarget, setFormBuilderTarget] =
    useState<{ name: string; key: string } | null>(null);

  const refresh = (fn: (prev: ServiceNode[]) => ServiceNode[]) => {
    setNodes((prev) => fn(prev));
  };

  // Open Add Modal
  // If parentId provided, resolve its name and show in title:
  // "+ Add Subcategory to Transport"
  const openAddModal = (parentId: string | null, title?: string) => {
    let resolvedTitle = title ?? addButtonTextFor(parentId);
    if (parentId) {
      const { node } = findNode(nodes, parentId);
      if (node) {
        // If title already contains "+ Add", keep the label and append "to <name>"
        // e.g. "+ Add Subcategory to Transport"
        const base = addButtonTextFor(parentId).replace("+ ", "");
        resolvedTitle = `+ ${base} to ${node.name}`;
      }
    }
    setAddModalFor({
      parentId,
      title: resolvedTitle,
    });
    nodeForm.resetFields();
  };

  // ADD NODE
  const handleAdd = async () => {
    try {
      const vals = await nodeForm.validateFields();
      const file = vals.imageFile?.[0]?.originFileObj ?? null;

      const newNode: ServiceNode = {
        id: makeIdForChild(addModalFor?.parentId ?? null),
        name: vals.name,
        description: vals.description ?? "",
        image: file,
        children: [],
      };

      refresh((p) =>
        insertNode(p, addModalFor?.parentId ?? null, newNode)
      );

      if (addModalFor?.parentId)
        setExpandedKeys((prev) =>
          [...new Set([...prev, addModalFor.parentId!])]
        );

      setAddModalFor(null);
      nodeForm.resetFields();
      message.success("Added");
    } catch {
      // ignore validation errors ✅ (fixes no-empty)
    }
  };

  // EDIT NODE
  const openEditModal = (id: string) => {
    const { node } = findNode(nodes, id);
    if (!node) return;

    setEditingNodeId(id);

    nodeForm.setFieldsValue({
      name: node.name,
      description: node.description,
    });
  };

  const handleUpdate = async () => {
    try {
      const vals = await nodeForm.validateFields();
      const file = vals.imageFile?.[0]?.originFileObj ?? null;

      refresh((p) =>
        updateNode(p, editingNodeId!, {
          name: vals.name,
          description: vals.description,
          image: file,
        })
      );

      setEditingNodeId(null);
      nodeForm.resetFields();
      message.success("Updated");
    } catch {
      // ignore validation errors ✅ (fixes no-empty)
    }
  };

  const handleDelete = (id: string) => {
    refresh((p) => deleteNode(p, id));
    message.success("Deleted");
  };

  const treeData = useMemo(() => toTreeData(nodes), [nodes]);

  const renderTitle = (key: string) => {
    const { node } = findNode(nodes, key);
    if (!node) return key;

    const addLabel = addButtonTextFor(key);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Text strong>{node.name}</Text>
          {node.description && (
            <Text type="secondary">{node.description}</Text>
          )}
        </div>

        <Space>
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(key);
            }}
          >
            <EditOutlined /> Edit
          </Button>

          <Popconfirm
            title="Delete permanently?"
            onConfirm={() => handleDelete(key)}
          >
            <Button size="small" danger>
              <DeleteOutlined /> Delete
            </Button>
          </Popconfirm>

          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              openAddModal(key, addLabel);
            }}
          >
            <PlusOutlined /> {addLabel.replace("+ ", "")}
          </Button>

          <Button
            size="small"
            onClick={() =>
              setFormBuilderTarget({ name: node.name, key: node.id })
            }
          >
            <FormOutlined /> Create Form
          </Button>
        </Space>
      </div>
    );
  };

  return (
    <Card className="sw-ad-page-card as-card" bodyStyle={{ padding: 20 }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4}>Services</Title>
          <Text type="secondary">
            Manage categories, subcategories & services in a hierarchical tree.
          </Text>
        </Col>

        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openAddModal(null)}
          >
            Add Category
          </Button>
        </Col>
      </Row>

      <Tree
        style={{ marginTop: 20 }}
        blockNode
        expandedKeys={expandedKeys}
        onExpand={(e) => setExpandedKeys(e as string[])}
        selectedKeys={selectedKey ? [selectedKey] : []}
        onSelect={(e) => setSelectedKey((e[0] as string) ?? null)}
        treeData={treeData}
        titleRender={(node) => renderTitle(String(node.key))}
      />

      {/* ADD MODAL */}
      <Modal
        open={!!addModalFor}
        title={addModalFor?.title}
        onCancel={() => {
          setAddModalFor(null);
          nodeForm.resetFields();
        }}
        onOk={handleAdd}
      >
        <Form form={nodeForm} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} />
          </Form.Item>

          {/* OPTION A - SIMPLE UPLOAD BUTTON */}
          <Form.Item
            name="imageFile"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload beforeUpload={() => false} listType="text">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        open={!!editingNodeId}
        title="Edit"
        onCancel={() => {
          setEditingNodeId(null);
          nodeForm.resetFields();
        }}
        onOk={handleUpdate}
      >
        <Form form={nodeForm} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} />
          </Form.Item>

          {/* OPTION A UPLOAD */}
          <Form.Item
            name="imageFile"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload beforeUpload={() => false} listType="text">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* FORM BUILDER */}
      {formBuilderTarget && (
        <Modal
          open
          width={900}
          footer={null}
          title={`Configure Form: ${formBuilderTarget.name}`}
          onCancel={() => setFormBuilderTarget(null)}
        >
          <FormBuilder
            targetName={formBuilderTarget.name}
            onClose={() => setFormBuilderTarget(null)}
            onSave={() => {
              message.success("Form saved");
              setFormBuilderTarget(null);
            }}
          />
        </Modal>
      )}
    </Card>
  );
};

export default AllServices;
