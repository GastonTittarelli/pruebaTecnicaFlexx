-- En este archivo deben estar tus ejercicios de consultas sql

-- 1 Empleados ordenados alfabéticamente (Z...A): Muestra los nombres de los empleados en orden alfabético descendente.
SELECT NOMBRES 
FROM EMPLEADOS 
ORDER BY NOMBRES DESC;


-- 2 Empleados de Soporte: Muestra el nombre, el puesto y la localidad de los empleados con el puesto de 'Soporte'.
SELECT E.NOMBRES, P.PUESTO, L.LOCALIDAD 
FROM EMPLEADOS E
INNER JOIN PUESTOS P ON E.PUESTO_ID = P.ID
INNER JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
INNER JOIN LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
WHERE P.PUESTO = 'Soporte';


-- 3 Nombres que terminan con 'o': Lista los nombres de los empleados cuyo nombre termina con la letra 'o'.
SELECT NOMBRES 
FROM EMPLEADOS 
WHERE NOMBRES LIKE '%o';


-- 4 Empleados en Carlos Paz: Muestra el nombre, sueldo y localidad de los empleados que trabajan en la localidad Carlos Paz.
SELECT E.NOMBRES, E.SUELDO, L.LOCALIDAD 
FROM EMPLEADOS E
INNER JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
INNER JOIN LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
WHERE L.LOCALIDAD = 'Carlos Paz';


-- 5 Sueldos entre 10000 y 13000: Muestra el nombre, sueldo y localidad de los empleados cuyo sueldo se encuentra entre 10000 y 13000.
SELECT E.NOMBRES, E.SUELDO, L.LOCALIDAD 
FROM EMPLEADOS E
INNER JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
INNER JOIN LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
WHERE E.SUELDO BETWEEN 10000 AND 13000;


-- 6 Departamentos con más de 5 empleados: Visualiza los departamentos que tienen más de 5 empleados.
SELECT D.DENOMINACION, COUNT(E.ID) AS CANTIDAD_EMPLEADOS 
FROM DEPARTAMENTOS D
INNER JOIN EMPLEADOS E ON D.ID = E.DEPARTAMENTO_ID
GROUP BY D.DENOMINACION
HAVING COUNT(E.ID) > 5;


-- 7 Empleados en Córdoba con puesto de Analista o Programador: Muestra los nombres de los empleados que trabajan en Córdoba y tienen el puesto de 'Analista' o 'Programador'.
SELECT E.NOMBRES 
FROM EMPLEADOS E
INNER JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
INNER JOIN LOCALIDADES L ON D.LOCALIDAD_ID = L.ID
INNER JOIN PUESTOS P ON E.PUESTO_ID = P.ID
WHERE L.LOCALIDAD = 'Córdoba' 
AND P.PUESTO IN ('Analista', 'Programador');


-- 8 Sueldo medio de todos los empleados: Calcula el sueldo medio de todos los empleados.
SELECT AVG(SUELDO) AS SUELDO_MEDIO 
FROM EMPLEADOS;


-- 9 Máximo sueldo en el departamento 10: Muestra el máximo sueldo de los empleados del departamento 10.
SELECT MAX(SUELDO) AS MAXIMO_SUELDO 
FROM EMPLEADOS 
WHERE DEPARTAMENTO_ID = 10;


-- 10 Sueldo mínimo en el departamento Soporte: Calcula el sueldo mínimo de los empleados del departamento 'Soporte'.
SELECT MIN(E.SUELDO) AS SUELDO_MINIMO 
FROM EMPLEADOS E
INNER JOIN DEPARTAMENTOS D ON E.DEPARTAMENTO_ID = D.ID
WHERE D.DENOMINACION = 'Soporte';


-- 11 Suma de sueldos por puesto: Calcula la suma de sueldos para cada puesto.
SELECT P.PUESTO, SUM(E.SUELDO) AS SUMA_SUELDOS 
FROM EMPLEADOS E
INNER JOIN PUESTOS P ON E.PUESTO_ID = P.ID
GROUP BY P.PUESTO;
