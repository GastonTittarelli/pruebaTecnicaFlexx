import { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { addUser } from "../../services/api";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import styles from "./addUserModal.module.css";

const { Option } = Select;

const AddUserModal = ({ onUserAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    try {
      const newUser = {
        id: uuidv4(), // Generar un ID único
        username: values.user.username,
        email: values.user.email,
        name: values.user.name.firstName,
        lastname: values.user.name.lastName,
        status: values.user.status,
        age: Number(values.user.age), // Convertir edad a número
      };

      await addUser(newUser);

      Swal.fire({
        icon: "success",
        title: "Usuario añadido correctamente",
        showConfirmButton: false,
        timer: 3000, // El alert se cierra automáticamente en 3 segundos
      });

      form.resetFields(); // Limpia los campos del formulario
      setIsModalOpen(false);

      if (onUserAdded) {
        onUserAdded();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al agregar el usuario",
        text: "Inténtalo nuevamente",
      });
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className={styles.addUserButton}
      >
        Agregar usuario
      </Button>

      <Modal
        title="Agregar usuario"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        style={{ marginBottom: 0 }}
      >
        <Form
          form={form}
          name="form_item_path"
          layout="vertical"
          onFinish={onFinish}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Form.Item
            name={["user", "username"]}
            label="Usuario"
            style={{ width: 225 }}
            rules={[
              { required: true, message: "Ingresa el nombre de usuario" },
            ]}
          >
            <Input placeholder="johndoe" />
          </Form.Item>

          <Form.Item
            name={["user", "email"]}
            label="Email"
            style={{ width: 225 }}
            rules={[
              { required: true, message: "Ingresa el email" },
              { type: "email", message: "El email no es válido" },
            ]}
          >
            <Input placeholder="johndoe@domain.com" />
          </Form.Item>

          <Form.Item
            name={["user", "name", "firstName"]}
            label="Nombre"
            style={{ width: 225 }}
            rules={[{ required: true, message: "Ingresa el nombre" }]}
          >
            <Input placeholder="John" />
          </Form.Item>

          <Form.Item
            name={["user", "name", "lastName"]}
            label="Apellido"
            style={{ width: 225 }}
            rules={[{ required: true, message: "Ingresa el apellido" }]}
          >
            <Input placeholder="Doe" />
          </Form.Item>

          <Form.Item
            name={["user", "status"]}
            label="Estado"
            style={{ width: 225 }}
            rules={[{ required: true, message: "Selecciona el estado" }]}
          >
            <Select
              placeholder="Selecciona un estado"
              style={{ width: 225 }}
              suffixIcon={null}
            >
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={["user", "age"]}
            label="Edad"
            style={{ width: 225 }}
            rules={[
              { required: true, message: "Por favor, ingresa la edad" },
              {
                pattern: /^[1-9]\d*$/,
                message: "La edad debe ser un número positivo",
              },
              {
                validator: (_, value) => {
                  if (value && (value > 100 || value < 1)) {
                    return Promise.reject("Coloca un número entre 1 y 100");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="43" />
          </Form.Item>

          <Form.Item
            style={{ display: "flex", justifyContent: "end", width: "100%" }}
          >
            <Button type="primary" htmlType="submit">
              Agregar usuario
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserModal;
