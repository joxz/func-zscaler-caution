export const sendJson = (content) => {
  return {
    status: 200,
    body: JSON.stringify(content, null, 2),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const sendHtml = (content) => {
  return {
    status: 200,
    body: content,
    headers: {
      "Content-Type": "text/html",
    },
  };
};

export const sendErr = (content) => {
  return {
    status: 400,
    body: content,
    headers: {
      "Content-Type": "text/plain",
    },
  };
};

export const sendNoContent = () => {
  return {
    status: 204,
  };
};
