const authorization = (permissions, requiredPermission) => {
  if (permissions && permissions.includes(requiredPermission)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  authorization
}