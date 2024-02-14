export const checkDepartmentAccess = (permissionName) => {
  return (req, res, next) => {
    const userDepartments = req.user.departments;
    const departmentAccessing = req.body.departmentId;

    const filteredDepartment = userDepartments.find(
      (item) => item.departmentAssigned === departmentAccessing
    );
    if (!filteredDepartment) {
      return res.status(403).json({ msg: "Access Denied!" });
    }

    const isAllowed = filteredDepartment.permissions.includes(permissionName);

    if (isAllowed === false) {
      return res.status(403).json({ msg: "Access Denied!" });
    }

    next();
  };
};
