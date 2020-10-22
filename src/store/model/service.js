export function serviceModel(data) {
  return data.map((item, index) => {
    return {
      title: item.plan_name || item.service_project_name,
      ...item
    };
  });
}

export function spDetailModel(data) {
  let tasks = data.tasks.map((item, index) => {
    return {
      ...item,
      description: item.description || ""
    };
  });
  return {
    ...data,
    tasks
  };
}
export function profileModel(data) {
  return data.map((item, index) => {
    return {
      name: item.full_name || "--",
      location: item.current_area || "--",
      phone: item.student_phone || "--",
      email: item.student_email_id || "--",
      wechat: item.student_wechat || "--",
      gender: "",

      school: item.current_school || "--",
      grade: item.current_grade || "--"
    };
  });
}
