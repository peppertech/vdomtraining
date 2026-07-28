import {
  createOracleEmployeeDataProvider,
  getEmployeeNames,
  type OracleEmployee,
} from "./selectMultiple-shared";

const editedEmployees: OracleEmployee[] = [
  {
    EMPLOYEE_ID: 900,
    FIRST_NAME: "Edited",
    LAST_NAME: "Employee",
    EMAIL: "EDITED",
    PHONE_NUMBER: "(555) 010-0900",
    HIRE_DATE: "2026-07-28",
    SALARY: 100,
    DEPARTMENT_ID: 10,
    TITLE: "Playground Tester",
    IMAGE: "styles/images/hcm/placeholder-male-01.png",
  },
];

createOracleEmployeeDataProvider(editedEmployees);
getEmployeeNames(new Set([900]), editedEmployees);
