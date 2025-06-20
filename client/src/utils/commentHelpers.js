const getUserIdFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.userId || payload?._id || null;
  } catch (err) {
    console.error('Failed to decode token', err);
    return null;
  }
};
export default getUserIdFromToken;
