import { useEffect, useState } from 'react';
import { Space, Table, Tag, Spin, Select, Pagination, Input, message, Modal, Form, Input as AntdInput, Button } from 'antd';
import styles from './main.module.css';
import { getUsers, deleteUser, updateUser } from '../../services/api';
import AddUserModal from '../AddUserModal/AddUserModal';

const { Column } = Table;
const { Option } = Select;

const Main = () => {
  const [users, setUsers] = useState([]); // Estado para los usuarios
  const [loading, setLoading] = useState(true); // Estado para la carga
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [pageSize] = useState(9); // Usuarios por página
  const [totalUsers, setTotalUsers] = useState(50); // Total de usuarios
  const [filterStatus, setFilterStatus] = useState(null); // Estado del filtro de estado
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Estado para verificar si es la primera carga
  const [editingUser, setEditingUser] = useState(null); // Estado para el usuario que se está editando
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal


  // Función para manejar el cambio de la página
  const handlePageChange = (page) => {
    setCurrentPage(page); // Cambiar la página actual
  };

  // Función para manejar el filtro de estado
  const handleFilterChange = (val) => {
    setFilterStatus(val); // Cambiar el estado del filtro
    setCurrentPage(1); // Volver a la primera página cuando cambie el filtro
  };

  // Función para manejar la búsqueda
  const onSearch = (value) => {
    setSearchTerm(value); // Actualizar el término de búsqueda
    setCurrentPage(1); // Volver a la primera página cuando cambie el término de búsqueda
  };

  // Función para eliminar un usuario
  const handleDelete = async (userId) => {
    try {
      // Llamar a la función de eliminación
      await deleteUser(userId);
      // Mostrar un mensaje de éxito
      message.success('Usuario eliminado correctamente');
      // Actualizar la lista de usuarios después de eliminar
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      // Manejar errores en la eliminación
      message.error('Error al eliminar el usuario');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Establecer el usuario a editar
    setModalVisible(true); // Mostrar el modal
  };

  // Función para manejar el envío del formulario de edición
  const handleUpdateUser = async (values) => {
    try {
      const updatedUser = await updateUser(editingUser.id, values); // Actualizar el usuario
      message.success('Usuario actualizado correctamente');
      // Actualizar la lista de usuarios con los datos modificados
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setModalVisible(false); // Cerrar el modal
    } catch (error) {
      message.error('Error al actualizar el usuario');
    }
  };

  // useEffect para obtener los datos de la API al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Inicia el loading (spinner)
      
      // Si es la primera carga, agregamos el retraso
      if (isFirstLoad) {
        setTimeout(async () => {
          try {
            const offset = (currentPage - 1) * pageSize; // Calcular el offset
            const response = await getUsers({
              _limit: pageSize,  // Número de usuarios por página
              _start: offset,    // Offset según la página
              status: filterStatus,  // Filtrar por estado si se ha seleccionado
            });
            
            // Filtrar por nombre o apellido
            const filteredData = response.filter(
              (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Contar el total de usuarios (esto puede necesitar un endpoint que te dé el total)
            const totalResponse = await getUsers();  // Suponiendo que tienes un endpoint para contar el total
            setTotalUsers(totalResponse.length);

            setUsers(filteredData); // Actualizar los usuarios con los resultados filtrados
          } catch (error) {
            console.error('Error al obtener los usuarios:', error);
          } finally {
            setLoading(false); // Finaliza el loading después de los 2 segundos
            setIsFirstLoad(false); // Marcar como ya cargado
          }
        }, 1500); // Simulo 1,5 segundos de carga inicial
      } else {
        try {
          const offset = (currentPage - 1) * pageSize;
          const response = await getUsers({
            _limit: pageSize,
            _start: offset,
            status: filterStatus,
          });

          // Filtrar por nombre o apellido
          const filteredData = response.filter(
            (user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
          );

          // Contar el total de usuarios
          const totalResponse = await getUsers();
          setTotalUsers(totalResponse.length);

          setUsers(filteredData);
        } catch (error) {
          console.error('Error al obtener los usuarios:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUsers();
  }, [currentPage, filterStatus, searchTerm, pageSize, isFirstLoad]); // Reejecutar cuando cambien estos estados

  return (
    <main className={styles.mainContainer}>

      <section className={styles.userFilterControls}>
        {/* Barra de búsqueda con el componente Search */}
        <Input.Search
          placeholder="Buscar por nombre o apellido"
          onSearch={onSearch}  // Manejar búsqueda
          style={{ width: 300, marginBottom: 16, marginRight: 16 }}
          allowClear
        />

        {/* Filtro por estado */}
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          placeholder="Filtrar por estado"
          style={{ width: 200 }}
          allowClear
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>

        <AddUserModal />
      </section>

      {/* Contenedor que incluye tanto el Spinner como la tabla y la paginación */}
      <div className={styles.tableContainer}>
        {/* Spinner de carga, centrado */}
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* Tabla */}
            <Table dataSource={users} pagination={false} rowKey="id"
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              borderRadius: '8px', 
            }}>
              <Column title="Usuario" dataIndex="username" key="username" width="30%" />
              <Column title="Nombre" dataIndex="name" key="name" width="30%" />
              <Column title="Apellido" dataIndex="lastname" key="lastname" width="30%" />
              <Column
                title="Estado"
                dataIndex="status"
                key="status"
                width="5%"
                render={(status) => (
                  <Tag color={status === 'active' ? 'green' : 'volcano'}>
                    {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                  </Tag>
                )}
              />
              <Column
                title="Acciones"
                key="action"
                width="5%"
                render={(_, record) => (
                  <Space size="small">
                    <a onClick={() => handleEdit(record)} href="#">Editar</a>
                    <a onClick={() => handleDelete(record.id)} href="#">Eliminar</a>
                  </Space>
                )}
              />
            </Table>

            {/* Paginación */}
            <div className={styles.paginationContainer}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalUsers} // Total de usuarios
                onChange={handlePageChange} // Función que maneja el cambio de página
                showSizeChanger={false}
                style={{ marginTop: 16}}
              />
            </div>
          </>
        )}
      </div>

      <Modal
        title="Editar Usuario"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingUser}
          onFinish={handleUpdateUser}
          layout="vertical"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: "20px"}}
        >

          <Form.Item
            label="Usuario"
            name="username"
            style={{ width: 225 }}
            rules={[
              { required: true, message: 'Nombre de usuario requerido' },
              { min: 3, message: 'Coloca al menos 3 caracteres' }
            ]}
          >
            <AntdInput />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            style={{ width: 225 }}
            rules={[{ required: true, message: 'El email es requerido' },
                    { type: 'email', message: 'El email no es válido' },]}
          >
            <AntdInput />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="name"
            style={{ width: 225 }}
            rules={[{ required: true, message: 'El nombre requerido' },
            { min: 3, message: 'Coloca al menos 3 caracteres' },
            ]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            label="Apellido"
            name="lastname"
            style={{ width: 225 }}
            rules={[{ required: true, message: 'El apellido es requerido' },
              { min: 3, message: 'Coloca al menos 3 caracteres' },]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            label="Estado"
            name="status"
            style={{ width: 225 }}
            rules={[{ required: true, message: 'Por favor selecciona un estado' }]}
          >
            <Select>
              <Option value="active">Activo</Option>
              <Option value="inactive">Inactivo</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Edad"
            name="age"
            style={{ width: 225 }}
            rules={[{ required: true, message: 'La edad es requerida' },
              { pattern: /^[1-9]\d*$/, message: 'La edad debe ser un número positivo' },
              {
                validator: (_, value) => {
                  if (value && (value > 100 || value < 1)) {
                    return Promise.reject('Coloca un número entre 1 y 100');
                  }
                  return Promise.resolve();
                }
              }]}
          >
            <AntdInput />
          </Form.Item>

          <Form.Item style={{ position: "relative", width: "100%"}}>
            <Button type="primary" htmlType="submit" style={{ position: "absolute", right: 0 }}>
              Editar usuario
            </Button>
          </Form.Item>

        </Form>
      </Modal>
      
    </main>
  );
};

export default Main;
